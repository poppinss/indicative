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
function VanillaFormatter () {
  this.errors = []
}

/**
 * Stores the error
 *
 * @method addError
 *
 * @param {Object} error
 * @param {String} field
 * @param {String} validation
 */
VanillaFormatter.prototype.addError = function (error, field, validation) {
  let message = error
  if (error instanceof Error) {
    validation = 'ENGINE_EXCEPTION'
    message = error.message
  }
  this.errors.push({ message, field, validation })
}

/**
 * Returns an array of errors
 *
 * @method toJSON
 *
 * @return {Array}
 */
VanillaFormatter.prototype.toJSON = function () {
  return this.errors
}

export default VanillaFormatter
