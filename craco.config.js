const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");
const CracoLessPlugin = require("craco-less");
// mmm
const path = require('path')

module.exports = {
    style: {
        postcss: {
            plugins: [
                // require('tailwindcss'),
                // require('autoprefixer'),
            ],
        },
    },
    eslint: {
        enable: false
    },
    typescript: {
        enableTypeChecking: false /* (default value)  */
    },
    webpack: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    devServer: {
        port: 10086,
        open: false
    },
    plugins: [{ plugin: CracoLessPlugin }],
}