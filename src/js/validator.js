import utils from 'utils';

/**
 *
 * @param value
 * @param required {Boolean}
 * @param validate {Function}
 * @param msg {String} missing,error
 *
 */
window._validator = function(datas,callback){
	var self = this;

	self.regExps = {
		email:/^[\w-]+@[a-z0-9]+(\.[a-z]+){1,3}$/,
		phone:/^1[34578]{1}\d{9}$/,
		password:/^\b(?![0-9]+$)(?![a-z]+$)[a-z0-9]{8,}\b$/i //至少8位，只能由数字和字母组成
	};

	self.quit = false;
	for(var i=0; i<datas.length; i++){
		if(self.quit) break;
		handle(i);
		function handle(i){
			var data = datas[i];
			if(data.required && !utils.isCorrectVal(data.value)){
				self.quit = true;
				
				alert(data.msg.missing);
				
				return;
			}else if(typeof data.validate === "function" && !data.validate.call(self)){
				self.quit = true;
				
				alert(data.msg.error);

			}
		}
	}
	if(self.quit) return;
	callback && callback();
};
function validator(datas,callback){
	return new window._validator(datas,callback);
};

export default validator;