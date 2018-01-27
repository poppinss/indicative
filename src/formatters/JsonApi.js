'use strict'

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

/**
 * Returns all validation errors as per JSONAPI specs.
 *
 * @class JsonApiFormatter
 *
 * @example
 * const formatter = new JsonApiFormatter()
 *
 * // add error as -> error, field, validation
 * formatter.addError('error message', 'username', 'required')
 *
 * // get errors
 * formatter.toJSON()
 */
function JsonApiFormatter () {
  this.errors = []
}

/**
 * Stores the error to errors stack
 *
 * @method addError
 *
 * @param {Object} error
 * @param {String} field
 * @param {String} validation
 * @param {Array} args
 *
 * @return {void}
 */
JsonApiFormatter.prototype.addError = function (error, field, validation, args) {
  let message = error
  if (error instanceof Error) {
    validation = 'ENGINE_EXCEPTION'
    message = error.message
  }

  this.errors.push({
    title: validation,
    detail: message,
    source: {
      pointer: field
    }
  })
}

/**
 * Returns error object with an array of
 * errors inside it.
 *
 * @method toJSON
 *
 * @return {Object}
 */
JsonApiFormatter.prototype.toJSON = function () {
  return this.errors
}

export default JsonApiFormatter
