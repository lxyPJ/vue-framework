var baseConfig = require("./webpack.base.js"),
    proConfig = Object.create(baseConfig),
    webpack = require("webpack"),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    WebpackMd5Hash = require("webpack-md5-hash"),
    HtmlWebpackPlugin = require("html-webpack-plugin");

proConfig.output.filename = 'js/[name].[chunkhash].js';
proConfig.output.chunkFilename = 'js/[name].[chunkhash].js';
proConfig.plugins = proConfig.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
        name:["vendor"],
        filename:"js/[name].[chunkhash].js",
        minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name:"manifest",
        minChunks: Infinity
    }),
    new webpack.DefinePlugin({
        'process.env': {
            // "NODE_ENV": JSON.stringify("production")
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        mangle:{
            except:['$','exports','require']
        }
    }),
    new WebpackMd5Hash(),
    new HtmlWebpackPlugin({
        title:"mobile-demo",
        filename:"html/app.html",
        template:"src/pages/app/index.html",
        chunks:["manifest","vendor","app"],
        inject: true,
        minify: {
            removeComments:true,
            collapseWhitespace:true,
            removeAttributeQuotes:true
        },
        chunksSortMode:"dependency"
    }),
    new BundleAnalyzerPlugin()
]);

module.exports = proConfig;