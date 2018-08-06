const devMode = process.env.NODE_ENV !== 'production';

const path = require('path');
const webpack = require('webpack');
const glob = require('glob').sync;

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SvgSpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const autoprefixer = require('autoprefixer');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = [
  {
    name: 'svg-sprite',
    mode: 'production',
    entry: {
      main: glob(path.resolve(__dirname, 'static/svg/*.svg')),
    },
    output: {
      path: path.join(__dirname, 'www/static/svg'),
      filename: 'sprite-[hash].js',
    },
    module: {
      rules: [{
        test: /\.svg$/,
        include: path.resolve(__dirname, 'static/svg'),
        use: [{
          loader: 'svg-sprite-loader',
          options: {
            esModule: false,
            extract: true,
            spriteFilename: 'sprite.svg',
          },
        }],
      }],
    },
    plugins: [
      new SvgSpriteLoaderPlugin({
        plainSprite: true,
      }),
    ],
    devServer: {
      host: '0.0.0.0',
      port: 9000,
      hot: true,
      inline: true,
      contentBase: './',
      proxy: {
        '*': {
          target: 'http://127.0.0.1:8000/',
          changeOrigin: true,
        },
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      },
    },
  },
  {
    name: 'frontend',
    mode: devMode ? 'development' : 'production',
    entry: {
      main: [path.resolve('static/js/app.js')].concat(glob(path.resolve(__dirname, 'static/svg/*.svg'))),
    },
    devtool: 'source-map',
    output: {
      path: path.join(__dirname, 'www/static'),
      filename: '[name]-[hash].js',
      publicPath: '/static/',
    },
    resolve: {
      alias: {
        jquery: 'jquery/src/jquery',
      },
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env', 'stage-2']
          },
        }],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: 'images-processed'
          },
        }],
      },
      {
        test: /\.(otf|ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
              outputPath: 'fonts'
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer(),
              ],
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer(),
              ],
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [path.resolve(__dirname, 'static/scss/_settings')],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        oneOf: [{
          issuer: /\.s?css$/,
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: 'svg'
          },
        }, {
          loader: [MiniCssExtractPlugin.loader, 'css-loader', path.resolve(__dirname, 'static/components/svg-css-loader/loader.js')].join('!'),
        }]
      }],
    },
    plugins: [
      new CleanWebpackPlugin([path.resolve(__dirname, 'www/static')]),
      new CleanObsoleteChunks(),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'static/images'),
          to: 'images',
        },
      ]),
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
        chunkFilename: '[id].css',
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        _: 'underscore',
        underscore: 'underscore',
      }),
      new WebpackAssetsManifest({
        writeToDisk: true,
        output: path.join(__dirname, 'www/static/manifest.json'),
      }),
      new webpack.NamedModulesPlugin()
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: (item) => {
              if (item.resource && item.resource.match(/[\\/]node_modules[\\/]/)) {
                if (item.resource.match(/\.s?css$/)) {
                  return false
                }
                return true;
              }
              return false;
            },
            name: 'vendors',
            chunks: 'all'
          },
        }
      }
    }
  },
];