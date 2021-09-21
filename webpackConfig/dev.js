/**
 * @type {import('webpack').Configuration}
*/


const path = require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')

const resolveRoot = pathStr => path.resolve(__dirname + '/../', pathStr)

const port = 9000

module.exports = {
    entry: [
        './src/index.js',
    ],
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port,
        https: true,
    },
    stats: 'errors-warnings',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': resolveRoot('src')
        },
    },
    plugins: [
        new htmlWebpackPlugin({ template: './public/index.html' })
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
                    { loader: 'style-loader' },
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