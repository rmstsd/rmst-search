/**
 * @type {import('webpack').Configuration}
*/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const resolveRoot = pathStr => path.resolve(__dirname + '/../', pathStr)

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'lei.js',
        path: resolveRoot('dist'),
        assetModuleFilename: 'images/[name][ext]'
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
        new MiniCssExtractPlugin({ filename: 'lei.[contenthash].css' }),

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