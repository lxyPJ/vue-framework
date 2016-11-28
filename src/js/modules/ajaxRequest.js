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
		/*beforeSend:function(xhr){
			if(options.url !== 'store/loginStore'){
				xhr.setRequestHeader("accessToken",JSON.parse(localStorage.getItem('employee')).accessToken);
			}
		},*/
		success : function(data) {
			if(data.code == '10007'){
				alert('登录超时，请重新登录');
				window.location.href = '../sign-in';
			}
			if (typeof options.callback == "function") {
				options.callback(data);
			}
		},
		error : function(data) {
			if (data && (data.statusText == 'timeout')) {
				alert('请求超时,请重试');
			}
			if (data && (data.status == 0) && (data.statusText == 'error')) {
				alert('请检查网络是否正常，或者重试');
			}
			if (data && (data.status == 500)) {
				alert('访问服务器出错，服务器内部错误');
			}
			if (data && (data.status == 404)) {
				alert('访问地址错误');
			}
		},
		complete : function(XMLHttpRequest, status) { //请求完成后最终执行参数
			if (status == 'timeout') {//超时,status还有success,error等值的情况
				alert('您可以选择继续等待，或者取消');
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
	callback:"",
	complete:''
};

module.exports = ajaxRequest;

