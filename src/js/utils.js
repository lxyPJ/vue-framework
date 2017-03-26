var utils = {};

//费用保留两位小数函数
utils.payHandler = function(pay){
    var num = 0;
    if(typeof val === "number"){
        if(!isNaN(val)){
            num = val;
        }
    }
    return num.toFixed(2);
};

/**
 * 将时间戳转换为类似'2016-5-31 10:25'的格式
 * @param tl
 * @returns {string}
 */
utils.time2str = function(tl){ //datatables使用
    var date = new Date();
    date.setTime(tl);
    var day = (date.getDate().toString());
    (day.length == 1) ? day = '0' + day : day = day;
    var mou = ((date.getMonth() + 1).toString());
    (mou.length == 1) ? mou = '0' + mou : mou = mou;
    var yea = (date.getFullYear().toString());
    var hou = ((date.getHours()).toString());
    (hou.length == 1) ? hou = '0' + hou : hou = hou;
    var min = ((date.getMinutes()).toString());
    (min.length == 1) ? min = '0' + min : min = min;
    var sen = ((date.getSeconds()).toString());
    (sen.length == 1) ? sen = '0' + sen : sen = sen;
    return yea + '-' + mou + '-' + day + ' ' + hou + ':' + min + ':' + sen;
};

/**
 * 转换时间字符串为时间戳
 * @param strTime {String} .e.g "2017-02-13 10:02:58" or "2017-02-13"
 */
utils.str2time = function(strTime){
    //new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
    strTime = strTime.trim();
    var type = (strTime.indexOf(' ') == -1) ? "date" : "dateTime";
    var arr = strTime.split(' '),
        date,
        time,
        dateArr,
        year,month,day,
        timeArr,
        hour,minutes,seconds;

    date = arr[0];
    dateArr = date.split('-');
    year = dateArr[0];
    month = dateArr[1];
    day = dateArr[2];
    if(type === 'dateTime'){
        time = arr[1];
        timeArr = time.split(':');     
        hour = timeArr[0];
        minutes = timeArr[1];
        seconds = timeArr[2];
        return new Date(year,month-1,day,hour,minutes,seconds).getTime()/1000;                                            
    }else{
        return new Date(year,month-1,day).getTime()/1000;
    }
}

//判断数字是否为整数
utils.isInt = function(val){
    return typeof val === 'number' && val%1 === 0
};

//判断对象是否为空对象
utils.isEmptyObject = function(obj){
    for(var key in obj){
        return false;
    }
    return true;
};

//获取由对象属性数组
utils.keys = function(obj){
    if (!Object.keys) {
        return (function() {
            'use strict';
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function(obj) {
            if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                if (hasOwnProperty.call(obj, dontEnums[i])) {
                    result.push(dontEnums[i]);
                }
                }
            }
            return result;
            };
        }());
    }else{
        return Object.keys(obj);
    }
};

//判断变量是否是对象
utils.isObject = function(obj){
    return Object.prototype.toString.call(obj) === "[object Object]";
};

//判断变量是否是数组
utils.isArray = function(arr){
    return Object.prototype.toString.call(arr) === "[object Array]";
};

//判断变量是否有正确的值
utils.isCorrectVal = function(variable){
    var result = true;
    if(typeof variable === "string"){
        if(variable === '' || variable === 'undefined' || variable === 'null' || variable === 'NaN' || variable === 'Infinity'){
            result = false;
        }
    }else if(typeof variable === "number"){
        if(isNaN(variable) || !isFinite(variable)){
            result = false;
        }
    }else if(variable === null){
        result = false;
    }else if(typeof variable === 'undefined'){
        result = false;
    }else if(this.isObject(variable)){
        if(this.isEmptyObject(variable)){
            result = false;
        }
    }else if(this.isArray(variable)){
        if(variable.length === 0){
            result = false;
        }
    }
    return result;
}.bind(utils);

//object继承
utils.objInheritance = function(obj,proto){
    obj = Object(obj);
    var newObj = Object.create(proto);
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key] = obj[key];
        }
    }
    return newObj;
};

//array object 浅拷贝
utils.clone = function(obj){
    var isObject = this.isObject(obj),
        isArray = this.isArray(obj);
    if(isArray){
        return obj.slice(0);
    }else if(isObject){
        var newObj = {};
        for(var key in obj){
            newObj[key] = obj[key];
        }
        return newObj;
    }else{
        return obj;
    }
}.bind(utils);

//array object 深拷贝
utils.cloneDeep = function(obj){
    var isObject = this.isObject(obj),
        isArray = this.isArray(obj);
    if(isObject){
        var newObj = {};
        for(var key in obj){
            newObj[key] = this.cloneDeep(obj[key]);
        }
        return newObj;
    }else if(isArray){
        var newArr = [];
        for(var key in obj){
            newArr[key] = this.cloneDeep(obj[key]);
        }
        return newArr;
    }else{
        return obj;
    }
}.bind(utils);

//快速排序
utils.quickSort = function(arr){
    if(arr.length<=1){
        return arr;
    }
    var num = Math.floor(arr.length/2);
    var numVal = arr.splice(num,1)[0];
    var left = [];
    var right = [];
    for(var i=0; i<arr.length; i++){
        if(arr[i]<numVal){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }                                  
    return this.quickSort(left).concat([numVal],this.quickSort(right));
}.bind(utils);

export default utils;