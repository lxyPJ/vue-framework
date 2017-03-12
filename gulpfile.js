var gulp = require("gulp");
var gulpSequence = require('gulp-sequence');
var gutil = require("gulp-util");
var del = require("del");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var newer = require("gulp-newer");
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
//browser-sync
var bs = require('browser-sync').create();
//webpack
var webpack = require("webpack");
var webpackStream = require("webpack-stream");
var webpackConfig = require("./webpack.config.js");
var path = require('path');

//源文件路径和目标文件路径
var src = {
    html:"./src/pages/**/*.html",
    css:"./src/css/**/*.scss",
    fonts:"./src/css/base/fonts/{iconfont.eot,iconfont.svg,iconfont.ttf,iconfont.woff}",
    img:"./src/assets/images/**/*.*"
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
gulp.task('copyDevHtml',function(){
    return gulp.src("./src/pages/**/dev.html")
        .pipe(newer(dest.html))
        .pipe(rename(function(path){
            path.basename = path.dirname;
            path.dirname = "";
        }))
        .pipe(gulp.dest(dest.html));
});
gulp.task('copyProHtml',function(){
    return gulp.src("./src/pages/**/index.html")
        .pipe(newer(dest.html))
        .pipe(rename(function(path){
            path.basename = path.dirname;
            path.dirname = "";
        }))
        .pipe(gulp.dest(dest.html));
});
gulp.task('copyJs',function(){
    return gulp.src([
            'src/js/responsive.js',
            'src/js/LSresourceLoader.js',
            'src/js/vendor/zepto.js'
        ])
        .pipe(rename({ suffix: '.min' }))
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
            path.basename = path.dirname + ".min";
            path.dirname = "";
        }))
        .pipe(gulp.dest(dest.css));
});

//webpack development
gulp.task('webpackWatch',function(){
    var devConfig = Object.create(webpackConfig);
    devConfig.output.filename = '[name].js';
    devConfig.output.chunkFilename = '[id].chunk.js';
    devConfig.plugins = devConfig.plugins.concat(
        new webpack.optimize.CommonsChunkPlugin({
            name:["common"],
            filename:"[name].js",
            minChunks: Infinity
        })
    );
    devConfig.devtool = "sourcemap";
    devConfig.watch = true;
    return gulp.src('src/pages/app/index.js')
        .pipe(webpackStream(devConfig,null,function(err,stats){
            if (err) {
                throw new gutil.PluginError("webpack:build-dev", err);
            }
            gutil.log("[webpack:build-dev]", stats.toString({
                colors: true
            }));
        }))
        .pipe(gulp.dest('dist/js/'));
});

//webpack bundle
gulp.task('webpackBundle',function(cb){
    var bundleConfig = Object.create(webpackConfig);
    bundleConfig.output.path = path.join(__dirname, './dist/js');
    bundleConfig.output.filename = '[name].js';
    bundleConfig.output.chunkFilename = '[id].chunk.js';
    bundleConfig.plugins = bundleConfig.plugins.concat(
        new webpack.optimize.CommonsChunkPlugin({
            name:["common"],
            filename:"[name].js",
            minChunks: Infinity
        })
    );
    bundleConfig.devtool = "sourcemap";

    var bundleCompiler = webpack(bundleConfig);
    bundleCompiler.run(function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build-bundle", err);
            return;
        }
        gutil.log("[webpack:build-bundle]", stats.toString({
            colors: true
        }));
        cb();
    });
});

//webpack production
gulp.task('webpackPro',function(cb){
    var config = Object.create(webpackConfig);
    config.output.path = path.join(__dirname, './dist/js');
    config.output.filename = '[name].min.js';
    config.output.chunkFilename = '[id].chunk.min.js';
    config.plugins = config.plugins.concat(
        new webpack.optimize.CommonsChunkPlugin({
            name:["common"],
            filename:"[name].min.js",
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': {
                // "NODE_ENV": JSON.stringify("production")
                NODE_ENV: '"production"'
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
        cb();
    });
});

//browserSync
gulp.task('server',function(){
    bs.init({
        proxy: "http://localhost:3005"
    });
    gulp.watch(src.html,['copyDevHtml']);
    gulp.watch("dist/html/**/*.html").on("change",bs.reload);
    gulp.watch([src.css,"src/pages/**/*.scss"], ['style']);
    gulp.watch('dist/js/*.*').on("change",bs.reload);
});

gulp.task('buildSuccess',function(cb){
    console.log('build success');
    cb();
});

gulp.task('build',gulpSequence('clean',['copyProHtml','copyJs','copyFonts','copyImg','proStyle'],'webpackPro','buildSuccess'));

gulp.task("dev",gulpSequence('clean',['copyDevHtml','copyJs','copyFonts','copyImg','style'],'webpackBundle','server'));
