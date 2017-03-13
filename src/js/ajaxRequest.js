import store from "store";
import { MessageBox } from 'mint-ui';
import { baseUrl } from "constant";

var ajaxRequest = function(options) {
	options.data.reqTime = new Date().getTime();
	var contentType;
	if(options.contentType == "application/json"){
		options.data = JSON.stringify(options.data);
		contentType = options.contentType;
	}else{
		contentType = "application/x-www-form-urlencoded";
	}
	var async;
	if(options.async === undefined){
		async = true;
	}else{
		async = options.async;
	}

	return $.ajax({
		type : options.type,
		timeout : 15000, //超时时间设置，单位毫秒
		url : baseUrl + options.url,
		contentType : contentType,
		dataType : "json",
		async:async,
		data : options.data,
		beforeSend:function(xhr){
			if(options.url !== 'store/pickerLogin'){
				if(JSON.parse(sessionStorage.getItem('employee')) === null) return;
				xhr.setRequestHeader("accessToken",JSON.parse(sessionStorage.getItem('employee')).accessToken);
			}
		},
		success : function(data) {
			if(data.code == '10007'){
                MessageBox('提示', '登录超时，请重新登录');
				window.location.href = 'app.html#/login';
			}
			if (typeof options.callback == "function") {
				options.callback(data);
			}
		},
		error : function(data) {
			if (data && (data.status == 0) && (data.statusText == 'error')) {
                MessageBox('提示', '请检查网络是否正常，或者重试');
			}
			if (data && (data.status == 500)) {
                MessageBox('提示', '访问服务器出错，服务器内部错误');
			}
			if (data && (data.status == 404)) {
                MessageBox('提示', '访问地址错误');
			}
		},
		complete : function(XMLHttpRequest, status) { //请求完成后最终执行参数
			if (status == 'timeout') {//超时,status还有success,error等值的情况
                MessageBox('提示', '您可以选择继续等待，或者取消');
			}
			if (typeof options.complete == "function") {
				options.complete();
			}
		}
	});
};
ajaxRequest.options = {
	type:"",
	url:"",
	data:"",
	callback:null,
	complete:null
};

export default ajaxRequest;