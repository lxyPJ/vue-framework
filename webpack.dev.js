var baseConfig = require("./webpack.base.js"),
    devConfig = Object.create(baseConfig),
    webpack = require("webpack"),
    HtmlWebpackPlugin = require("html-webpack-plugin");

devConfig.plugins = devConfig.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
        name:["vendor"],
        filename:"js/[name].js",
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
devConfig.devtool = "#cheap-module-eval-source-map";

module.exports = devConfig;