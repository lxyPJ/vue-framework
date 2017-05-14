var webpack = require("webpack"),
    path = require("path"),
    copyWebpackPlugin = require("copy-webpack-plugin"),
    ExtractTextWebpackPlugin = require("extract-text-webpack-plugin"),
    vuxLoader = require('vux-loader'),
    prevue = require('./prevue.config.js');

var config = {
    entry:{
        /* 核心框架 */
        vendor:[
            "es6-promise",
            "vue",
            "vue-router",
            "vuex"
        ],
        /* 入口文件 */
        app:"./src/pages/app/index.js"
    },
    output : {
        path:path.resolve(__dirname, './dist'),
        filename:'js/[name].js',
        chunkFilename:'js/[name].js',
        publicPath : "../"
    },
    module:{
        rules:[
            {
                test:/\.(gif|png|jpg|woff|woff2|eot|ttf|svg)(\?t=\d+)?$/,
                loader : "url-loader?limit=10000"
            },
            {
                test: /\.(css)?$/,
                loader:'style-loader!css-loader'
            },
            {
                test: /\.(less)?$/,
                use:['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test:/\.scss$/,
                use:ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','postcss-loader','sass-loader','resolve-url-loader']
                })
            },
            {
                test: /\.(js)?$/,
                exclude:/node_modules/,
                use: ['babel-loader']
            },
            {
                test:/\.vue$/,
                use: [
                    {
                        loader: 'vux-loader'
                    },
                    {
                        loader:'vue-loader',
                        options:{
                            loaders:{
                                js:'babel-loader',
                                scss:'vue-style-loader!style-loader!css-loader!sass-loader'
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
                        }
                    }
                ]
            }
        ]
    },
    resolve : {
        extensions : ['.js', '.vue', '.json'],
        alias:{
            "vue$":"vue/dist/vue.common.js",
            "@css":path.resolve(__dirname,"src/css/"),
            /* 常量 */
            "constant":path.resolve(__dirname,"src/store_modules/constant.js"),
            /* js */
            "tween":path.resolve(__dirname,"src/js/tween.js"),//缓动动画引擎
            "slideload":path.resolve(__dirname,"src/js/slideload.js"),//下拉刷新与无限滚动    
            "utils":path.resolve(__dirname,"src/js/utils.js"),//工具库
            "validator":path.resolve(__dirname,"src/js/validator.js"),//表單驗證
            "animate":path.resolve(__dirname,"src/js/animate.js"),//动画        
            /* components */
            "solidBtn":path.resolve(__dirname,"src/components/solid-button/index.vue"),//按钮
            "pageLoading":path.resolve(__dirname,"src/components/page-loading/index.vue"),//页面loading
            /* views */
        }
    },
    plugins:[
        new copyWebpackPlugin([
            {from:'src/js/responsive.js',to:'js/responsive.js'}
        ]),
        new ExtractTextWebpackPlugin({
            filename:"css/app.[chunkhash].css"
        }),
        new webpack.LoaderOptionsPlugin({
            options:{
                postcss:function(){
                    return [require('autoprefixer')({
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
                    })];
                }
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:"app",
            async:"mock",
            minChunks:function(module,count){
                return module.resource && (/mock\.js/).test(module.resource) && count === 3;
            }
        })
    ]
};

var finalConfig = vuxLoader.merge(config, {
    plugins: [
        {
            name: 'vux-ui'
        }
    ]
});
var vuxBabel = finalConfig.module.rules.pop();
finalConfig.module.rules.pop();
finalConfig.module.rules.push(vuxBabel);

exports = module.exports = finalConfig;