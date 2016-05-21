'use strict'

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

let Sanitization = exports = module.exports = {}

const _ = require('lodash')
const Parser = require('../Parser')
const filters = require('./filters')

/**
 * returns sanitization method for a filter name
 *
 * @param   {String} filter
 *
 * @return  {Function}        [description]
 *
 * @throws {Error} If filter is not found
 *
 * @private
 */
function _getSanitizationMethod (filter) {
  return _.get(filters, Parser.toCamelCase(filter), function () {
    throw new Error(`${filter} is not defined as a filter`)
  })
}

/**
 * sanitizes a given field value by looping over
 * all the rules defined next to the field.
 *
 * @param   {Object} data
 * @param   {Array} rules
 * @param   {String} field
 *
 * @return  {String}
 *
 * @private
 */
function _sanitizeFieldValue (data, rules, field) {
  return _.reduce(rules, (value, rule) => {
    const ruleMethod = _getSanitizationMethod(rule.name)
    return ruleMethod(value, rule.args)
  }, _.get(data, field))
}

/**
 * sanitizes a given set of data with given set
 * of rules.
 *
 * @param  {Object} data
 * @param  {Object} rules
 *
 * @return {Object}
 */
Sanitization.sanitize = function (data, rules) {
  const clonedSet = _.cloneDeep(data)
  const transformedRules = Parser.transformRules(data, rules)
  return _.reduce(transformedRules, (result, rules, field) => {
    _.set(result, field, _sanitizeFieldValue(data, rules, field))
    return result
  }, clonedSet)
}

Sanitization.sanitizor = filters

/**
 * exposes an interface to extend filters
 *
 * @param  {String} name
 * @param  {Function} method
 *
 * @return {void}
 *
 * @throws {Error} If method is not a function
 */
Sanitization.sanitizor.extend = function (name, method) {
  if (typeof (method) !== 'function') {
    throw new Error('Invalid arguments, sanitizor.extend expects 2nd parameter to be a function')
  }
  Sanitization.sanitizor[name] = method
}
