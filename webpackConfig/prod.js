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
    mode: 'production',
    // devtool: 'source-map',
    optimization: {
        usedExports: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': resolveRoot('src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: resolveRoot('public'),
        //             globOptions: {
        //                 ignore: [resolveRoot('public/index.html')]
        //             }
        //         }
        //     ]
        // }),
        new MiniCssExtractPlugin({ filename: "lei.css" }),

        new BundleAnalyzerPlugin({ openAnalyzer: false, reportFilename: 'report.html', openAnalyzer: true })
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