var gulp = require("gulp");
var gutil = require("gulp-util");
var del = require("del");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var newer = require("gulp-newer");
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
//browser-sync
var bs = require('browser-sync').create();
//webpack
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");

//源文件路径和目标文件路径
var src = {
    html:"./src/html/**/*.html",
    style:"./src/style/**/*.scss",
    fonts:"./src/style/base/fonts/{iconfont.eot,iconfont.svg,iconfont.ttf,iconfont.woff}",
    img:"./src/style/images/**/*.*"
};
var dest = {
    html:"dist/html",
    style:"dist/style",
    fonts:"dist/style",
    img:"dist/style/images"
};

//清除
function clean(done){
    del.sync('dist');
    done();
}

//拷贝
function html(){
    return gulp.src(src.html)
        .pipe(newer(dest.html))
        .pipe(gulp.dest(dest.html));
}
function fonts(){
    return gulp.src(src.fonts)
        .pipe(gulp.dest(dest.fonts));
}
function img(){
    return gulp.src(src.img)
        .pipe(gulp.dest(dest.img));
}
function imgmin(){
    return gulp.src(src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(dest.img));
}

//编译sass
function style(){
    return gulp.src(src.style)
        .pipe(newer(dest.style))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'compressed'}).on('error',sass.logError))
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
        .pipe(gulp.dest(dest.style))
        .pipe(bs.reload({stream:true}));
}
exports.style = style;

//代码监控
function watcher() {
    gulp.watch("src/html/**/*.html",html);
    gulp.watch("dist/html/**/*.html").on("change",bs.reload);
    gulp.watch("src/style/**/*.scss", style);
    gulp.watch('dist/bundle/*.*').on("change",bs.reload);
}

//browserSync
function server(){
    bs.init({
        proxy: "192.168.3.5"
    });
    watcher();
}

//webpack development
function webpackDev(done) {
    var devConfig = Object.create(webpackConfig);
    devConfig.debug = true;
    devConfig.devtool = "sourcemap";

    var devCompiler = webpack(devConfig);

    devCompiler.run(function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build-dev", err);
            return;
        }
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        done();
    });
}
exports.webpackDev = webpackDev;

//webpack production
function webpackPro(done) {
    var config = Object.create(webpackConfig);
    config.devtool = "";
    config.plugins = config.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            },
            mangle:{
                except:['$','exports','require']
            }
        })
    );

    webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:production]", stats.toString({
            colors: true
        }));
        done();
    });
}
exports.webpackPro = webpackPro;

//发布任务
gulp.task("build", gulp.series(
    clean,
    gulp.parallel(html,fonts,imgmin,style),
    webpackPro,
    function(done) {
        console.log('build success');
        done();
    }
));

//默认任务
gulp.task("default", gulp.series(
    clean,
    gulp.parallel(html,fonts,imgmin,style),
    webpackDev,
    server
));
