'use strict'

/**
 * indicative
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

/**
 * @module Parser
 * @description Rule parser to convert rule string into a consumable
 * object
 * @type {Object}
 */
let Parser = exports = module.exports = {}

/**
 * @description loops through an array of validation rules and
 * turns them into a valid consumable object
 * @method _parseValidations
 * @param  {Array}          validations
 * @return {Object}
 * @private
 */
const _parseValidations = function (validations) {
  const parsedValidations = {}
  validations.forEach(function (validation) {
    _parseValidation(parsedValidations, validation)
  })
  return parsedValidations
}

/**
 * @description parse a single validation rule and pulls
 * of required information based upon keywords and
 * turn them into valid data objects
 * @method _parseValidation
 * @param  {Object}         validations
 * @param  {String}         validation
 * @return {Object}
 * @example
 * parses between:4,10 to between: {values: [4,10]}
 * @private
 */
const _parseValidation = function (validations, validation) {
  const matchedValidation = validation.split(':')
  if (matchedValidation.length === 1) {
    validations[validation] = {args: []}
    return
  }
  validation = matchedValidation.splice(0, 1)

  // pulling of values defined with validation defination
  const args = matchedValidation.join(':').split(',')

  validations[validation] = {
    args: args
  }
}

/**
 * @description parses a rule string its validations
 * into a formatted object to be used by validator
 * @method parse
 * @param  {String} rule
 * @return {Object}
 * @public
 */
Parser.parse = function (rule) {
  let rulesArray = rule instanceof Array ? rule : rule.split('|')
  return {rules: _parseValidations(rulesArray)}
}
