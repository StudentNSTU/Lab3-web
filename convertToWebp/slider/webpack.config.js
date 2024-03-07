const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',

    context: path.join(__dirname, 'src'),

    entry: './script.js',
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
            {
                test: /\.（jpeg|png|jpg|svg|gif）$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:6].[ext]',
                    outputPath: 'images',
                    publicPath: 'images',
                    emitFile: true,
                    esModule: false
                }
            }
        
        ],
    },
    
    plugins: [new HtmlWebpackPlugin({
        minify: true,
        template: './index.html'
    })],
};