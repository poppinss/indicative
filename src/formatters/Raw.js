'use strict'

/**
 * indicative
 *
 * (c) Anton Ignatev <nslsmain@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

/**
 * Returns full information about validation errors in a simple json format, which is handy for error handling on the client-side.
 *
 * @class RawFormatter
 *
 * @example
 * const formatter = new RawFormatter()
 *
 * // add error as -> error, field, validation
 * formatter.addError('', 'username', 'required', [])
 *
 * // get errors
 * formatter.toJSON()
 */
function RawFormatter () {
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
RawFormatter.prototype.addError = function (error, field, validation, args) {
  if (error instanceof Error) {
    validation = 'ENGINE_EXCEPTION'
  }

  this.errors.push({
    name: validation,
    field: field,
    params: args
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
RawFormatter.prototype.toJSON = function () {
    // Group by field
  let errorsByField = this.errors
        .reduce(
            (errors, {name, field, params}) => {
              if (errors[field]) {
                errors[field].push({
                  name,
                  params
                })
              } else {
                errors[field] = [{
                  name,
                  params
                }]
              }

              return errors
            },
            {}
        )

    // Return an aggregated array of fields with errors
  return Object.entries(errorsByField)
        .map(
            ([field, errors]) => ({
              field,
              errors
            })
        )
}

export default RawFormatter
