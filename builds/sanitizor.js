!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e.indicative=e.indicative||{},e.indicative.sanitizor=t())}(this,function(){"use strict";function e(e,t){if(!function(e){return null!==e&&"object"==typeof e}(e)||"string"!=typeof t)return e;for(var r=t.split("."),n=0;n<r.length;n++){var o=r[n];if(null===(e=e.hasOwnProperty(o)?e[o]:null))break}return e}function t(r,n,o,i){if(!n)return[];o=o||0;var u=r[o++],f=r[o];return i||(i=[u],u=""),i=i.reduce(function(t,r){var o=u?r+"."+u:r;if(void 0!==f){var i=e(n,o);if(Array.isArray(i))for(var c=i.length,a=0;a<c;a++)t.push(o+"."+a)}else t.push(o);return t},[]),o===r.length?i:t(r,n,o,i)}function r(e){return null!==e&&"object"===(void 0===e?"undefined":f(e))}var n=function(e,t){return t={exports:{}},e(t,t.exports),t.exports}(function(e){var t=function(){function e(e,t){return null!=t&&e instanceof t}function t(r,f,c,a,s){function l(r,c){if(null===r)return null;if(0===c)return r;var b,g;if("object"!=typeof r)return r;if(e(r,o))b=new o;else if(e(r,i))b=new i;else if(e(r,u))b=new u(function(e,t){r.then(function(t){e(l(t,c-1))},function(e){t(l(e,c-1))})});else if(t.__isArray(r))b=[];else if(t.__isRegExp(r))b=new RegExp(r.source,n(r)),r.lastIndex&&(b.lastIndex=r.lastIndex);else if(t.__isDate(r))b=new Date(r.getTime());else{if(d&&Buffer.isBuffer(r))return b=new Buffer(r.length),r.copy(b),b;e(r,Error)?b=Object.create(r):void 0===a?(g=Object.getPrototypeOf(r),b=Object.create(g)):(b=Object.create(a),g=a)}if(f){var h=p.indexOf(r);if(-1!=h)return y[h];p.push(r),y.push(b)}e(r,o)&&r.forEach(function(e,t){var r=l(t,c-1),n=l(e,c-1);b.set(r,n)}),e(r,i)&&r.forEach(function(e){var t=l(e,c-1);b.add(t)});for(var v in r){var m;g&&(m=Object.getOwnPropertyDescriptor(g,v)),m&&null==m.set||(b[v]=l(r[v],c-1))}if(Object.getOwnPropertySymbols){var j=Object.getOwnPropertySymbols(r);for(v=0;v<j.length;v++){var O=j[v];(!(x=Object.getOwnPropertyDescriptor(r,O))||x.enumerable||s)&&(b[O]=l(r[O],c-1),x.enumerable||Object.defineProperty(b,O,{enumerable:!1}))}}if(s){var w=Object.getOwnPropertyNames(r);for(v=0;v<w.length;v++){var x,_=w[v];(x=Object.getOwnPropertyDescriptor(r,_))&&x.enumerable||(b[_]=l(r[_],c-1),Object.defineProperty(b,_,{enumerable:!1}))}}return b}"object"==typeof f&&(c=f.depth,a=f.prototype,s=f.includeNonEnumerable,f=f.circular);var p=[],y=[],d="undefined"!=typeof Buffer;return void 0===f&&(f=!0),void 0===c&&(c=1/0),l(r,c)}function r(e){return Object.prototype.toString.call(e)}function n(e){var t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),t}var o;try{o=Map}catch(e){o=function(){}}var i;try{i=Set}catch(e){i=function(){}}var u;try{u=Promise}catch(e){u=function(){}}return t.clonePrototype=function(e){if(null===e)return null;var t=function(){};return t.prototype=e,new t},t.__objToStr=r,t.__isDate=function(e){return"object"==typeof e&&"[object Date]"===r(e)},t.__isArray=function(e){return"object"==typeof e&&"[object Array]"===r(e)},t.__isRegExp=function(e){return"object"==typeof e&&"[object RegExp]"===r(e)},t.__getRegExpFlags=n,t}();e.exports&&(e.exports=t)}),o=function(e,t){t.add();const r=e.length;let n=0,o="name";for(;n<r;){const r=e[n++],i=r.charCodeAt(0);58===i||44===i?(o="arg",t.shiftValue()):124===i?(o="name",t.add()):"arg"===o?t.appendValue(r):t.appendKey(r,i)}return t.toJSON()},i=function(){return{nodes:[],currentNode:null,add(){this.currentNode={name:"",args:[]},this.nodes.push(this.currentNode)},appendKey(e,t){32!==t&&(this.currentNode.name+=e)},appendValue(e){this.currentNode.args[this.currentNode.args.length-1]+=e},shiftValue(){this.currentNode.args.push("")},toJSON(){return this.nodes}}},u=function(e){return e.replace(/_(\w)/g,function(e,t){return t.toUpperCase()})},f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};return function(f){return{sanitize:function(c,a){var s=function(e,r){return r=r||{},Object.keys(e).reduce(function(n,u){var f=e[u];if("string"==typeof f)f=o(f,new i);else if(!Array.isArray(f))throw new Error("Rules must be defined as a string or an array");return u.indexOf("*")>-1?t(u.split(/\.\*\.?/),r).forEach(function(e){n[e]=f}):n[u]=f,n},{})}(a,c);return Object.keys(s).reduce(function(t,n){var o=e(c,n);return null!==o&&function(e,t,n){function o(e,t){var u=i[t];if(t+1!==i.length)return isNaN(parseInt(i[t+1]))||Array.isArray(e[u])?r(e[u])||(e[u]={}):e[u]=[],o(e[u],t+1);e[u]=n}if(r(e)&&"string"==typeof t){var i=t.split(".");o(e,0)}}(t,n,function(e,t,r){var n=t;return r.forEach(function(t){var r=u(t.name);if("function"!=typeof e[r])throw new Error(r+" is not a sanitization method");n=e[r](n,t.args)}),n}(f,o,s[n])),t},n(c,!1))}}}});