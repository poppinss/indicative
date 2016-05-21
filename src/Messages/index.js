'use strict'

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/
const pope = require('pope')
const _ = require('lodash')

const messagesStore = {}
const arrayExpressionRegex = /\.\d/g

/**
 * returns the default message for a validation.
 *
 * @param   {Object} messages
 * @param   {String} field
 * @param   {String} validation
 *
 * @return  {String}
 *
 * @private
 */
function _returnDefaultMessage (messages, field, validation) {
  return messagesStore[validation] || '{{validation}} validation failed on {{field}}'
}

/**
 * returns a custom validation message for a given validation.
 *
 * @param   {Object} messages
 * @param   {String} field
 * @param   {String} validation
 *
 * @return  {String|Function}
 *
 * @private
 */
function _returnValidationMessage (messages, field, validation) {
  return messages[validation]
}

/**
 * returns a custom validation message for a given field
 * and validation
 *
 * @param   {Object} messages
 * @param   {String} field
 * @param   {String} validation
 *
 * @return  {String|Function}
 *
 * @private
 */
function _returnFieldValidationMessage (messages, field, validation) {
  const fieldToArrayExpression = field.replace(arrayExpressionRegex, '.*')
  return messages[`${field}.${validation}`] || messages[`${fieldToArrayExpression}.${validation}`]
}

/**
 * returns the message method.
 *
 * @param   {Function|String} message
 *
 * @return  {String}
 *
 * @private
 */
function _makePopeMessage (message) {
  return typeof (message) === 'function' ? message : function (field, validation, arg) {
    return pope(message, {field, validation, argument: arg})
  }
}

/**
 * a custom array holding all the validation message
 * functions. We will later itterate over this
 * array to find the best message.
 *
 * @type {Array}
 */
const validationMethods = [
  _returnFieldValidationMessage,
  _returnValidationMessage,
  _returnDefaultMessage
]

let Messages = exports = module.exports = {}

/**
 * making a message for a given field and validation.
 *
 * @param  {Object} customMessages
 * @param  {String} field
 * @param  {String} validation
 * @param  {Array} args
 *
 * @return {String}
 */
Messages.make = function (customMessages, field, validation, args) {
  return _(validationMethods)
  .chain()
  .find((method) => method(customMessages, field, validation))
  .thru((method) => method(customMessages, field, validation))
  .thru((message) => _makePopeMessage(message)(field, validation, args))
  .value()
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
