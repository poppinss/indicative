(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.indicative = global.indicative || {}, global.indicative.configure = factory());
}(this, (function () { 'use strict';

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

var config = {
  /**
   * When existy strict is set to `true`, unless `undefined` values will be
   * considered as non-existy.
   *
   * Otherwise `empty strings`, `null` and `undefined` are considered
   * non-existy.
   *
   * @type {Boolean}
   */
  EXISTY_STRICT: false,

  /**
   * The default formatter to be used for formatting errors. Out of the box
   * `JSONApi` and `Vanilla` are supported.
   *
   * @type {String}
   */
  DEFAULT_FORMATTER: 'Vanilla'
};

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

function setConfig(options) {
  Object.keys(options).forEach(function (option) {
    if (config[option] !== undefined) {
      config[option] = options[option];
    }
  });
}
setConfig.DEFAULTS = Object.keys(config).reduce(function (result, key) {
  result[key] = config[key];
  return result;
}, {});

return setConfig;

})));
