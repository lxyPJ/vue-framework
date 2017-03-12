webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _index = __webpack_require__(3);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _router = __webpack_require__(5);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _solidBtn = __webpack_require__(63);
	
	var _solidBtn2 = _interopRequireDefault(_solidBtn);
	
	var _pageLoading = __webpack_require__(69);
	
	var _pageLoading2 = _interopRequireDefault(_pageLoading);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.component('solid-button', _solidBtn2.default);
	
	//pages公用组件
	
	_vue2.default.component('page-loading', _pageLoading2.default);
	
	//根实例
	var app = new _vue2.default({
	    router: _router2.default,
	    store: _index2.default
	}).$mount("#view");

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vuex = __webpack_require__(4);
	
	var _vuex2 = _interopRequireDefault(_vuex);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.use(_vuex2.default);
	
	exports.default = new _vuex2.default.Store({
	    state: {
	        pageLoading: false
	    },
	    mutations: {
	        pageLoading: function pageLoading(state, payload) {
	            state.pageLoading = payload.pageLoading;
	        }
	    },
	    actions: {},
	    modules: {}
	});

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _index = __webpack_require__(3);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _vueRouter = __webpack_require__(6);
	
	var _vueRouter2 = _interopRequireDefault(_vueRouter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.use(_vueRouter2.default);
	
	if (window.location.hash == '') {
	    window.location.hash = '/loadMore';
	}
	//异步组件
	var loadMore = function loadMore(resolve) {
	    __webpack_require__.e/* nsure */(1, function () {
	        resolve(__webpack_require__(7));
	    });
	};
	//定义路由
	var routes = [{
	    path: '/loadMore',
	    component: loadMore
	}];
	var router = new _vueRouter2.default({
	    routes: routes
	});
	router.beforeEach(function (to, from, next) {
	    _index2.default.commit('pageLoading', {
	        pageLoading: true
	    });
	    next();
	});
	router.afterEach(function (router) {
	    _index2.default.commit('pageLoading', {
	        pageLoading: false
	    });
	});
	
	exports = module.exports = router;

/***/ }
]);
//# sourceMappingURL=app.js.map