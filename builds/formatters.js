(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.indicative = global.indicative || {}, global.indicative.formatters = {})));
}(this, (function (exports) { 'use strict';

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

/**
 * Indicative allows error formatters, which can format the
 * validation or core exceptions into a proper error object.
 *
 * You can add more formatters, but VanillaFormatter is
 * used when no custom formatter is used.
 *
 * @class VanillaFormatter
 *
 * @example
 * const formatter = new VanillaFormatter()
 *
 * // add error as -> error, field, validation
 * formatter.addError('error message', 'username', 'required')
 *
 * // get errors
 * formatter.toJSON()
 */

function VanillaFormatter() {
  this.errors = [];
}

/**
 * Stores the error to errors stack
 *
 * @method addError
 *
 * @param {Object} error
 * @param {String} field
 * @param {String} validation
 *
 * @return {void}
 */
VanillaFormatter.prototype.addError = function (error, field, validation) {
  var message = error;
  if (error instanceof Error) {
    validation = 'ENGINE_EXCEPTION';
    message = error.message;
  }
  this.errors.push({ message: message, field: field, validation: validation });
};

/**
 * Returns an array of errors
 *
 * @method toJSON
 *
 * @return {Array}
 */
VanillaFormatter.prototype.toJSON = function () {
  return this.errors;
};

exports.Vanilla = VanillaFormatter;

Object.defineProperty(exports, '__esModule', { value: true });

})));
