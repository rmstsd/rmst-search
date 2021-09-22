/**
 * @type {import('webpack').Configuration}
*/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const resolveRoot = pathStr => path.resolve(__dirname + '/../', pathStr)

module.exports = function (webpackEnv) {

    return {
        entry: './src/index.js',
        output: {
            filename: 'js/[name].[contenthash:8].js',
            assetModuleFilename: 'images/[name][ext]',
            path: resolveRoot('dist'),
            clean: true
        },
        optimization: {
            minimize: true,
            minimizer: [
                // This is only used in production mode
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        parse: {
                            /* We want terser to parse ecma 8 code. However, we don't want it
                             to apply any minification steps that turns valid ecma 5 code
                             into invalid ecma 5 code. This is why the 'compress' and 'output'
                             sections only apply transformations that are ecma 5 safe
                             */
                            // https://github.com/facebook/create-react-app/pull/4234
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            // Disabled because of an issue with Uglify breaking seemingly valid code:
                            // https://github.com/facebook/create-react-app/issues/2376
                            // Pending further investigation:
                            // https://github.com/mishoo/UglifyJS2/issues/2011
                            comparisons: false,
                            // Disabled because of an issue with Terser breaking valid code:
                            // https://github.com/facebook/create-react-app/issues/5250
                            // Pending further investigation:
                            // https://github.com/terser-js/terser/issues/120
                            inline: 2,
                        },
                        mangle: {
                            safari10: true,
                        },
                        // Added for profiling in devtools
                        // keep_classnames: isEnvProductionProfile,
                        // keep_fnames: isEnvProductionProfile,
                        output: {
                            ecma: 5,
                            comments: false,
                            // Turned on because emoji and regex is not minified properly using default
                            // https://github.com/facebook/create-react-app/issues/2488
                            ascii_only: true,
                        },
                    },
                    // sourceMap: false,
                })
            ],
            // Automatically split vendor and commons
            // https://twitter.com/wSokra/status/969633336732905474
            // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
            splitChunks: {
                chunks: 'all',
                name: false,
            },
            // Keep the runtime chunk separated to enable long term caching
            // https://twitter.com/wSokra/status/969679223278505985
            // https://github.com/facebook/create-react-app/issues/5358
            runtimeChunk: {
                name: entryPoint => `runtime-${entryPoint.name}`,
            },
        },
        mode: 'production',
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
                '@': resolveRoot('src')
            }
        },
        plugins: [
            new HtmlWebpackPlugin({ template: './public/index.html' }),
            new CopyPlugin({
                patterns: [
                    {
                        from: 'public',
                        globOptions: {
                            ignore: ["**/index.html"] // '**/index.html' 会忽略public下且包括子目录下的index.html 件
                        },

                        // 根据指定路径判断是否忽略改文件;
                        // filter: resourcePath => {
                        //     return resourcePath.split('/').pop() !== 'index.html'
                        // }
                    }
                ]
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].chunk.css'
            }),

            new BundleAnalyzerPlugin({ openAnalyzer: false })
        ],
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: [
                        { loader: 'babel-loader' }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true
                            }
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.less$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: 'css-loader' },
                        { loader: 'less-loader' }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
            ]
        }
    }

}