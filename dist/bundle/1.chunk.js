webpackJsonp([1],{333:function(t,exports,e){var s,r;s=e(334);var n=e(335);r=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(r=s=s.default),"function"==typeof r&&(r=r.options),r.render=n.render,r.staticRenderFns=n.staticRenderFns,t.exports=s},334:function(t,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={data:function(){return{urls:["../style/images/1.jpg","../style/images/2.jpg","../style/images/3.jpg"]}}}},335:function(t,exports){t.exports={render:function(){var t=this;return t._h("div",{staticClass:"sub-page"},[t._h("div",{staticClass:"scroll-body"},[t._h("mt-header",{attrs:{title:"轮播图"}},[t._h("router-link",{slot:"left",attrs:{to:"/"}},[t._h("mt-button",{attrs:{icon:"back"}},["返回"])])])," ",t._h("mt-swipe",{attrs:{auto:4e3}},[t._l(t.urls,function(e){return[t._h("mt-swipe-item",[t._h("img",{attrs:{src:e,alt:"",width:"100%"}})])]})])])])},staticRenderFns:[]}}});