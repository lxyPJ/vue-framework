import TWEEN from "tween";

/**
 * @param element {HTMLElement} 目标元素
 */
window._animate = function(element){
    /**
     * 位移动画
     * @param options {Object}
     *         1. direction {String} e.g "x" 水平方向 "y"垂直方向
     *         2. start {Number} 动画起点
     *         3. end {Number} 动画终点 
     *         4. duration {Number} 动画持续时间
     */
    this.move = function(options){
        if(!this.utils.isObject(options)){
            throw "[Animate warn] options should be a object!";
            return;
        }

        //获取动画方向
        if(options.direction === "x"){
            this.direction = "horizontal";
        }else if(options.direction === "y"){
            this.direction = "vertical";
        }

        //获取当前浏览器支持的animatePropertyName
        if(this.transformVendor !== false){
            this.movePropertyName = this.utils.prefixStyle(this.transformVendor,"transform");
            this.movePropertyValue = function(num){
                var valueMap = {
                    "vertical":"translate3d(0px, " + num + "px, 0.01px)",
                    "horizontal":"translate3d(" + num + "px, 0px, 0.01px)"
                };
                return valueMap[this.direction];
            };
        }else{
            this.movePropertyName = (this.direction === "horizontal") ? "left" : "top";
            this.movePropertyValue = function(num){
                return num + "px";
            };
        }

        if(this.supportTransition){
            this.style[this.transition] = options.duration + "ms ease-out";
        }

        this._move(options.duration,options.start,options.end);

        return this;
    };

    //初始化
    this.init(element);
}
window._animate.prototype.init = function(element){
    this.style = element.style;

    //設置transform & transition 浏览器厂商前缀
    this.transformVendor = this.utils.vendor("transform");
    this.transitionVendor = this.utils.vendor("transition");

    //判断当前浏览器是否支持transition
    this.supportTransition = false;
    if(this.transitionVendor !== false){
        this.supportTransition = true;
        this.transition = this.utils.prefixStyle(this.transitionVendor,"transition");

        this.transEndEventNames = {
            WebkitTransition:"webkitTransitionEnd",
            MozTransition:"transitionend",
            msTransition:"transitionend",        
            OTransition:"oTransitionEnd otransitionend",
            transition:"transitionend"
        }
        this.transEndEventNames = this.transEndEventNames[this.transition];
        element.addEventListener(this.transEndEventNames,function(){
            this.style[this.transition] = "";
        }.bind(this),false);
        //位移动画
        this._move = function(duration,startNum,endNum){
            this.style[this.movePropertyName] = this.movePropertyValue(endNum);
        };
    }else{
        //位移动画
        this._move = function(duration,startNum,endNum){
            var self = this;
            self.moveProperties = { y:startNum };
            var tween = new TWEEN.Tween(self.moveProperties)
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ y:endNum },duration)
                .onUpdate(function() {
                    self.style[self.movePropertyName] = self.movePropertyValue(this.y);
                })
                .onComplete(function(obj){
                    
                })
                .start();
            self.utils.rAF(animate);
            function animate(time) {
                self.utils.rAF(animate);
                TWEEN.update();
            }
        };
    }
};
window._animate.prototype.utils = {
    //获取各浏览器对应的css属性的兼容性前缀
    vendor:function (property) {
        var _elementStyle = document.createElement('div').style;
        var property = property.slice(1);
        var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
            transform,
            i = 0,
            l = vendors.length;

        for ( ; i < l; i++ ) {
            transform = vendors[i] + property;
            if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
        }

        return false;
    },
    //给传入的样式添加兼容性前缀
    prefixStyle:function(vendor,property){
        if ( vendor === false ) return false;
        if ( vendor === '' ) return property;
        return vendor + property.charAt(0).toUpperCase() + property.substr(1);
    },
    //js动画引擎
    rAF:function(cb){
        var rAF = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (cb) { window.setTimeout(cb, 1000 / 60); };
        return rAF(cb);
    },
    isObject:function(obj){
        return Object.prototype.toString.call(obj) === "[object Object]";
    }
};

function animate(element){
    return new window._animate(element);
}

export default animate;