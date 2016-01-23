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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/yunyi/nodespace/lego/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/yunyi/nodespace/lego/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	/* REACT HOT LOADER */"use strict";

	if (false) {
	  (function () {
	    var ReactHotAPI = require("/Users/yunyi/nodespace/lego/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"),
	        RootInstanceProvider = require("/Users/yunyi/nodespace/lego/node_modules/react-hot-loader/RootInstanceProvider.js"),
	        ReactMount = require("react/lib/ReactMount"),
	        React = require("react");module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () {
	      return RootInstanceProvider.getRootInstances(ReactMount);
	    }, React);
	  })();
	}try {
	  (function () {

	    'use strict';

	    (function (win, lib) {
	      var doc = win.document;
	      var docEl = doc.documentElement;
	      var metaEl = doc.querySelector('meta[name="viewport"]');
	      var flexibleEl = doc.querySelector('meta[name="flexible"]');
	      var dpr = 0;
	      var scale = 0;
	      var tid;
	      var flexible = lib.flexible || (lib.flexible = {});

	      if (metaEl) {
	        console.warn('将根据已有的meta标签来设置缩放比例');
	        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
	        if (match) {
	          scale = parseFloat(match[1]);
	          dpr = parseInt(1 / scale);
	        }
	      } else if (flexibleEl) {
	        var content = flexibleEl.getAttribute('content');
	        if (content) {
	          var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
	          var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
	          if (initialDpr) {
	            dpr = parseFloat(initialDpr[1]);
	            scale = parseFloat((1 / dpr).toFixed(2));
	          }
	          if (maximumDpr) {
	            dpr = parseFloat(maximumDpr[1]);
	            scale = parseFloat((1 / dpr).toFixed(2));
	          }
	        }
	      }

	      if (!dpr && !scale) {
	        var isAndroid = win.navigator.appVersion.match(/android/gi);
	        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
	        var devicePixelRatio = win.devicePixelRatio;
	        if (isIPhone) {
	          // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
	          if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
	            dpr = 3;
	          } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
	            dpr = 2;
	          } else {
	            dpr = 1;
	          }
	        } else {
	          // 其他设备下，仍旧使用1倍的方案
	          dpr = 1;
	        }
	        scale = 1 / dpr;
	      }

	      docEl.setAttribute('data-dpr', dpr);
	      if (!metaEl) {
	        metaEl = doc.createElement('meta');
	        metaEl.setAttribute('name', 'viewport');
	        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
	        if (docEl.firstElementChild) {
	          docEl.firstElementChild.appendChild(metaEl);
	        } else {
	          var wrap = doc.createElement('div');
	          wrap.appendChild(metaEl);
	          doc.write(wrap.innerHTML);
	        }
	      }

	      function refreshRem() {
	        var width = docEl.getBoundingClientRect().width;
	        if (width / dpr > 540) {
	          width = 540 * dpr;
	        }
	        var rem = width / 10;
	        docEl.style.fontSize = rem + 'px';
	        flexible.rem = win.rem = rem;
	      }

	      win.addEventListener('resize', function () {
	        clearTimeout(tid);
	        tid = setTimeout(refreshRem, 300);
	      }, false);
	      win.addEventListener('pageshow', function (e) {
	        if (e.persisted) {
	          clearTimeout(tid);
	          tid = setTimeout(refreshRem, 300);
	        }
	      }, false);

	      if (doc.readyState === 'complete') {
	        doc.body.style.fontSize = 12 * dpr + 'px';
	      } else {
	        doc.addEventListener('DOMContentLoaded', function (e) {
	          doc.body.style.fontSize = 12 * dpr + 'px';
	        }, false);
	      }

	      refreshRem();

	      flexible.dpr = win.dpr = dpr;
	      flexible.refreshRem = refreshRem;
	      flexible.rem2px = function (d) {
	        var val = parseFloat(d) * this.rem;
	        if (typeof d === 'string' && d.match(/rem$/)) {
	          val += 'px';
	        }
	        return val;
	      };
	      flexible.px2rem = function (d) {
	        var val = parseFloat(d) / this.rem;
	        if (typeof d === 'string' && d.match(/px$/)) {
	          val += 'rem';
	        }
	        return val;
	      };
	    })(window, window['lib'] || (window['lib'] = {}));

	    /* REACT HOT LOADER */
	  }).call(undefined);
	} finally {
	  if (false) {
	    (function () {
	      var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false;if (module.exports && module.makeHot) {
	        var makeExportsHot = require("/Users/yunyi/nodespace/lego/node_modules/react-hot-loader/makeExportsHot.js");if (makeExportsHot(module, require("react"))) {
	          foundReactClasses = true;
	        }var shouldAcceptModule = true && foundReactClasses;if (shouldAcceptModule) {
	          module.hot.accept(function (err) {
	            if (err) {
	              console.error("Cannot not apply hot update to " + "flexible.js" + ": " + err.message);
	            }
	          });
	        }
	      }module.hot.dispose(function (data) {
	        data.makeHot = module.makeHot;data.foundReactClasses = foundReactClasses;
	      });
	    })();
	  }
	}

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/yunyi/nodespace/lego/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "flexible.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }
/******/ ]);