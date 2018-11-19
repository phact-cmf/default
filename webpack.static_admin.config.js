const devMode = process.env.NODE_ENV !== 'production';

const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
  name: 'backend',
  devtool: 'source-map',
  mode: devMode ? 'development' : 'production',
  entry: {
    main: path.resolve('static_admin/js/app.js'),
  },
  output: {
    path: path.join(__dirname, 'www/static_admin'),
    filename: '[name]-[hash].js',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ],
    alias: {
      jquery: 'jquery/src/jquery',
      phact_modules: path.resolve(__dirname, 'www/static_modules')
    },
  },
  module: {
    rules: [{
      test: /\.(png|je?pg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: 'images-processed',
          },
        },
      ],
    },
    {
      test: /\.(otf|ttf|eot|woff|woff2)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: 'fonts',
          },
        },
      ],
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
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
          loader: MiniCssExtractPlugin.loader,
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
            includePaths: [path.resolve(__dirname, 'static_admin/scss/_settings')],
          },
        },
      ],
    }],
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, 'www/static_admin')]),
    new CleanObsoleteChunks(),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static_admin/images'),
        to: 'images',
      },
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new WebpackAssetsManifest({
      writeToDisk: true,
      output: path.join(__dirname, 'www/static_admin/manifest.json'),
    })
  ]
};