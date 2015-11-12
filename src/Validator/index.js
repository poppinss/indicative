'use strict'

/**
 * indicative
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const Messages = require('../Messages')
const Validations = require('../Validations')
const Parser = require('../Parser')
const Bluebird = require('bluebird')
const dotProp = require('dot-prop')

/**
 * @module Validator
 * @description Validator to run through an object
 * of validations and report formatted errors
 * @type {Object}
 */
let Validator = exports = module.exports = {}

/**
 * @description validates a single field of rules
 * which can have multiple validation rules.
 * @method _validateField
 * @param  {Object}       validations
 * @param  {Object}       data
 * @param  {String}       field
 * @return {Object}
 * @private
 */
const _validateField = function (validations, data, field, messages, handleAllErrors) {
  const validationRules = validations.rules
  const validationRulesKeys = Object.keys(validationRules)
  const errors = []

  /**
   * @description calls validation rule and construct a formatted
   * error out of it
   * @method executeValidation
   * @param  {String}    validation
   * @return {Promise}
   */
  const executeValidation = function (validation) {
    if (typeof (Validations[validation]) !== 'function') {
      throw new Error(validation + ' is not defined as a rule')
    }
    const message = Messages.message(messages, field, validation, validationRules[validation].args)
    return Validations[validation](data, field, message, validationRules[validation].args, dotProp.get)
      .catch(function (message) {
        errors.push({field, validation, message})
        if (!handleAllErrors) {
          throw message
        }
      })
  }

  return new Promise(function (resolve, reject) {
    Bluebird
      .reduce(validationRulesKeys, function (t, validation) {
        return executeValidation(validation)
      }, 0)
      .then(function () {
        return errors.length ? reject(errors) : resolve()
      }).catch(function (err) {
        return errors.length ? reject(errors) : reject(err)
      })
  })
}

/**
 * @description validates an object of rules by parsing
 * rules and custom messages.It is a very high level
 * function
 * @method validate
 * @param  {Object} rules
 * @param  {Object} data
 * @param  {Object} messages
 * @return {Object}
 * @public
 */
Validator.validate = function (rules, data, messages) {
  messages = messages || {}
  const rulesKeys = Object.keys(rules)

  return new Promise(function (resolve, reject) {
    Bluebird.reduce(rulesKeys, function (t, rule) {
      const parsedRule = Parser.parse(rules[rule])
      return _validateField(parsedRule, data, rule, messages, false)
    }, 0)
      .then(function () {
        resolve(data)
      })
      .catch(reject)
  })
}

/**
 * @description validates all of the fields defined in rules and
 * returns an array of errors
 * @method validateAll
 * @param  {Object}    rules
 * @param  {Object}    data
 * @param  {Object}    messages
 * @return {Object}
 * @public
 */
Validator.validateAll = function (rules, data, messages) {
  messages = messages || {}
  const rulesKeys = Object.keys(rules)
  let errors = []

  return new Promise(function (resolve, reject) {
    Bluebird.reduce(rulesKeys, function (t, rule) {
      const parsedRule = Parser.parse(rules[rule])
      return _validateField(parsedRule, data, rule, messages, true)
        .catch(function (err) {
          errors = errors.concat(err)
        })
    }, 0)
      .then(function () {
        return errors.length > 0 ? reject(errors) : resolve(data)
      })
      .catch(function (err) {
        return errors.length ? reject(errors) : reject(err)
      })
  })
}

/**
 * @description extend or override validation rules
 * @method extend
 * @param  {String} name
 * @param  {Function} method
 * @param  {String|Function} message
 * @return {void}
 * @public
 */
Validator.extend = function (name, method, message) {
  if (typeof (method) !== 'function') {
    throw new Error('Invalid arguments, extend expects a method to execute')
  }
  Validations[name] = method
}

/**
 * attaching raw validator
 * @type {Object}
 */
Validator.is = require('../Raw')

/**
 * @description extends to add/override methods
 * on raw validator
 * @method extend
 * @param  {String} name
 * @param  {Function} method
 * @return {void}
 * @public
 */
Validator.is.extend = function (name, method) {
  if (typeof (method) !== 'function') {
    throw new Error('Invalid arguments, is.extends expects 2nd parameter as a function')
  }
  Validator.is[name] = method
}
