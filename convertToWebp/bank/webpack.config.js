const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',

    context: path.join(__dirname, 'src'),

    entry: './scripts/script.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },

    devServer: {
        static: {
            directory: path.join(__dirname, './'),
            watch: true
        },
        compress: true,
        port: 9000,
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    
    plugins: [new HtmlWebpackPlugin({
        minify: true,
        template: './index.html'
    })],
};