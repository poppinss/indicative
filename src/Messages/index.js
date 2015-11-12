'use strict'

/**
 * indicative
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/
const pope = require('pope')

/**
 * default validation message
 * @type {String}
 */
const defaultMessage = '{{validation}} validation failed on {{field}}'

/**
 * storing a list of messages sent by extend method
 * @type {Object}
 */
const messagesStore = {}

/**
 * @module Messages
 * @description Messages module to return most accurate messages
 * for validations
 * @type {Object}
 */
let Messages = exports = module.exports = {}

/**
 * @description returns most relevant message for a given
 * field and validation rule
 * @method message
 * @param  {Object} customMessages
 * @param  {String} field
 * @param  {String} validation
 * @return {String}
 * @example
 *   Follow placeholders are allowed
 *   {field} {validation} {argument}
 * @public
 */
Messages.message = function (customMessages, field, validation, args) {
  let validationMessage = messagesStore[validation] || defaultMessage
  const fieldRuleMessage = customMessages[`${field}.${validation}`]
  const ruleMessage = customMessages[validation]

  if (fieldRuleMessage) {
    validationMessage = fieldRuleMessage
  } else if (ruleMessage) {
    validationMessage = ruleMessage
  }

  if (typeof (validationMessage) === 'function') {
    return validationMessage(field, validation, args)
  }

  const data = {field, validation, argument: args}
  return pope(validationMessage, data)
}

/**
 * @description sets a message for a given rule
 * @method set
 * @param  {String} name
 * @param  {String|Function} message
 * @public
 */
Messages.set = function (name, message) {
  messagesStore[name] = message
}
