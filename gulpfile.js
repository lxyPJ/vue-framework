//gulp
var gulp = require("gulp"),
    gulpSequence = require('gulp-sequence'),
    gutil = require("gulp-util"),
    del = require("del"),
    path = require('path'),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    newer = require("gulp-newer"),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin');
//browser-sync
var bs = require('browser-sync').create();
//webpack
var webpack = require("webpack");
//dev-server
var express = require("express"),
    webpackDevMiddleware = require("webpack-dev-middleware"),
    webpackHotMiddleware = require("webpack-hot-middleware"),
    proxyMiddleware = require('http-proxy-middleware');

//源文件路径和目标文件路径
var src = {
    img:"assets/images/**/*.*"
};
var dest = {
    img:"dist/assets/images"
};

//清除
gulp.task('clean',function(cb){
    del.sync('dist');
    cb();
});

//图片压缩
gulp.task('copyImg',function(){
    return gulp.src(src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(dest.img));
});

//webpack-dev-server
gulp.task('webpackDevServer',function(){
    var webpackDevConfig = require("./webpack.dev.js");

    Object.keys(webpackDevConfig.entry).forEach(function(name){
        webpackDevConfig.entry[name] = ["webpack-hot-middleware/client?noInfo=true&reload=true"].concat(webpackDevConfig.entry[name]);
    });

    webpackDevConfig.plugins = webpackDevConfig.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]);

    webpackDevConfig.devServer = {
        noInfo: true,
        publicPath:"/"
    };

    var devCompiler = webpack(webpackDevConfig);
    var devMiddleware = webpackDevMiddleware(devCompiler,{
        stats:{
            chunks: false,
            colors: true,
            timings: true,
            source: true,
            cachedAssets: false
        }
    });
    var hotMiddleware = webpackHotMiddleware(devCompiler,{});
    devCompiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            bs.reload();
            cb()
        })
    });

    var server = express();
    server.use(devMiddleware);
    server.use(hotMiddleware);
    server.listen(3005,function(err){
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]","server listening on port 3005!");
    });
});

//webpack development
gulp.task('webpackDev',function(){
    var webpackDevConfig = require("./webpack.dev.js");
    var devCompiler = webpack(webpackDevConfig);
    devCompiler.watch({
        aggregateTimeout: 300,
        poll: undefined
    },function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:development", err);
            return;
        }
        gutil.log("[webpack:development]", stats.toString({
            chunks: false,
            colors: true,
            timings: true,
            source: true,
            cachedAssets: false
        }));
    });
});

//webpack production
gulp.task('webpackPro',function(cb){
    var webpackProConfig = require("./webpack.pro.js");
    webpack(webpackProConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:production", err);
        gutil.log("[webpack:production]", stats.toString({
            chunks: false,
            colors: true,
            timings: true,
            source: true,
            cachedAssets: false
        }));
        cb();
    });
});

//browserSync
gulp.task('proxy-server',function(){
    bs.init({
        startPath:"/html/app.html",
        proxy: "http://localhost:3005"
        // server:"./"
    });
    // gulp.watch("dist/html/**/*.html").on("change",bs.reload);
    // gulp.watch([src.css,"src/pages/**/*.scss"], ['style']);
    // gulp.watch('dist/js/*.*').on("change",bs.reload);
});

gulp.task('buildSuccess',function(cb){
    gutil.log("[webpack:production]","build success!");
    cb();
});

gulp.task('build',gulpSequence('clean','copyImg','webpackPro','buildSuccess'));
gulp.task("dev-proxy",gulpSequence('clean','copyImg','webpackDev','proxy-server'));
gulp.task("dev-server",gulpSequence('clean','copyImg','webpackDevServer','proxy-server'));
