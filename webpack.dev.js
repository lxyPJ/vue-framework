var baseConfig = require("./webpack.base.js"),
    devConfig = Object.create(baseConfig),
    webpack = require("webpack"),
    HtmlWebpackPlugin = require("html-webpack-plugin");

// devConfig.output
devConfig.plugins = devConfig.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
        name:["vendor"],
        filename:"js/[name].[hash].js",
        minChunks: Infinity
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"'
        }
    }),
    new HtmlWebpackPlugin({
        filename:"html/app.html",
        template:"src/pages/app/index.html",
        chunks:["manifest","vendor","app"],
        inject: true,
        chunksSortMode:"dependency"
    }),
]);
devConfig.devtool = "eval";

module.exports = devConfig;