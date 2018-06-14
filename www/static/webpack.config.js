const path = require("path");
const webpack = require('webpack');
const glob = require('glob').sync;
const devMode = process.env.NODE_ENV !== 'production';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SvgSpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const autoprefixer = require('autoprefixer');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const modulesPath = path.resolve(__dirname, '../../app/Modules');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = [
    {
        name: "modules",
        mode: "production",
        entry: path.resolve("modules/js/app.js"),
        output: {
            path: path.join(__dirname, "modules", "dist", "js"),
            filename: "main-[hash].js"
        },
        plugins: [
            new CleanWebpackPlugin([path.resolve(__dirname, 'modules', "dist")]),
            new CopyWebpackPlugin([
                {
                    from: modulesPath + '/*/static/**/*.*',
                    to: '../[1]/[2]/[3].[ext]',
                    test: /\/([^\s\\\/]+)\/static\/(.*?)\/([^\s\\\/]+)\.([^\s\\\/\.]+)$/
                }
            ]),
        ],
        devServer: {
            host: '0.0.0.0',
            port: 9000,
            hot: true,
            inline: true,
            contentBase: '../',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
            }
        }
    },
    {
        name: "svg-sprite",
        mode: "production",
        entry: {
            main: glob(path.resolve(__dirname, 'frontend/svg/*.svg'))
        },
        output: {
            path: path.join(__dirname, "frontend", "dist", "svg"),
            filename: "_[hash].js"
        },
        module: {
            rules: [{
                test: /\.svg$/,
                include: path.resolve(__dirname, 'frontend/svg'),
                use: [{
                    loader: "svg-sprite-loader",
                    options: {
                        esModule: false,
                        extract: true,
                        spriteFilename: '../svg/sprite.svg'
                    }
                }]
            }]
        },
        plugins: [
            new SvgSpriteLoaderPlugin({
                plainSprite: true
            }),
        ]
    },
    {
        name: "frontend",
        mode: devMode ? "development" : "production",
        entry: {
            main: [path.resolve("frontend/js/app.js")].concat(glob(path.resolve(__dirname, 'frontend/svg/*.svg')))
        },
        devtool: "source-map",
        output: {
            path: path.join(__dirname, "frontend", "dist", "js"),
            filename: "[name]-[hash].js",
            publicPath: 'http://127.0.0.1:9000/frontend/dist/js'
        },
        resolve: {
            alias: {
                jquery: "jquery/src/jquery"
            }
        },
        module: {
            rules: [{
                test: /\.(png|je?pg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '../images/[name]-[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: devMode
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer()
                            ],
                            sourceMap: devMode
                        }
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: devMode
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer()
                            ],
                            sourceMap: devMode
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: devMode,
                            includePaths: [path.resolve(__dirname, 'frontend', "scss", "_settings")]
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                include: path.resolve(__dirname, 'frontend/svg'),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: path.resolve(__dirname, 'components', 'svg-css-loader', 'loader.js')
                    },
                ]
            }]
        },
        plugins: [
            new CleanWebpackPlugin([path.resolve(__dirname, 'frontend', "dist")]),
            new CleanObsoleteChunks(),
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, 'frontend/images'),
                    to: '../raw_images'
                }
            ]),
            new MiniCssExtractPlugin({
                filename: "../css/[name]-[hash].css",
                chunkFilename: "[id].css"
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                _: "underscore",
                underscore: "underscore",

            }),
            new WebpackAssetsManifest({
                writeToDisk: true,
                output: path.join(__dirname, "frontend", "dist", "manifest.json"),
                publicPath(filename, manifest)
                {
                    return path.join("js", filename);
                }
            }),
            new webpack.NamedModulesPlugin()
            // new HardSourceWebpackPlugin()
        ]
    },
    {
        name: "backend",
        devtool: "source-map",
        mode: devMode ? "development" : "production",
        entry: {
            main: path.resolve("backend/js/app.js")
        },
        output: {
            path: path.join(__dirname, "backend", "dist", "js"),
            filename: "[name]-[hash].js"
        },
        resolve: {
            alias: {
                jquery: "jquery/src/jquery"
            }
        },
        module: {
            rules: [{
                test: /\.(png|je?pg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '../images/[name]-[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(otf|ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '../fonts/[name]-[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: devMode
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer()
                            ],
                            sourceMap: devMode
                        }
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: devMode
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer()
                            ],
                            sourceMap: devMode
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: devMode,
                            includePaths: [path.resolve(__dirname, 'backend', "scss", "_settings")]
                        }
                    }
                ]
            }]
        },
        plugins: [
            new CleanWebpackPlugin([path.resolve(__dirname, 'backend', "dist")]),
            new CleanObsoleteChunks(),
            new MiniCssExtractPlugin({
                filename: "../css/[name]-[hash].css",
                chunkFilename: "[id].css"
            }),
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, 'backend/images'),
                    to: '../raw_images'
                }
            ]),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            new WebpackAssetsManifest({
                output: path.join(__dirname, "backend", "dist", "manifest.json"),
                publicPath(filename, manifest)
                {
                    return path.join("js", filename);
                }
            })
            // new HardSourceWebpackPlugin()
        ]
    }
];