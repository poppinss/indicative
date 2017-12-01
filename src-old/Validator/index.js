'use strict'

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const _ = require('lodash')
const Parser = require('../Parser')
const Validations = require('../Validations')
const ValidationEngine = require('./engine')
const Messages = require('../Messages')
const Modes = require('../Modes')
const pSettle = require('p-settle')
const pSeries = require('p-series')
const Formatters = require('../Formatters')

/**
 * map all parsedRules into a validation messages to be executed
 * using Q.
 *
 * @param   {Object} data
 * @param   {Object} rules
 * @param   {Object} messages
 * @param   {Object} formatter
 * @param   {Boolean} runAll
 *
 * @return  {Array}
 *
 * @private
 */
function _mapValidations (data, rules, messages, formatter, runAll) {
  return _.map(rules, (validations, field) => {
    return ValidationEngine.validateField(data, field, validations, messages, formatter, runAll)
  })
}

/**
 * it manually maps all the errors returned by Q.allSettled
 * and throws them as an array only if there are errors.
 *
 * @param  {Array} fieldsResults
 *
 * @return {void}
 * @throws {Error} If promise resolves to errors or a single error
 *
 * @private
 */
function _settleAllPromises (fieldsResults) {
  const errorsList = _(fieldsResults)
  .transform((errors, field) => {
    const ruleErrors = _.filter(field.value, (item) => item.isRejected)
    if (ruleErrors) {
      errors.push(ruleErrors.map((item) => item.reason))
    }
  }, [])
  .flatten()
  .value()

  /**
   * Throw erros when there are errors
   */
  if (_.size(errorsList)) {
    throw errorsList
  }
}

const Validator = exports = module.exports = {}

/**
 * validate a set of async validations mapped as field and rule
 * called rules.
 *
 * @param  {Object} data
 * @param  {Object} rules
 * @param  {Object} messages
 * @param  {String} formatter
 *
 * @return {Object|Array}
 */

Validator.validate = function (data, rules, messages, formatter) {
  messages = messages || {}
  const transformedRules = Parser.transformRules(data, rules)
  const formatterInstance = Formatters.get(formatter)

  const validations = _mapValidations(data, transformedRules, messages, formatterInstance)

  return new Promise((resolve, reject) => {
    pSeries(validations)
    .then(() => resolve(data))
    .catch(() => reject(formatterInstance.toJSON()))
  })
}

/**
 * Just like validate but waits for all the validations to occur
 * and returns an array of errors.
 *
 * @param  {Object} data
 * @param  {Object} rules
 * @param  {Object} messages
 * @param  {String} formatter
 *
 * @return {Object|Array}
 */
Validator.validateAll = function (data, rules, messages, formatter) {
  messages = messages || {}
  const transformedRules = Parser.transformRules(data, rules)
  const formatterInstance = Formatters.get(formatter)
  const validations = _mapValidations(data, transformedRules, messages, formatterInstance, true)

  return new Promise((resolve, reject) => {
    pSettle(validations)
    .then(_settleAllPromises)
    .then(() => resolve(data))
    .catch(() => reject(formatterInstance.toJSON()))
  })
}

/**
 * exposes an interface to extend the validator and add
 * new methods to it.
 *
 * @param  {String} name
 * @param  {Function} method
 * @param  {String} message
 *
 * @return {void}
 *
 * @throws {Error} If method is not a function
 */
Validator.extend = function (name, method, message) {
  if (typeof (method) !== 'function') {
    throw new Error('Invalid arguments, extend expects a method to execute')
  }
  Validations[name] = method
  Messages.set(_.snakeCase(name), message)
}

Validator.is = require('../Raw')

/**
 * exposes an interface to extend the raw validator and add
 * own methods to it.
 *
 * @param  {String} name
 * @param  {Function} method
 *
 * @return {void}
 *
 * @throws {Error} If method is not a function
 */
Validator.is.extend = function (name, method) {
  if (typeof (method) !== 'function') {
    throw new Error('Invalid arguments, is.extends expects 2nd parameter as a function')
  }
  Validator.is[name] = method
}

/**
 * @see Modes.set
 */
Validator.setMode = Modes.set
