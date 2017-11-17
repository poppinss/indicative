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
const Messages = require('../Messages')
const _ = require('lodash')
const pSettle = require('p-settle')
const pSeries = require('p-series')
const PLazy = require('p-lazy')

const ValidationEngine = exports = module.exports = {}

/**
 * validates a field with all assigned validations for that
 * field.
 *
 * @param  {Object}  data
 * @param  {String}  field
 * @param  {Object}  validations
 * @param  {Object}  messages
 * @param  {Object}  formatter
 * @param  {Boolean} [runAll]
 *
 * @return {Promise<Array>}
 */
ValidationEngine.validateField = function (data, field, validations, messages, formatter, runAll) {
  const validationsMap = _.map(validations, (validation) => {
    return ValidationEngine.runValidationOnField(data, field, validation.name, messages, validation.args, formatter)
  })
  return runAll ? pSettle(validationsMap) : function () {
    return pSeries(validationsMap)
  }
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
ValidationEngine.runValidationOnField = function (data, field, validation, messages, args, formatter) {
  const message = Messages.make(messages, field, validation, args)

  return new PLazy((resolve, reject) => {
    return Promise.resolve(ValidationEngine.getValidationMethod(validation))
    .then((validationMethod) => {
      return validationMethod(data, field, message, args, _.get)
    })
    .then(resolve)
    .catch((error) => {
      if (error && typeof (error) === 'object' && error.code === 'ENGINE_EXCEPTION') {
        formatter.addError({ field, validation: 'ENGINE_EXCEPTION', message: error.message })
      } else {
        formatter.addError({ field, validation, message: error })
      }
      reject(new Error(error))
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
  return _.get(Validations, _.camelCase(validation), function () {
    const error = new Error(`${validation} is not defined as a validation`)
    error.code = 'ENGINE_EXCEPTION'
    throw error
  })
}
