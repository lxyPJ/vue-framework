webpackJsonp([2],{

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "\n", ""]);
	
	// exports


/***/ },

/***/ 3:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 5:
/***/ function(module, exports) {

	module.exports =
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			i: moduleId,
	/******/ 			l: false,
	/******/ 			exports: {}
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.l = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// identity function for calling harmory imports with the correct context
	/******/ 	__webpack_require__.i = function(value) { return value; };
	
	/******/ 	// define getter function for harmory exports
	/******/ 	__webpack_require__.d = function(exports, name, getter) {
	/******/ 		Object.defineProperty(exports, name, {
	/******/ 			configurable: false,
	/******/ 			enumerable: true,
	/******/ 			get: getter
	/******/ 		});
	/******/ 	};
	
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/ 	__webpack_require__.n = function(module) {
	/******/ 		var getter = module && module.__esModule ?
	/******/ 			function getDefault() { return module['default']; } :
	/******/ 			function getModuleExports() { return module; };
	/******/ 		__webpack_require__.d(getter, 'a', getter);
	/******/ 		return getter;
	/******/ 	};
	
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = 234);
	/******/ })
	/************************************************************************/
	/******/ ({
	
	/***/ 155:
	/***/ function(module, exports, __webpack_require__) {
	
	var __vue_exports__, __vue_options__
	
	/* script */
	__vue_exports__ = __webpack_require__(77)
	
	/* template */
	var __vue_template__ = __webpack_require__(175)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	module.exports = __vue_exports__
	
	
	/***/ },
	
	/***/ 175:
	/***/ function(module, exports) {
	
	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "mint-swipe-item"
	  }, [_t("default")])
	}},staticRenderFns: []}
	
	/***/ },
	
	/***/ 2:
	/***/ function(module, exports) {
	
	// removed by extract-text-webpack-plugin
	
	/***/ },
	
	/***/ 234:
	/***/ function(module, exports, __webpack_require__) {
	
	module.exports = __webpack_require__(41);
	
	
	/***/ },
	
	/***/ 41:
	/***/ function(module, exports, __webpack_require__) {
	
	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__swipe_src_swipe_item_vue__ = __webpack_require__(155);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__swipe_src_swipe_item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__swipe_src_swipe_item_vue__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mint_ui_src_style_empty_css__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mint_ui_src_style_empty_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mint_ui_src_style_empty_css__);
	
	
	
	module.exports = __WEBPACK_IMPORTED_MODULE_0__swipe_src_swipe_item_vue___default.a;
	
	
	/***/ },
	
	/***/ 77:
	/***/ function(module, exports, __webpack_require__) {
	
	"use strict";
	//
	//
	//
	//
	//
	//
	
	/* harmony default export */ exports["default"] = {
	  name: 'mt-swipe-item',
	
	  mounted: function mounted() {
	    this.$parent && this.$parent.swipeItemCreated(this);
	  },
	
	  destroyed: function destroyed() {
	    this.$parent && this.$parent.swipeItemDestroyed(this);
	  }
	};
	
	
	/***/ }
	
	/******/ });

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.mint-swipe {\n    overflow: hidden;\n    position: relative;\n    height: 100%;\n}\n.mint-swipe-items-wrap {\n    position: relative;\n    overflow: hidden;\n    height: 100%;\n}\n.mint-swipe-items-wrap > div {\n    position: absolute;\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%);\n    width: 100%;\n    height: 100%;\n    display: none\n}\n.mint-swipe-items-wrap > div.is-active {\n    display: block;\n    -webkit-transform: none;\n            transform: none;\n}\n.mint-swipe-indicators {\n    position: absolute;\n    bottom: 10px;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%);\n}\n.mint-swipe-indicator {\n    width: 8px;\n    height: 8px;\n    display: inline-block;\n    border-radius: 100%;\n    background: #000;\n    opacity: 0.2;\n    margin: 0 3px;\n}\n.mint-swipe-indicator.is-active {\n    background: #fff;\n}\n", ""]);
	
	// exports


/***/ },

/***/ 8:
/***/ function(module, exports) {

	module.exports =
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			i: moduleId,
	/******/ 			l: false,
	/******/ 			exports: {}
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.l = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// identity function for calling harmory imports with the correct context
	/******/ 	__webpack_require__.i = function(value) { return value; };
	
	/******/ 	// define getter function for harmory exports
	/******/ 	__webpack_require__.d = function(exports, name, getter) {
	/******/ 		Object.defineProperty(exports, name, {
	/******/ 			configurable: false,
	/******/ 			enumerable: true,
	/******/ 			get: getter
	/******/ 		});
	/******/ 	};
	
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/ 	__webpack_require__.n = function(module) {
	/******/ 		var getter = module && module.__esModule ?
	/******/ 			function getDefault() { return module['default']; } :
	/******/ 			function getModuleExports() { return module; };
	/******/ 		__webpack_require__.d(getter, 'a', getter);
	/******/ 		return getter;
	/******/ 	};
	
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = 233);
	/******/ })
	/************************************************************************/
	/******/ ({
	
	/***/ 112:
	/***/ function(module, exports) {
	
	// removed by extract-text-webpack-plugin
	
	/***/ },
	
	/***/ 14:
	/***/ function(module, exports) {
	
	var trim = function (string) {
	  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
	};
	
	var hasClass = function (el, cls) {
	  if (!el || !cls) return false;
	  if (cls.indexOf(' ') != -1) throw new Error('className should not contain space.');
	  if (el.classList) {
	    return el.classList.contains(cls);
	  } else {
	    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
	  }
	};
	
	var addClass = function (el, cls) {
	  if (!el) return;
	  var curClass = el.className;
	  var classes = (cls || '').split(' ');
	
	  for (var i = 0, j = classes.length; i < j; i++) {
	    var clsName = classes[i];
	    if (!clsName) continue;
	
	    if (el.classList) {
	      el.classList.add(clsName);
	    } else {
	      if (!hasClass(el, clsName)) {
	        curClass += ' ' + clsName;
	      }
	    }
	  }
	  if (!el.classList) {
	    el.className = curClass;
	  }
	};
	
	var removeClass = function (el, cls) {
	  if (!el || !cls) return;
	  var classes = cls.split(' ');
	  var curClass = ' ' + el.className + ' ';
	
	  for (var i = 0, j = classes.length; i < j; i++) {
	    var clsName = classes[i];
	    if (!clsName) continue;
	
	    if (el.classList) {
	      el.classList.remove(clsName);
	    } else {
	      if (hasClass(el, clsName)) {
	        curClass = curClass.replace(' ' + clsName + ' ', ' ');
	      }
	    }
	  }
	  if (!el.classList) {
	    el.className = trim(curClass);
	  }
	};
	
	module.exports = {
	  hasClass: hasClass,
	  addClass: addClass,
	  removeClass: removeClass
	};
	
	/***/ },
	
	/***/ 156:
	/***/ function(module, exports, __webpack_require__) {
	
	var __vue_exports__, __vue_options__
	
	/* styles */
	__webpack_require__(112)
	
	/* script */
	__vue_exports__ = __webpack_require__(78)
	
	/* template */
	var __vue_template__ = __webpack_require__(183)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	module.exports = __vue_exports__
	
	
	/***/ },
	
	/***/ 183:
	/***/ function(module, exports) {
	
	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "mint-swipe"
	  }, [_h('div', {
	    ref: "wrap",
	    staticClass: "mint-swipe-items-wrap"
	  }, [_t("default")]), " ", _h('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (showIndicators),
	      expression: "showIndicators"
	    }],
	    staticClass: "mint-swipe-indicators"
	  }, [_l((pages), function(page, $index) {
	    return _h('div', {
	      staticClass: "mint-swipe-indicator",
	      class: {
	        'is-active': $index === index
	      }
	    })
	  })])])
	}},staticRenderFns: []}
	
	/***/ },
	
	/***/ 233:
	/***/ function(module, exports, __webpack_require__) {
	
	module.exports = __webpack_require__(42);
	
	
	/***/ },
	
	/***/ 3:
	/***/ function(module, exports) {
	
	var bindEvent = (function() {
	  if(document.addEventListener) {
	    return function(element, event, handler) {
	      if (element && event && handler) {
	        element.addEventListener(event, handler, false);
	      }
	    };
	  } else {
	    return function(element, event, handler) {
	      if (element && event && handler) {
	        element.attachEvent('on' + event, handler);
	      }
	    };
	  }
	})();
	
	var unbindEvent = (function() {
	  if(document.removeEventListener) {
	    return function(element, event, handler) {
	      if (element && event) {
	        element.removeEventListener(event, handler, false);
	      }
	    };
	  } else {
	    return function(element, event, handler) {
	      if (element && event) {
	        element.detachEvent('on' + event, handler);
	      }
	    };
	  }
	})();
	
	var bindOnce = function(el, event, fn) {
	  var listener = function() {
	    if (fn) {
	      fn.apply(this, arguments);
	    }
	    unbindEvent(el, event, listener);
	  };
	  bindEvent(el, event, listener);
	};
	
	module.exports = {
	  on: bindEvent,
	  off: unbindEvent,
	  once: bindOnce
	};
	
	/***/ },
	
	/***/ 42:
	/***/ function(module, exports, __webpack_require__) {
	
	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_swipe_vue__ = __webpack_require__(156);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_swipe_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_swipe_vue__);
	
	module.exports = __WEBPACK_IMPORTED_MODULE_0__src_swipe_vue___default.a;
	
	
	/***/ },
	
	/***/ 78:
	/***/ function(module, exports, __webpack_require__) {
	
	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_wind_dom_src_event__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_wind_dom_src_event___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_wind_dom_src_event__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_wind_dom_src_class__ = __webpack_require__(14);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_wind_dom_src_class___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_wind_dom_src_class__);
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
	//
	//
	//
	//
	//
	//
	//
	
	
	
	
	/* harmony default export */ exports["default"] = {
	  name: 'mt-swipe',
	
	  created: function created() {
	    this.dragState = {};
	  },
	
	  data: function data() {
	    return {
	      ready: false,
	      dragging: false,
	      userScrolling: false,
	      animating: false,
	      index: 0,
	      pages: [],
	      timer: null,
	      reInitTimer: null,
	      noDrag: false
	    };
	  },
	
	  props: {
	    speed: {
	      type: Number,
	      default: 300
	    },
	
	    auto: {
	      type: Number,
	      default: 3000
	    },
	
	    continuous: {
	      type: Boolean,
	      default: true
	    },
	
	    showIndicators: {
	      type: Boolean,
	      default: true
	    },
	
	    noDragWhenSingle: {
	      type: Boolean,
	      default: true
	    },
	
	    prevent: {
	      type: Boolean,
	      default: false
	    }
	  },
	
	  methods: {
	    swipeItemCreated: function swipeItemCreated() {
	      var this$1 = this;
	
	      if (!this.ready) return;
	
	      clearTimeout(this.reInitTimer);
	      this.reInitTimer = setTimeout(function () {
	        this$1.reInitPages();
	      }, 100);
	    },
	
	    swipeItemDestroyed: function swipeItemDestroyed() {
	      var this$1 = this;
	
	      if (!this.ready) return;
	
	      clearTimeout(this.reInitTimer);
	      this.reInitTimer = setTimeout(function () {
	        this$1.reInitPages();
	      }, 100);
	    },
	
	    translate: function translate(element, offset, speed, callback) {
	      var arguments$1 = arguments;
	      var this$1 = this;
	
	      if (speed) {
	        this.animating = true;
	        element.style.webkitTransition = '-webkit-transform ' + speed + 'ms ease-in-out';
	        setTimeout(function () {
	          element.style.webkitTransform = "translate3d(" + offset + "px, 0, 0)";
	        }, 50);
	
	        var called = false;
	
	        var transitionEndCallback = function () {
	          if (called) return;
	          called = true;
	          this$1.animating = false;
	          element.style.webkitTransition = '';
	          element.style.webkitTransform = '';
	          if (callback) {
	            callback.apply(this$1, arguments$1);
	          }
	        };
	
	        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_wind_dom_src_event__["once"])(element, 'webkitTransitionEnd', transitionEndCallback);
	        setTimeout(transitionEndCallback, speed + 100); // webkitTransitionEnd maybe not fire on lower version android.
	      } else {
	        element.style.webkitTransition = '';
	        element.style.webkitTransform = "translate3d(" + offset + "px, 0, 0)";
	      }
	    },
	
	    reInitPages: function reInitPages() {
	      var children = this.$children;
	      this.noDrag = children.length === 1 && this.noDragWhenSingle;
	
	      var pages = [];
	      this.index = 0;
	
	      children.forEach(function(child, index) {
	        pages.push(child.$el);
	
	        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_wind_dom_src_class__["removeClass"])(child.$el, 'is-active');
	
	        if (index === 0) {
	          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_wind_dom_src_class__["addClass"])(child.$el, 'is-active');
	        }
	      });
	
	      this.pages = pages;
	    },
	
	    doAnimate: function doAnimate(towards, options) {
	      var this$1 = this;
	
	      if (this.$children.length === 0) return;
	      if (!options && this.$children.length < 2) return;
	
	      var prevPage, nextPage, currentPage, pageWidth, offsetLeft;
	      var speed = this.speed || 300;
	      var index = this.index;
	      var pages = this.pages;
	      var pageCount = pages.length;
	
	      if (!options) {
	        pageWidth = this.$el.clientWidth;
	        currentPage = pages[index];
	        prevPage = pages[index - 1];
	        nextPage = pages[index + 1];
	        if (this.continuous && pages.length > 1) {
	          if (!prevPage) {
	            prevPage = pages[pages.length - 1];
	          }
	          if (!nextPage) {
	            nextPage = pages[0];
	          }
	        }
	        if (prevPage) {
	          prevPage.style.display = 'block';
	          this.translate(prevPage, -pageWidth);
	        }
	        if (nextPage) {
	          nextPage.style.display = 'block';
	          this.translate(nextPage, pageWidth);
	        }
	      } else {
	        prevPage = options.prevPage;
	        currentPage = options.currentPage;
	        nextPage = options.nextPage;
	        pageWidth = options.pageWidth;
	        offsetLeft = options.offsetLeft;
	      }
	
	      var newIndex;
	
	      var oldPage = this.$children[index].$el;
	
	      if (towards === 'prev') {
	        if (index > 0) {
	          newIndex = index - 1;
	        }
	        if (this.continuous && index === 0) {
	          newIndex = pageCount - 1;
	        }
	      } else if (towards === 'next') {
	        if (index < pageCount - 1) {
	          newIndex = index + 1;
	        }
	        if (this.continuous && index === pageCount - 1) {
	          newIndex = 0;
	        }
	      }
	
	      var callback = function () {
	        if (newIndex !== undefined) {
	          var newPage = this$1.$children[newIndex].$el;
	          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_wind_dom_src_class__["removeClass"])(oldPage, 'is-active');
	          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_wind_dom_src_class__["addClass"])(newPage, 'is-active');
	
	          this$1.index = newIndex;
	        }
	
	        if (prevPage) {
	          prevPage.style.display = '';
	        }
	
	        if (nextPage) {
	          nextPage.style.display = '';
	        }
	      };
	
	      setTimeout(function () {
	        if (towards === 'next') {
	          this$1.translate(currentPage, -pageWidth, speed, callback);
	          if (nextPage) {
	            this$1.translate(nextPage, 0, speed);
	          }
	        } else if (towards === 'prev') {
	          this$1.translate(currentPage, pageWidth, speed, callback);
	          if (prevPage) {
	            this$1.translate(prevPage, 0, speed);
	          }
	        } else {
	          this$1.translate(currentPage, 0, speed, callback);
	          if (typeof offsetLeft !== 'undefined') {
	            if (prevPage && offsetLeft > 0) {
	              this$1.translate(prevPage, pageWidth * -1, speed);
	            }
	            if (nextPage && offsetLeft < 0) {
	              this$1.translate(nextPage, pageWidth, speed);
	            }
	          } else {
	            if (prevPage) {
	              this$1.translate(prevPage, pageWidth * -1, speed);
	            }
	            if (nextPage) {
	              this$1.translate(nextPage, pageWidth, speed);
	            }
	          }
	        }
	      }, 10);
	    },
	
	    next: function next() {
	      this.doAnimate('next');
	    },
	
	    prev: function prev() {
	      this.doAnimate('prev');
	    },
	
	    doOnTouchStart: function doOnTouchStart(event) {
	      if (this.noDrag) return;
	
	      var element = this.$el;
	      var dragState = this.dragState;
	      var touch = event.touches[0];
	
	      dragState.startTime = new Date();
	      dragState.startLeft = touch.pageX;
	      dragState.startTop = touch.pageY;
	      dragState.startTopAbsolute = touch.clientY;
	
	      dragState.pageWidth = element.offsetWidth;
	      dragState.pageHeight = element.offsetHeight;
	
	      var prevPage = this.$children[this.index - 1];
	      var dragPage = this.$children[this.index];
	      var nextPage = this.$children[this.index + 1];
	
	      if (this.continuous && this.pages.length > 1) {
	        if (!prevPage) {
	          prevPage = this.$children[this.$children.length - 1];
	        }
	        if (!nextPage) {
	          nextPage = this.$children[0];
	        }
	      }
	
	      dragState.prevPage = prevPage ? prevPage.$el : null;
	      dragState.dragPage = dragPage ? dragPage.$el : null;
	      dragState.nextPage = nextPage ? nextPage.$el : null;
	
	      if (dragState.prevPage) {
	        dragState.prevPage.style.display = 'block';
	      }
	
	      if (dragState.nextPage) {
	        dragState.nextPage.style.display = 'block';
	      }
	    },
	
	    doOnTouchMove: function doOnTouchMove(event) {
	      if (this.noDrag) return;
	
	      var dragState = this.dragState;
	      var touch = event.touches[0];
	
	      dragState.currentLeft = touch.pageX;
	      dragState.currentTop = touch.pageY;
	      dragState.currentTopAbsolute = touch.clientY;
	
	      var offsetLeft = dragState.currentLeft - dragState.startLeft;
	      var offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute;
	
	      var distanceX = Math.abs(offsetLeft);
	      var distanceY = Math.abs(offsetTop);
	      if (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
	        this.userScrolling = true;
	        return;
	      } else {
	        this.userScrolling = false;
	        event.preventDefault();
	      }
	      offsetLeft = Math.min(Math.max(-dragState.pageWidth + 1, offsetLeft), dragState.pageWidth - 1);
	
	      var towards = offsetLeft < 0 ? 'next' : 'prev';
	
	      if (dragState.prevPage && towards === 'prev') {
	        this.translate(dragState.prevPage, offsetLeft - dragState.pageWidth);
	      }
	      this.translate(dragState.dragPage, offsetLeft);
	      if (dragState.nextPage && towards === 'next') {
	        this.translate(dragState.nextPage, offsetLeft + dragState.pageWidth);
	      }
	    },
	
	    doOnTouchEnd: function doOnTouchEnd() {
	      if (this.noDrag) return;
	
	      var dragState = this.dragState;
	
	      var dragDuration = new Date() - dragState.startTime;
	      var towards = null;
	
	      var offsetLeft = dragState.currentLeft - dragState.startLeft;
	      var offsetTop = dragState.currentTop - dragState.startTop;
	      var pageWidth = dragState.pageWidth;
	      var index = this.index;
	      var pageCount = this.pages.length;
	
	      if (dragDuration < 300) {
	        var fireTap = Math.abs(offsetLeft) < 5 && Math.abs(offsetTop) < 5;
	        if (isNaN(offsetLeft) || isNaN(offsetTop)) {
	          fireTap = true;
	        }
	        if (fireTap) {
	          this.$children[this.index].$emit('tap');
	        }
	      }
	
	      if (dragDuration < 300 && dragState.currentLeft === undefined) return;
	
	      if (dragDuration < 300 || Math.abs(offsetLeft) > pageWidth / 2) {
	        towards = offsetLeft < 0 ? 'next' : 'prev';
	      }
	
	      if (!this.continuous) {
	        if ((index === 0 && towards === 'prev') || (index === pageCount - 1 && towards === 'next')) {
	          towards = null;
	        }
	      }
	
	      if (this.$children.length < 2) {
	        towards = null;
	      }
	
	      this.doAnimate(towards, {
	        offsetLeft: offsetLeft,
	        pageWidth: dragState.pageWidth,
	        prevPage: dragState.prevPage,
	        currentPage: dragState.dragPage,
	        nextPage: dragState.nextPage
	      });
	
	      this.dragState = {};
	    }
	  },
	
	  destroyed: function destroyed() {
	    if (this.timer) {
	      clearInterval(this.timer);
	      this.timer = null;
	    }
	    if (this.reInitTimer) {
	      clearTimeout(this.reInitTimer);
	      this.reInitTimer = null;
	    }
	  },
	
	  mounted: function mounted() {
	    var this$1 = this;
	
	    this.ready = true;
	
	    if (this.auto > 0) {
	      this.timer = setInterval(function () {
	        if (!this$1.dragging && !this$1.animating) {
	          this$1.next();
	        }
	      }, this.auto);
	    }
	
	    this.reInitPages();
	
	    var element = this.$el;
	
	    element.addEventListener('touchstart', function (event) {
	      if (this$1.prevent) {
	        event.preventDefault();
	      }
	      if (this$1.animating) return;
	      this$1.dragging = true;
	      this$1.userScrolling = false;
	      this$1.doOnTouchStart(event);
	    });
	
	    element.addEventListener('touchmove', function (event) {
	      if (!this$1.dragging) return;
	      this$1.doOnTouchMove(event);
	    });
	
	    element.addEventListener('touchend', function (event) {
	      if (this$1.userScrolling) {
	        this$1.dragging = false;
	        this$1.dragState = {};
	        return;
	      }
	      if (!this$1.dragging) return;
	      this$1.doOnTouchEnd(event);
	      this$1.dragging = false;
	    });
	  }
	};
	
	
	/***/ }
	
	/******/ });

/***/ },

/***/ 314:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(315)
	
	/* template */
	var __vue_template__ = __webpack_require__(316)
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
	__vue_options__.__file = "D:\\code\\php\\htdocs\\vue-comp\\vue-comp\\src\\js\\example\\swipe.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-51d80157", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-51d80157", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] swipe.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 315:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _style = __webpack_require__(1);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _swipeItem = __webpack_require__(5);
	
	var _swipeItem2 = _interopRequireDefault(_swipeItem);
	
	var _style3 = __webpack_require__(6);
	
	var _style4 = _interopRequireDefault(_style3);
	
	var _swipe = __webpack_require__(8);
	
	var _swipe2 = _interopRequireDefault(_swipe);
	
	var _vue = __webpack_require__(12);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.component(_swipe2.default.name, _swipe2.default); //
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
	
	_vue2.default.component(_swipeItem2.default.name, _swipeItem2.default);
	
	exports.default = {
	    data: function data() {
	        return {
	            urls: ['../style/images/1.jpg', '../style/images/2.jpg', '../style/images/3.jpg']
	        };
	    }
	};

/***/ },

/***/ 316:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "sub-page"
	  }, [_vm._h('div', {
	    staticClass: "scroll-body"
	  }, [_vm._h('mt-swipe', {
	    attrs: {
	      "auto": 4000
	    }
	  }, [_vm._l((_vm.urls), function(url) {
	    return [_vm._h('mt-swipe-item', [_vm._h('img', {
	      attrs: {
	        "src": url,
	        "alt": "",
	        "width": "100%"
	      }
	    })])]
	  })])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-51d80157", module.exports)
	  }
	}

/***/ }

});
//# sourceMappingURL=2.chunk.js.map