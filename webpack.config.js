const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    enrty: './src/index.js',
    ouput: {
        filename: 'main.js',
        path: '${__dirname}/dist',
    },
    devServer: {
        static: './dist',
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
};