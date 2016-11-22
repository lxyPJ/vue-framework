var zepto = require('zepto');

var slideload = function(){
    'use strict';
    var win = window;
    var doc = document;
    var $win = $(win);
    var $doc = $(doc);
    $.fn.slideload = function(options){
        return new MySlideLoad(this, options);
    };
    var MySlideLoad = function(element,options){
        var me = this;
        me.$element = element;//滑动元素
        me.init(options);//初始化
    };
    //初始化
    MySlideLoad.prototype.init = function(options){
        var me = this;
        me.opts = $.extend(true, {}, {
            scrollArea : me.$element,                                             //滑动区域
            scrollCont : undefined,                                               //列表容器
            loading : false,                                                      //loading状态
            isLockUp : false,                                                     //下拉刷新是否锁定
            isLockDown : false,                                                   //上拉加载是否锁定
            isData : true,                                                        //请求结果是否有数据
            direction : 'up',                                                     //滑动方向
            scrollTop : 0,                                                        //滚动条位置
            scrollContentHeight : 0,                                              //列表容器高度
            limitNo : 0,                                                          //触发上拉加载的阈值
            distance : 50,                                                        //触发下拉刷新的阈值
            threshold : 0,                                                        //滚动提前加载距离
            loadUpFn : '',                                                        //下拉刷新function
            loadDownFn : ''                                                       //上拉加载function
        }, options);

        //滚动区域
        me._scrollWindowHeight = me.$element[0].getBoundingClientRect().height;

        //自动加载
        fnAutoLoad(me);

        // 窗口调整
        $win.on('resize',function(){
            me._scrollWindowHeight = me.$element.height();
        });

        //绑定触摸
        me.$element.on('touchstart',function(e){
            if(!me.opts.loading){
                fnTouches(e);
                fnTouchstart(e, me);
            }
        });
        me.$element.on('touchmove',function(e){
            if(!me.opts.loading){
                fnTouches(e, me);
                fnTouchmove(e, me);
            }
        });
        me.$element.on('touchend',function(){
            if(!me.opts.loading){
                fnTouchend(me);
            }
        });

        //监听列表滚动，到底部自动加载数据
        me.$element.on('scroll',function(){
            //获取列表容器高度
            getScrollContentHeight(me);
            me.opts.limitNo = Number(me.opts.scrollContentHeight - me._scrollWindowHeight);
            me.opts.scrollTop = me.$element.scrollTop();
            //滚动页面触发加载数据
            if(me.opts.limitNo > 0 && me.opts.direction == 'up' && me.opts.loadDownFn != '' && !me.opts.loading && !me.opts.isLockDown && me.opts.limitNo-me.opts.threshold <= me.opts.scrollTop){
                me.lock("down");
                loadDown(me);
            }
        });

    };

    //touches
    function fnTouches(e){
        if(!e.touches){
            e.touches = e.originalEvent.touches;
        }
    }

    //touchstart
    function fnTouchstart(e, me){
        if(me.opts.loading == false){
            me.unlock();
        }
        //滑动起点
        me._startY = e.touches[0].screenY;
        //纪录触摸时滚动条的位置
        me.opts.scrollTop = me.$element.scrollTop();
        $(".drop-loading").html('');
        if(me.opts.scrollTop == 0){
            me.$element[0].scrollTop = 1;
        }
    }

    //touchmove
    function fnTouchmove(e, me){

        me._curY = e.touches[0].screenY;
        me._moveY = me._curY - me._startY;

        //获取滑动方向
        if(me._moveY > 0){
            me.opts.direction = 'down';
        }else if(me._moveY < 0){
            me.opts.direction = 'up';
        }

        //下拉
        me.opts.scrollTop = me.$element.scrollTop();
        if(me.opts.loadUpFn != '' && me.opts.scrollTop <= 0 && me.opts.direction == 'down' && !me.opts.isLockUp){
            //下拉刷新
            if(me.opts.scrollTop < -10){
                $(".drop-loading").html(lang.ajax.pullDown);
            }
            if(me.opts.scrollTop < -50){
                $(".drop-loading").html(lang.ajax.release);
            }
        }
    }

    //touchend
    function fnTouchend(me){
        if(me.opts.loadUpFn != '' && me.opts.scrollTop < -50 && me.opts.direction == 'down' && !me.opts.isLockUp){
            var spinner = '<div class="spinner">'+
                '<div class="spinner-container container1">'+
                '<div class="circle1"></div>'+
                '<div class="circle2"></div>'+
                '<div class="circle3"></div>'+
                '<div class="circle4"></div>'+
                '</div>'+
                '<div class="spinner-container container2">'+
                '<div class="circle1"></div>'+
                '<div class="circle2"></div>'+
                '<div class="circle3"></div>'+
                '<div class="circle4"></div>'+
                '</div>'+
                '<div class="spinner-container container3">'+
                '<div class="circle1"></div>'+
                '<div class="circle2"></div>'+
                '<div class="circle3"></div>'+
                '<div class="circle4"></div>'+
                '</div>'+
                '</div>';
            $(".drop-loading").html(spinner);
            var scrollCont = document.querySelector(me.opts.scrollCont);
            scrollCont.style.transition = '500ms';
            scrollCont.style.transform = 'translate3d(0px,44px,0px)';
            me.opts.loading = true;
            me.unlock();
            me.opts.loadUpFn(me);
        }else{
            $(".drop-loading").html('');
        }
    }

    // 如果文档高度不大于窗口高度，数据较少，自动加载下方数据
    function fnAutoLoad(me){
        //获取列表容器高度
        getScrollContentHeight(me);
        //如果需要下拉刷新功能
        if(me.opts.loadUpFn == '' && me.opts.loadDownFn != ''){
            if(me.opts.scrollContentHeight <= me._scrollWindowHeight){
                loadDown(me);
            }
        }else if(me.opts.loadUpFn != '' && me.opts.loadDownFn != ''){
            if(me.opts.scrollContentHeight <= me._scrollWindowHeight*1.01){
                loadDown(me);
            }
        }else if(me.opts.loadUpFn != '' && me.opts.loadDownFn == ''){
            me.opts.loading = true;
            me.unlock();
            me.opts.loadUpFn(me);
        }
    }

    //获取列表容器高度
    function getScrollContentHeight(me){
        var rect = document.querySelector(me.opts.scrollCont).getBoundingClientRect();
        me.opts.scrollContentHeight = Math.floor(rect.height);
    }

    //上拉加载
    function loadDown(me){
        me.opts.loading = true;
        me.opts.loadDownFn(me);
    }

    //锁定
    MySlideLoad.prototype.lock = function(direction){
        var me = this;
        //如果不指定方向
        if(direction === undefined){
            //如果操作方向向上
            if(me.opts.direction == 'up'){
                me.opts.isLockDown = true;
                //如果操作方向向下
            }else if(me.opts.direction == 'down'){
                me.opts.isLockUp = true;
            }else{
                me.opts.isLockUp = true;
                me.opts.isLockDown = true;
            }
            //如果指定锁上方
        }else if(direction == 'up'){
            me.opts.isLockUp = true;
            //如果指定锁下方
        }else if(direction == 'down'){
            me.opts.isLockDown = true;
        }
    };

    //解锁
    MySlideLoad.prototype.unlock = function(){
        var me = this;
        //简单粗暴解锁
        me.opts.isLockUp = false;
        me.opts.isLockDown = false;
    };

    //无数据
    MySlideLoad.prototype.noData = function(flag){
        var me = this;
        if(flag === undefined || flag == true){
            me.opts.isData = false;
        }else if(flag == false){
            me.opts.isData = true;
        }
    };

    //重置
    MySlideLoad.prototype.resetload = function(){
        var me = this;
        me.opts.loading = false;

        if(me.opts.direction == 'down'){
            //获取列表容器高度
            getScrollContentHeight(me);
        }else if(me.opts.direction == 'up'){
            //如果有数据
            if(me.opts.isData){
                //获取列表容器高度
                getScrollContentHeight(me);
                fnAutoLoad(me);
            }
        }
    };

}();

module.exports = slideload;