'use strict'

/**
 * indicative
 * Copyright(c) 2016-2016 Harminder Virk
 * MIT Licensed
*/

let Sanitization = exports = module.exports = {}

const Parser = require('../Parser')
const dotProp = require('dot-prop')
const filters = require('./filters')

/**
 * @description sanitizes a given field with all the sanitization
 * rules defined on it
 * @method _sanitizeField
 * @param  {Object}       data
 * @param  {Object}       rule
 * @param  {String}       field
 * @return {Mixed}
 * @public
 */
Sanitization._sanitizeField = function (data, rule, field) {
  let fieldValue = dotProp.get(data, field)
  const ruleKeys = Object.keys(rule)

  ruleKeys.forEach(function (key) {
    const ruleMethod = Parser.toCamelCase(key)
    if (typeof(filters[ruleMethod]) !== 'function') {
      throw new Error(key + ' is not defined as a sanitization rule')
    }
    fieldValue = filters[ruleMethod](fieldValue, rule[key].args)
  })
  return fieldValue
}

/**
 * @description sanitizes input data with defined sanitization rules
 * @method sanitize
 * @param  {Object} data
 * @param  {Object} schema
 * @return {Object}
 * @public
 */
Sanitization.sanitize = function (data, schema) {
  const schemaKeys = Object.keys(schema)
  const sanitizedData = {}
  schemaKeys.forEach(function (field) {
    const parsedRule = Parser.parse(schema[field])
    const sanitizedValue = Sanitization._sanitizeField(data, parsedRule.rules, field)
    dotProp.set(sanitizedData, field, sanitizedValue)
  })
  return sanitizedData
}
