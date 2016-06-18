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
const Q = require('q')

/**
 * map all parsedRules into a validation messages to be executed
 * using Q.
 *
 * @param   {Object} data
 * @param   {Object} rules
 * @param   {Object} messages
 *
 * @return  {Array}
 *
 * @private
 */
function _mapValidations (data, rules, messages, runAll) {
  return _.map(rules, (validations, field) => ValidationEngine.validateField(data, field, validations, messages, runAll))
}

/**
 * it manually maps all the errors returned by Q.allSettled
 * and throws them as an array only if there are errors.
 *
 * @param  {Array} results
 *
 * @return {void}
 * @throws {Error} If promise resolves to errors or a single error
 *
 * @private
 */
function _settleAllPromises (results) {
  const errors = _(results)
  .flatten()
  .map((result) => {
    return result.state === 'rejected' ? result.reason : null
  })
  .compact()
  .value()
  if (_.size(errors)) {
    throw errors
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
 *
 * @return {Object|Array}
 */

Validator.validate = function (data, rules, messages) {
  messages = messages || {}
  const transformedRules = Parser.transformRules(data, rules)
  const validations = _mapValidations(data, transformedRules, messages)

  return Q.Promise((resolve, reject) => {
    Q.all(validations)
    .then(() => resolve(data))
    .catch((error) => reject([error]))
  })
}

/**
 * Just like validate but waits for all the validations to occur
 * and returns an array of errors.
 *
 * @param  {Object} data
 * @param  {Object} rules
 * @param  {Object} messages
 *
 * @return {Object|Array}
 */
Validator.validateAll = function (data, rules, messages) {
  messages = messages || {}
  const transformedRules = Parser.transformRules(data, rules)
  const validations = _mapValidations(data, transformedRules, messages, true)

  return Q.Promise((resolve, reject) => {
    Q.all(validations)
    .then(_settleAllPromises)
    .then(() => resolve(data))
    .catch(reject)
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
  Messages.set(name, message)
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
