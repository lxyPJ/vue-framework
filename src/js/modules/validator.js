import utils from "utils";
import store from "../store";

/* ================================================================================================================== */

/**
 *
 * @param value
 * @param required(Boolean)
 * @param validate(Function)
 * @param msg(String){missing,error}
 *
 */
var validator = function(datas,callback){
	var myValidator = function(datas,callback){
		var self = this;
		self.quit = false;
		for(var i=0; i<datas.length; i++){
			if(self.quit) break;
			handle(i);
			function handle(i){
				var data = datas[i];
				if(data.required && !utils.isCorrectVal(data.value)){
					self.quit = true;
					store.commit('alert',{
						str:data.msg.missing,
						show:true
					});
					return;
				}
				if(typeof data.validate === "function" && data.validate(data.value)){
					self.quit = true;
					store.commit('alert',{
						str:data.msg.error,
						show:true
					});
				}
			}
		}
		if(self.quit) return;
		callback && callback();
	};
	return new myValidator(datas,callback);
};

module.exports = validator;