webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _store = __webpack_require__(2);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _vueRouter = __webpack_require__(4);
	
	var _vueRouter2 = _interopRequireDefault(_vueRouter);
	
	var _solidButton = __webpack_require__(5);
	
	var _solidButton2 = _interopRequireDefault(_solidButton);
	
	var _pageLoading = __webpack_require__(77);
	
	var _pageLoading2 = _interopRequireDefault(_pageLoading);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(80);
	//状态容器
	
	//路由
	
	_vue2.default.use(_vueRouter2.default);
	//组件
	
	_vue2.default.component('solid-button', _solidButton2.default);
	
	_vue2.default.component('page-loading', _pageLoading2.default);
	var swipe = function swipe(resolve) {
	    __webpack_require__.e/* nsure */(1, function () {
	        resolve(__webpack_require__(377));
	    });
	};
	var loadMore = function loadMore(resolve) {
	    __webpack_require__.e/* nsure */(2, function () {
	        resolve(__webpack_require__(396));
	    });
	};
	var infinite = function infinite(resolve) {
	    __webpack_require__.e/* nsure */(3, function () {
	        resolve(__webpack_require__(406));
	    });
	};
	//定义路由
	var routes = [{
	    path: '/swipe',
	    component: swipe
	}, {
	    path: '/loadMore',
	    component: loadMore
	}, {
	    path: '/infinite',
	    component: infinite
	}];
	var router = new _vueRouter2.default({
	    routes: routes
	});
	
	var app = new _vue2.default({
	    router: router,
	    store: _store2.default
	}).$mount("#view");
	
	router.beforeEach(function (to, from, next) {
	    _store2.default.commit('pageLoading', {
	        pageLoading: true
	    });
	    next();
	});
	router.afterEach(function (router) {
	    _store2.default.commit('pageLoading', {
	        pageLoading: false
	    });
	});

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vuex = __webpack_require__(3);
	
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

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(6)
	
	/* template */
	var __vue_template__ = __webpack_require__(76)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "E:\\xampp\\htdocs\\gitstore\\vue-comp\\src\\js\\components\\common\\solid-button.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-28417acd", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-28417acd", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] solid-button.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _zepto = __webpack_require__(7);
	
	var _zepto2 = _interopRequireDefault(_zepto);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    props: {
	        text: {
	            type: String,
	            required: true
	        }
	    },
	    data: function data() {
	        return {
	            dsStyle: {
	                display: 'none'
	            }
	        };
	    },
	    mounted: function mounted() {
	        this.$nextTick(function () {
	            //按钮hover
	            $(".btn").on('touchstart', function () {
	                $(this).addClass('btn-hover');
	            }).on('touchend', function () {
	                $(this).removeClass('btn-hover');
	            });
	        });
	    }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },

/***/ 76:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "btn-wrap"
	  }, [_vm._h('button', {
	    staticClass: "btn"
	  }, [_vm._s(_vm.text)]), " ", _vm._h('div', {
	    staticClass: "btn-loading",
	    style: (_vm.dsStyle)
	  }, [_vm._m(0)])])
	},staticRenderFns: [function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "spinner"
	  }, [_vm._h('div', {
	    staticClass: "spinner-container container1"
	  }, [_vm._h('div', {
	    staticClass: "circle1"
	  }), " ", _vm._h('div', {
	    staticClass: "circle2"
	  }), " ", _vm._h('div', {
	    staticClass: "circle3"
	  }), " ", _vm._h('div', {
	    staticClass: "circle4"
	  })]), " ", _vm._h('div', {
	    staticClass: "spinner-container container2"
	  }, [_vm._h('div', {
	    staticClass: "circle1"
	  }), " ", _vm._h('div', {
	    staticClass: "circle2"
	  }), " ", _vm._h('div', {
	    staticClass: "circle3"
	  }), " ", _vm._h('div', {
	    staticClass: "circle4"
	  })]), " ", _vm._h('div', {
	    staticClass: "spinner-container container3"
	  }, [_vm._h('div', {
	    staticClass: "circle1"
	  }), " ", _vm._h('div', {
	    staticClass: "circle2"
	  }), " ", _vm._h('div', {
	    staticClass: "circle3"
	  }), " ", _vm._h('div', {
	    staticClass: "circle4"
	  })])])
	}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-28417acd", module.exports)
	  }
	}

/***/ },

/***/ 77:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(78)
	
	/* template */
	var __vue_template__ = __webpack_require__(79)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "E:\\xampp\\htdocs\\gitstore\\vue-comp\\src\\js\\components\\common\\page-loading.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7f9bb937", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-7f9bb937", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] page-loading.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 78:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports.default = {
	    computed: {
	        loading: function loading() {
	            return this.$store.state.pageLoading;
	        }
	    }
	};

/***/ },

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return (_vm.loading) ? _vm._h('div', {
	    staticClass: "page-loading-wrap"
	  }, [_vm._m(0)]) : _vm._e()
	},staticRenderFns: [function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "page-loading"
	  }, [_vm._h('div', {
	    staticClass: "spinner"
	  }, [_vm._h('div', {
	    staticClass: "spinner-container container1"
	  }, [_vm._h('div', {
	    staticClass: "circle1"
	  }), " ", _vm._h('div', {
	    staticClass: "circle2"
	  }), " ", _vm._h('div', {
	    staticClass: "circle3"
	  }), " ", _vm._h('div', {
	    staticClass: "circle4"
	  })]), " ", _vm._h('div', {
	    staticClass: "spinner-container container2"
	  }, [_vm._h('div', {
	    staticClass: "circle1"
	  }), " ", _vm._h('div', {
	    staticClass: "circle2"
	  }), " ", _vm._h('div', {
	    staticClass: "circle3"
	  }), " ", _vm._h('div', {
	    staticClass: "circle4"
	  })]), " ", _vm._h('div', {
	    staticClass: "spinner-container container3"
	  }, [_vm._h('div', {
	    staticClass: "circle1"
	  }), " ", _vm._h('div', {
	    staticClass: "circle2"
	  }), " ", _vm._h('div', {
	    staticClass: "circle3"
	  }), " ", _vm._h('div', {
	    staticClass: "circle4"
	  })])])])
	}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7f9bb937", module.exports)
	  }
	}

/***/ }

});
//# sourceMappingURL=app.js.map