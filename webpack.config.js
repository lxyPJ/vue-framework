var webpack = require('webpack');
var path = require("path");

var config = {
    entry:{
        common:[
            "es6-promise",
            /* 核心框架 */
            "vue",
            "vue-router",
            "vuex"
        ],
        app:"./src/pages/app/index.js"
    },
    output : {
        path:path.join(__dirname, './dist/js'),
        filename:'[name].js',
        chunkFilename:'[id].chunk.js',
        publicPath : "../js/"
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
                test: /\.(css)?$/,
                loader:'style!css'
            },
            {
                test:/\.vue$/,
                exclude:/node_modules/,
                loader:'vue'
            }
        ]
    },
    vue:{
        loaders:{
            js:'babel',
            scss:'vue-style!style!css!sass'
        },
        postcss:[require('autoprefixer')({
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
        })]
    },
    resolve : {
        extensions : ['','.js'],
        alias:{
            "vue$":"vue/dist/vue.common.js",
            /* 常量 */
            "constant":path.join(__dirname,"src/store_modules/constant.js"),
            /* js */
            "tween":path.join(__dirname,"src/js/tween.js"),//缓动动画引擎
            "slideload":path.join(__dirname,"src/js/slideload.js"),//下拉刷新与无限滚动    
            "utils":path.join(__dirname,"src/js/utils.js"),//工具库
            "validator":path.join(__dirname,"src/js/validator.js"),//表單驗證
            "animate":path.join(__dirname,"src/js/animate.js"),//动画        
            /* components */
            "solidBtn":path.join(__dirname,"src/components/solid-button/index.vue"),//按钮
            "pageLoading":path.join(__dirname,"src/components/page-loading/index.vue"),//页面loading
            /* views */
            "loadMore":path.join(__dirname,"src/views/load-more/index.vue")//下拉刷新与无限滚动demo页面
        }
    },
    plugins:[]
};
exports = module.exports = config;