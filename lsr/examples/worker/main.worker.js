/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../dist/glue-module.js":
/*!*********************************!*\
  !*** ../../dist/glue-module.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/***/ }),

/***/ "../../dist/libsamplerate.js":
/*!***********************************!*\
  !*** ../../dist/libsamplerate.js ***!
  \***********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("!function(e,t){ true?module.exports=t():0}(this,(()=>(()=>{\"use strict\";var e,t={147:e=>{e.exports=__webpack_require__(/*! fs */ \"?5578\")},17:e=>{e.exports=__webpack_require__(/*! path */ \"?1335\")}},n={};function r(e){var i=n[e];if(void 0!==i)return i.exports;var o=n[e]={exports:{}};return t[e](o,o.exports,r),o.exports}r.m=t,r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,n)=>(r.f[n](e,t),t)),[])),r.u=e=>\"glue-module.js\",r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})},e={179:1},r.f.require=(t,n)=>{e[t]||(t=>{var n=t.modules,i=t.ids,o=t.runtime;for(var a in n)r.o(n,a)&&(r.m[a]=n[a]);o&&o(r);for(var u=0;u<i.length;u++)e[i[u]]=1})(__webpack_require__(\"../../dist sync recursive ^\\\\.\\\\/.*$\")(\"./\"+r.u(t)))};var i={};return(()=>{r.r(i),r.d(i,{ConverterType:()=>n,create:()=>o});var e=1008e3,t=function(){function t(t,n,r,i,o){this.module=t,this._converterType=n,this._nChannels=r,this._inputSampleRate=i,this._outputSampleRate=o,this.ratio=o/i,this.isDestroyed=!1,t.init(r,n,i,o),this.sourceArray=t.sourceArray(e),this.targetArray=t.targetArray(e)}return t.prototype.simple=function(e){return this._resample(this.module.simple,e)},t.prototype.full=function(e,t){return void 0===t&&(t=null),this._resample(this.module.full,e,t)},t.prototype.destroy=function(){!0===this.isDestroyed?console.warn(\"destroy() has already been called on this instance\"):(this.module.destroy(),this.isDestroyed=!0)},Object.defineProperty(t.prototype,\"inputSampleRate\",{get:function(){return this._inputSampleRate},set:function(e){this._inputSampleRate=e,this.module.destroy(),this.module.init(this.nChannels,this.converterType,this.inputSampleRate,this.outputSampleRate)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,\"outputSampleRate\",{get:function(){return this._outputSampleRate},set:function(e){this._outputSampleRate=e,this.module.destroy(),this.module.init(this.nChannels,this.converterType,this.inputSampleRate,this.outputSampleRate)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,\"nChannels\",{get:function(){return this._nChannels},set:function(e){this._nChannels=e,this.module.destroy(),this.module.init(this.nChannels,this.converterType,this.inputSampleRate,this.outputSampleRate)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,\"converterType\",{get:function(){return this._converterType},set:function(e){this._converterType=e,this.module.destroy(),this.module.init(this.nChannels,this.converterType,this.inputSampleRate,this.outputSampleRate)},enumerable:!1,configurable:!0}),t.prototype._chunkAndResample=function(e){for(var t=0,n=[],r=function(e,t,n){for(var r=0,i=[],o=0;o<e.length;o+=t){var a=Math.min(t,e.length-r),u=new n(e.buffer,r*e.BYTES_PER_ELEMENT,a);r+=t,i.push(u)}return i}(e,this.inputSampleRate/10*this.nChannels,Float32Array),i=0;i<r.length;i++){var o=this._resample(this.module.full,r[i]);t+=o.length,n.push(o)}var a=new Float32Array(t),u=0;for(i=0;i<n.length;i++)for(var s=0;s<n[i].length;s++)a[u++]=n[i][s];return a},t.prototype._resample=function(t,n,r){if(void 0===r&&(r=null),this.inputSampleRate===this.outputSampleRate)return n;if(null!==r&&r.length<this.ratio*n.length)throw\"dataOut must be at least ceil(srcRatio * dataIn.length) samples long\";return Math.ceil(n.length*this.ratio)>e?this._chunkAndResample(n):(this.sourceArray.set(n),function(e,t,n){void 0===n&&(n=null);for(var r=null===n?new Float32Array(e):n,i=0;i<e;i++)r[i]=t[i];return r}(t(n.length,this.nChannels,this.converterType,this.inputSampleRate,this.outputSampleRate)*this.nChannels,this.targetArray,r))},t}(),n={SRC_SINC_BEST_QUALITY:0,SRC_SINC_MEDIUM_QUALITY:1,SRC_SINC_FASTEST:2,SRC_ZERO_ORDER_HOLD:3,SRC_LINEAR:4};function o(e,i,o,a){return u=this,s=void 0,p=function(){var u,s;return function(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},\"function\"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(o){return function(u){return function(o){if(n)throw new TypeError(\"Generator is already executing.\");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}}(this,(function(l){switch(l.label){case 0:u=void 0===(null==a?void 0:a.converterType)?n.SRC_SINC_FASTEST:null==a?void 0:a.converterType,function(e,t,r,i){if(void 0===e)throw\"nChannels is undefined\";if(void 0===t)throw\"inputSampleRate is undefined\";if(void 0===r)throw\"outputSampleRate is undefined\";if(e<1||e>128)throw\"invalid nChannels submitted\";if(t<1||t>192e3)throw\"invalid inputSampleRate\";if(r<1||r>192e3)throw\"invalid outputSampleRate\";if(i<n.SRC_SINC_BEST_QUALITY||i>n.SRC_LINEAR)throw\"invalid converterType\"}(e,i,o,u),l.label=1;case 1:return l.trys.push([1,4,,5]),[4,r.e(257).then(r.bind(r,395))];case 2:return[4,l.sent().default()];case 3:return s=l.sent(),[2,new t(s,u,e,i,o)];case 4:throw l.sent();case 5:return[2]}}))},new((l=void 0)||(l=Promise))((function(e,t){function n(e){try{i(p.next(e))}catch(e){t(e)}}function r(e){try{i(p.throw(e))}catch(e){t(e)}}function i(t){var i;t.done?e(t.value):(i=t.value,i instanceof l?i:new l((function(e){e(i)}))).then(n,r)}i((p=p.apply(u,s||[])).next())}));var u,s,l,p}})(),i})()));\n\n//# sourceURL=webpack:///../../dist/libsamplerate.js?");

/***/ }),

/***/ "../../dist sync recursive ^\\.\\/.*$":
/*!*********************************!*\
  !*** ../../dist/ sync ^\.\/.*$ ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./converter-type.d.ts\": \"../../dist/converter-type.d.ts\",\n\t\"./glue-module\": \"../../dist/glue-module.js\",\n\t\"./glue-module.js\": \"../../dist/glue-module.js\",\n\t\"./glue.d.ts\": \"../../dist/glue.d.ts\",\n\t\"./libsamplerate\": \"../../dist/libsamplerate.js\",\n\t\"./libsamplerate.d.ts\": \"../../dist/libsamplerate.d.ts\",\n\t\"./libsamplerate.js\": \"../../dist/libsamplerate.js\",\n\t\"./module-type.d.ts\": \"../../dist/module-type.d.ts\",\n\t\"./src.d.ts\": \"../../dist/src.d.ts\",\n\t\"./util.d.ts\": \"../../dist/util.d.ts\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"../../dist sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack:///../../dist/_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./src/worker.js":
/*!***********************!*\
  !*** ./src/worker.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dist_libsamplerate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../dist/libsamplerate */ \"../../dist/libsamplerate.js\");\n/* harmony import */ var _dist_libsamplerate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dist_libsamplerate__WEBPACK_IMPORTED_MODULE_0__);\n\n\nlet _src;\n\nonmessage = (e) => {\n\tswitch (e.data.command) {\n\t\tcase 'init':\n\t\t\tinit(e.data.quality, e.data.nChannels, e.data.inputSampleRate, e.data.outputSampleRate);\n\t\t\tbreak;\n\t\tcase 'simple':\n\t\t\tsimple(e.data.samples);\n\t\t\tbreak;\n\t\tcase 'full':\n\t\t\tfull(e.data.samples);\n\t\tcase 'destroy':\n\t\t\t_src.destroy();\n\t\t\tbreak;\n\t\tdefault:\n\t\t\tthrow `unrecognized command ${e.data.command}`;\n\t}\n}\n\n/** load the WASM module and initialize with default values */\nfunction init(quality, nChannels, inputSampleRate, outputSampleRate) {\n\t;(0,_dist_libsamplerate__WEBPACK_IMPORTED_MODULE_0__.create)(nChannels, inputSampleRate, outputSampleRate, {\n\t\tconverterType: quality,\n\t})\n\t\t.then((src) => {\n\t\t\t_src = src;\n\t\t\tpostMessage({command: 'postInit'});\n\t\t})\n\t\t.catch((err) => {\n\t\t\t// unable to find the WASM file. handle however you choose\n\t\t});\n}\n\n/** call the libsamplerate `simple` api */\nfunction simple(samples) {\n\tlet resampled = _src.simple(samples);\n\tpostMessage({command: 'postResample', samples: resampled})\n}\n\n/** call the libsamplerate `full` api */\nfunction full(samples) {\n\tlet resampled = _src.full(samples);\n\tpostMessage({command: 'postResample', samples: resampled})\n}\n\n\n//# sourceURL=webpack:///./src/worker.js?");

/***/ }),

/***/ "../../dist/converter-type.d.ts":
/*!**************************************!*\
  !*** ../../dist/converter-type.d.ts ***!
  \**************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack:///../../dist/converter-type.d.ts?");

/***/ }),

/***/ "../../dist/glue.d.ts":
/*!****************************!*\
  !*** ../../dist/glue.d.ts ***!
  \****************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack:///../../dist/glue.d.ts?");

/***/ }),

/***/ "../../dist/libsamplerate.d.ts":
/*!*************************************!*\
  !*** ../../dist/libsamplerate.d.ts ***!
  \*************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack:///../../dist/libsamplerate.d.ts?");

/***/ }),

/***/ "../../dist/module-type.d.ts":
/*!***********************************!*\
  !*** ../../dist/module-type.d.ts ***!
  \***********************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack:///../../dist/module-type.d.ts?");

/***/ }),

/***/ "../../dist/src.d.ts":
/*!***************************!*\
  !*** ../../dist/src.d.ts ***!
  \***************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack:///../../dist/src.d.ts?");

/***/ }),

/***/ "../../dist/util.d.ts":
/*!****************************!*\
  !*** ../../dist/util.d.ts ***!
  \****************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack:///../../dist/util.d.ts?");

/***/ }),

/***/ "?5578":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///fs_(ignored)?");

/***/ }),

/***/ "?1335":
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///path_(ignored)?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/worker.js");
/******/ 	
/******/ })()
;