'use strict'

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const Validations = require('../Validations')
const Parser = require('../Parser')
const Messages = require('../Messages')
const _ = require('lodash')
const Q = require('q')

const ValidationEngine = exports = module.exports = {}

/**
 * validates a field with all assigned validations for that
 * field.
 *
 * @param  {Object}  data
 * @param  {String}  field
 * @param  {Object}  validations
 * @param  {Object}  messages
 * @param  {Boolean} [runAll]
 *
 * @return {Promise<Array>}
 */
ValidationEngine.validateField = function (data, field, validations, messages, runAll) {
  const method = runAll ? 'allSettled' : 'all'
  return Q[method](
    _.map(validations, (validation) => {
      return ValidationEngine.runValidationOnField(data, field, validation.name, messages, validation.args)
    })
  )
}

/**
 * runs a single validation on a given field.
 *
 * @param  {Object} data
 * @param  {String} field
 * @param  {String} validation
 * @param  {Object} messages
 * @param  {Array}  [args]
 *
 * @return {Promise}
 */
ValidationEngine.runValidationOnField = function (data, field, validation, messages, args) {
  const message = Messages.make(messages, field, validation, args)
  const validationMethod = ValidationEngine.getValidationMethod(validation)

  return Q.Promise((resolve, reject) => {
    validationMethod(data, field, message, args, _.get)
    .then(resolve)
    .catch((error) => {
      reject({field, validation, message: error})
    })
  })
}

/**
 * returns the validation method from the Validations
 * store or throws an error saying validation not
 * found.
 *
 * @param  {String} validation
 *
 * @return {Function}
 *
 * @throws {Error} If validation is not found
 */
ValidationEngine.getValidationMethod = function (validation) {
  return _.get(Validations, Parser.toCamelCase(validation), function () {
    throw new Error(`${validation} is not defined as a validation`)
  })
}
