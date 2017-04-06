/**
 * Created by lixy on 2016/11/26.
 * localstorage resource loader
 */
//脚本文件队列
var scriptQueue = [];
var LSresourceLoader = function(options){
    var constructor = function(options){
        var self = this;
        self.url = options.url;
        self.no = options.no;
        self.ver = options.ver;
        self.onload = options.onload;
        var currentScript = {
            no:self.no,
            ver:self.ver,
            key:null,
            text:null,
            onload:self.onload,
            done:false
        };
        scriptQueue[self.no] = currentScript;
        //从localstorage中读取脚本
        var script = self.getScriptFromLS(self.url);
        var preVer = localStorage.getItem('cache-js-' + self.no);
        if(script !== null && self.ver !== 'refresh' && preVer === self.ver){
            currentScript.key = self.url;
            currentScript.text = script;
            self.injectScriptsInOrder(self);
        }else if(script === null || self.ver === 'refresh' || preVer !== self.ver){
            var xhr = null;
            try {
                xhr = new XMLHttpRequest();
            } catch (e) {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
            xhr.open('GET',options.url,true);
            xhr.send(null);
            xhr.onreadystatechange = function() {
                if ( xhr.readyState == 4 ) {
                    if ( xhr.status == 200 ) {
                        console.log('获取脚本：' + self.url);
                        self.setScriptToLS(self.url,xhr.responseText,self.no,self.ver);
                        currentScript.key = self.url;
                        currentScript.text = xhr.responseText;
                        self.injectScriptsInOrder(self);
                    } else {
                        console.log('出错了,Err：' + xhr.status);
                    }
                }
            }
        }
    };

    //从localstorage中读取脚本
    constructor.prototype.getScriptFromLS = function(key){
        if(window.localStorage){
            return localStorage.getItem(key);
        }
        return null;
    };
    //将脚本写入localstorage
    constructor.prototype.setScriptToLS = function(key,text,no,ver){
        if(window.localStorage){
            localStorage.setItem(key,text);
            localStorage.setItem('cache-js-' + no,ver);
        }
    };
    constructor.prototype.injectScriptsInOrder = function(self){
        var len = scriptQueue.length;
        //按顺序执行队列中的脚本
        for (var i = 0; i < len; i++) {
            var script = scriptQueue[i];
            //没有执行
            if(!script.done){
                //没有加载完成
                if(script.text === null){
                    //停止，等待加载完成, 由于脚本是按顺序添加到队列的，因此这里保证了脚本的执行顺序
                    break;
                }else{//已经加载完成了
                    self.injectScriptTagToDOM(script);
                    if(i == quantity-1){
                        console.log('资源准备就绪');
                    }
                }
            }
        }
    };

    //将脚本插入dom结构
    constructor.prototype.injectScriptTagToDOM = function(script){
        var scriptEl = document.createElement ("script");
        scriptEl.type = "text/javascript";
        scriptEl.text = script.text;
        document.getElementsByTagName("body")[0].appendChild(scriptEl);
        script.onload && script.onload();
        script.done = true;
        console.log(script.key + ' 插入了DOM');
    };

    return new constructor(options);
};
