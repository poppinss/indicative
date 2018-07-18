'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { prop } from 'pope'

import PLazy from './PLazy'
import pSeries from './pSeries'
import parse from './parse'
import getMessage from './getMessage'
import snakeToCamelCase from './snakeToCamelCase'

/**
 * Returns a lazy promise which runs the validation on a field
 * for a given rule. This method will register promise
 * rejections with the formatter.
 *
 * @method validationFn
 *
 * @param    {Object} validations
 * @param    {Object} rule
 * @property {String} rule.name
 * @property {Array}  rule.args
 * @param    {String} field
 * @param    {Object} data
 * @param    {Object} messages
 * @param    {Object} formatter
 *
 * @returns {Promise}
 */
function validationFn (validations, {name, args}, field, data, messages, formatter) {
  return new PLazy((resolve, reject) => {
    const camelizedName = snakeToCamelCase(name)
    const validation = validations[camelizedName]

    if (typeof (validation) !== 'function') {
      const error = new Error(`${camelizedName} is not defined as a validation rule`)
      formatter.addError(error, field, camelizedName, args)
      reject(error)
      return
    }

    validation(data, field, getMessage(messages, field, name, args), args, prop)
      .then(resolve)
      .catch((error) => {
        formatter.addError(error, field, camelizedName, args)
        reject(error)
      })
  })
}

/**
 * This method loops over the fields and returns a flat stack of
 * validations for each field and multiple rules on that field.
 *
 * Also all validation methods are wrapped inside a Lazy promise,
 * so they are executed when `.then` or `.catch` is called on
 * them.
 *
 * @method getValidationsStack
 *
 * @param {Object}  validations  - Object of available validations
 * @param {Object}  data         - Data to validate
 * @param {Object}  fields       - Fields and their rules
 * @param {Object}  messages     - Custom messages
 * @param {Object}  formatter    - Formatter to be used
 *
 * @returns {Promise[]} An array of lazy promises
 */
function getValidationsStack (validations, fields, data, messages, formatter) {
  return Object
    .keys(fields)
    .reduce((flatValidations, field) => {
      fields[field].map((rule) => {
        flatValidations.push(validationFn(validations, rule, field, data, messages, formatter))
      })
      return flatValidations
    }, [])
}

/**
 * Run `validations` on `data` using rules defined on `fields`.
 *
 * @method validate
 *
 * @param {Object}  validations  - Object of available validations
 * @param {Boolean} bail         - Whether to bail on first error or not
 * @param {Object}  data         - Data to validate
 * @param {Object}  fields       - Fields and their rules
 * @param {Object}  messages     - Custom messages
 * @param {Object}  formatter    - Formatter to be used
 *
 * @returns {Promise} Promise is rejected with an array of errors or resolved with original data
 */
function validate (validations, bail, data, fields, messages, formatter) {
  return new Promise((resolve, reject) => {
    messages = messages || {}

    /**
     * This is expanded form of fields and rules
     * applied on them
     */
    const parsedFields = parse(fields, data)

    /**
     * A flat validations stack, each node is a lazy promise
     */
    const validationsStack = getValidationsStack(validations, parsedFields, data, messages, formatter)

    pSeries(validationsStack, bail)
      .then((response) => {
        const errors = formatter.toJSON()
        if (errors) {
          return reject(errors)
        }
        resolve(data)
      })
  })
}

/**
 * Returns a validator instance to later run validations. Also you need to
 * pass an object of validations to be used when calling `validate` or
 * `validateAll` methods.
 *
 * @param    {Object} validations
 * @param    {Object} defaultFormatter
 *
 * @method validator
 *
 * @return   {Object}   fns
 * @property {validate}
 * @property {validateAll} validateAll
 *
 * @example
 * const { email, required } = require('indicative/validations')
 * const validatorInstance = validator({ email, required })
 *
 * // later
 * validatorInstance.validate()
 */
export default (validations, defaultFormatter) => {
  let message = 'Cannot instantiate validator without'
  if (!validations) {
    throw new Error(`${message} validations`)
  }

  if (!defaultFormatter) {
    throw new Error(`${message} error formatter`)
  }

  return {
    /**
     * Run validations on a set of data with rules defined on fields.
     *
     * @param {Object}  data         - Data to validate
     * @param {Object}  fields       - Fields and their rules
     * @param {Object}  messages     - Custom messages
     * @param {String}  formatter    - Formatter to be used
     *
     * @returns {Promise} Promise is rejected with an array of errors or resolved with original data
     */
    validate (data, fields, messages, formatter) {
      formatter = new (formatter || defaultFormatter)()
      return validate(validations, true, data, fields, messages, formatter)
    },

    /**
     * Run validations on all fields, regardless of whether they fail or pass
     * on a set of data with rules defined on fields.
     *
     * @param {Object}  data         - Data to validate
     * @param {Object}  fields       - Fields and their rules
     * @param {Object}  messages     - Custom messages
     * @param {String}  formatter    - Formatter to be used
     *
     * @returns {Promise} Promise is rejected with an array of errors or resolved with original data
     */
    validateAll (data, fields, messages, formatter) {
      formatter = new (formatter || defaultFormatter)()
      return validate(validations, false, data, fields, messages, formatter)
    }
  }
}
