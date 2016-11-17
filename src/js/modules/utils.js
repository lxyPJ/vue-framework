var $ = require('zepto');

var ajaxRequest = require('ajaxRequest');

var utils = {};

//获取指定查询参数的值
utils.getSearchParam = function (SearchName) {
    try {
        var strSearch = decodeURI(window.location.search);
        if (strSearch !== '') {
            var strTemp = strSearch.substr(1, strSearch.length);
            var arrSearch = strTemp.split("&");
            for (var i = 0; i < arrSearch.length; i++) {
                if (arrSearch[i].indexOf(SearchName) == 0) {
                    var idx = arrSearch[i].indexOf("=");
                    return arrSearch[i].substring((idx+1),arrSearch[i].length);
                }
            }
            return "";
        } else {
            return "";
        }
    } catch (e) {
        return "";
    }
};

//判断变量是否有正确的值
utils.isCorrectVal = function(variable){
    if(
        variable === '' || variable === 'undefined' || variable === 'null' || variable === null ||
        variable === undefined
    ){
        return false;
    }else{
        return true;
    }
};

//获取时间点函数
utils.showTime = function(t){
    var date = new Date();
    date.setTime(t);
    var h = date.getHours();
    var n; (h>12) ? n = 'pm' : n = 'am';
    (h > 12) ? h -= 12 : h = h;
    var m = date.getMinutes();
    (m.toString().length == '1') ? m = '0' + m : m = m;
    return h + ':' + m + n;
};

//费用保留两位小数函数
utils.payHandler = function(pay){
    var dues = (parseInt(pay)/100).toString();
    var idx = dues.indexOf('.');
    if(idx == -1){
        if(dues == 'NaN'){
            dues = '0';
        }
        return dues + '.00';
    }else{
        if(dues == 'NaN'){
            dues = '0';
        }else if(dues.length == 3){
            dues += '0';
        }else if(dues.length > 3){
            dues = dues.slice(0,5);
        }
        return dues;
    }
};

//获取时长的函数
utils.showLong = function (t){
    var hourInt = Math.floor(t/1000/3600);
    var minuteInt = Math.ceil(t/1000%3600/60);
    if(minuteInt == 0){
        var m = '';
    }else if(minuteInt < 10){
        var m = '0' + minuteInt + 'm';
        if(hourInt == 0) m += 'in';
    }else{
        var m = minuteInt + 'm';
        if(hourInt == 0) m += 'in';
    }
    if(hourInt == 0){
        var h = '';
    }else{
        var h = hourInt + 'h';
        if(minuteInt == 0) h += 'our';
    }
    return h + m;
};

/**
 * 将时间戳转换为类似'2016-5-31 10:25am'的格式
 * @param tl
 * @returns {string}
 */
utils.dateTime = function(tl){
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
    return yea + mou + day + ' ' + hou + ':' + min + ':' + sen;
};

/**
 * 将时间戳转换为类似'2016-5-31'的格式
 * @param tl
 * @returns {string}
 */
utils.dateFormat = function(tl){
    var date = new Date(tl);
    //date.setTime(tl);
    var day = (date.getDate().toString());
    (day.length == 1) ? day = '0' + day : day = day;
    var mou = ((date.getMonth() + 1).toString());
    (mou.length == 1) ? mou = '0' + mou : mou = mou;
    var yea = (date.getFullYear().toString());
    return yea + '.' + mou + '.' + day;
};

/**
 * 时分秒倒计时
 */
utils.countDown = function(timeLong,n){
    var total = Math.floor(timeLong/1000/60);
    var total_s = Math.floor(total*60);
    function fn(){
        //时
        var h = Math.floor(total_s/(60*60));
        //分
        var m = Math.floor(total_s/60) - (h*60);
        //秒
        var s = Math.floor(total_s - (h*60*60) - (m*60));

        (h == '0') ? h = '' : h = h + ':';
        (h.toString().length == '2') ? h = '0' + h : h = h;
        (m == '0') ? m = '0:' : m = m + ':';
        (m.toString().length == '2') ? m = '0' + m : m = m;
        (s.toString().length == '1') ? s = '0' + s : s = s ;
        (s.toString().length >= '2') ? s = s.toString().slice(0,2) : s = s;
        var countDownEle = {
            1:document.getElementById("prepareEle"),
            2:document.getElementById("deliverEle")
        };
        countDownEle[n].innerHTML = h + m + s;

        total_s -= 1;
        if(total_s <= 0){
            clearInterval(interval);
            countDownEle[n].innerHTML = '00:00';
        }
    }
    var interval = setInterval(fn,1000);
};

//对象继承
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

//创建list参数
utils.listParam = function(data,name,field){
    var list = '?';
    for(let i=0; i < data.length; i++){
        if(i == 0){
            list += name + '[]=' + data[i][field]
        }else{
            list += '&' + name + '[]=' + data[i][field]
        }
    }
    return list;
};

//判断数字是否为整数
utils.isInt = function(val){
    return typeof val === 'number' && val%1 === 0
};

utils.isEmptyObj = function(obj){
    var n = 0;
    for(let key in obj){
        n += 1;
    }
    if(n == 0){
        return true;
    }else{
        return false;
    }
}

module.exports = utils;