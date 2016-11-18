var webpack = require('webpack');
var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    entry:{
        common:[
            "babel-polyfill",
            "vue",
            "vue-router",
            "vuex"
        ],
        app:"./src/js/app.js"
    },
    output : {
        path : path.join(__dirname, './dist/bundle'),
        filename : '[name].js',
        chunkFilename : '[id].chunk.js',
        publicPath : "../bundle/"
    },
    module:{
        loaders:[
            {
                test:/\.(gif|png|jpg|woff|woff2|eot|ttf|svg)(\?t=\d+)?$/,
                exclude:/node_modules/,
                loader : "url-loader?limit=10000"
            },
            {
                test: /\.(js)?$/,
                exclude:/node_modules/,
                loader:'babel'
            },
            {
                test: /\.css$/,
                loader:'style!css'
                //loader: ExtractTextPlugin.extract("style-loader","css-loader")
            },
            {
                test:/\.vue$/,
                exclude:/node_modules/,
                loader:'vue'
            }
        ]
    },
    resolve : {
        extensions : ['','.js','.jsx'],
        alias:{
            'vue$':'vue/dist/vue.js'
        }
    },
    plugins:[
        new ExtractTextPlugin("mint-ui.css"),
        new CopyWebpackPlugin([
            {
                from: './src/js/modules/responsive.js',
                to:'responsive.js'
            }
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            name:["common"],
            filename:"[name].js",
            minChunks: Infinity
        })
    ],
    devtool:"sourcemap"
};
module.exports = config;