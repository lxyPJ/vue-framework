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
    webpackDevMiddleware = require("webpack-dev-middleware");

//源文件路径和目标文件路径
var src = {
    css:"src/css/**/*.scss",
    fonts:"src/css/base/fonts/{iconfont.eot,iconfont.svg,iconfont.ttf,iconfont.woff}",
    img:"assets/images/**/*.*"
};
var dest = {
    html:"dist/html",
    css:"dist/css",
    fonts:"dist/css",
    img:"dist/assets/images"
};

//清除
gulp.task('clean',function(cb){
    del.sync('dist');
    cb();
});

//拷贝
gulp.task('copyJs',function(){
    return gulp.src([
            'src/js/responsive.js'
        ])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('copyFonts',function(){
    return gulp.src(src.fonts)
        .pipe(gulp.dest(dest.fonts));
});
gulp.task('copyImg',function(){
    return gulp.src(src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(dest.img));
});

//编译sass
gulp.task('style',function(){
    return gulp.src(['src/pages/**/index.scss',src.css])
        .pipe(newer(dest.css))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error',sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers:[
                "last 3 versions","iOS 7","not ie <= 9",
                "Android >= 4.0",
                "last 3 and_chr versions",
                "last 3 and_ff versions",
                "last 3 op_mob versions",
                "last 3 op_mob versions",
                "last 3 op_mini versions"
            ],
            //是否美化属性值
            cascade:true,
            //是否去掉不必要的前缀
            remove:true
        }))
        .pipe(rename(function(path){
            path.basename = path.dirname;
            path.dirname = "";
        }))
        .pipe(gulp.dest(dest.css))
        .pipe(bs.reload({stream:true}));
});
gulp.task('proStyle',function(){
    return gulp.src(['src/pages/**/index.scss',src.css])
        .pipe(newer(dest.css))
        .pipe(sass({outputStyle:'compressed'}).on('error',sass.logError))
        .pipe(autoprefixer({
            browsers:[
                "last 3 versions","iOS 7","not ie <= 9",
                "Android >= 4.0",
                "last 3 and_chr versions",
                "last 3 and_ff versions",
                "last 3 op_mob versions",
                "last 3 op_mob versions",
                "last 3 op_mini versions"
            ],
            //是否美化属性值
            cascade:true,
            //是否去掉不必要的前缀
            remove:true
        }))
        .pipe(rename(function(path){
            path.basename = path.dirname;
            path.dirname = "";
        }))
        .pipe(gulp.dest(dest.css));
});

//webpack-dev-server
gulp.task('webpackDevServer',function(){
    var webpackDevConfig = require("./webpack.dev.js");
    var devCompiler = webpack(webpackDevConfig);
    var server = express();

    server.use(webpackDevMiddleware(devCompiler, {
        publicPath:"/",
        stats:{
            chunks: false,
            colors: true,
            timings: true,
            source: true,
            cachedAssets: false
        }
    }));

    server.listen(3000,function(err){
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]","server listening on port 3000!");
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
        proxy: "http://localhost:3005"
        // server:"./"
    });
    gulp.watch("dist/html/**/*.html").on("change",bs.reload);
    gulp.watch([src.css,"src/pages/**/*.scss"], ['style']);
    gulp.watch('dist/js/*.*').on("change",bs.reload);
});

gulp.task('buildSuccess',function(cb){
    gutil.log("[webpack:production]","build success!");
    cb();
});

gulp.task('build',gulpSequence('clean',['copyJs','copyFonts','copyImg','proStyle'],'webpackPro','buildSuccess'));

gulp.task("dev-proxy",gulpSequence('clean',['copyJs','copyFonts','copyImg','style'],'webpackDev','proxy-server'));
gulp.task("dev-server",gulpSequence('clean',['copyJs','copyFonts','copyImg','style'],'webpackDevServer'));
