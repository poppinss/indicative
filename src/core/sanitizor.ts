/*
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import * as clone from 'clone'
import { prop } from 'pope'

import parse from './parse'
import snakeToCamelCase from './snakeToCamelCase'

/**
 * Returns a boolean on whether param is an
 * object or not.
 *
 * @method isObj
 *
 * @param  {Mixed} obj
 *
 * @return {Boolean}
 */
function isObj (obj) {
  return obj !== null && typeof (obj) === 'object'
}

/**
 * Set nested values on a object, using `path` as
 * the (dot) seperated string.
 *
 * @method setPath
 *
 * @param  {Object} obj
 * @param  {String} itemPath
 * @param  {Mixed}  value
 *
 * @return {void}
 */
function setPath (obj, itemPath, value) {
  if (!isObj(obj) || typeof (itemPath) !== 'string') {
    return
  }

  const pathArr = itemPath.split('.')

  function noop (obj, i) {
    const item = pathArr[i]

    /**
     * Finally set the value when array is done
     */
    if (i + 1 === pathArr.length) {
      obj[item] = value
      return
    }

    if (!isNaN(parseInt(pathArr[i + 1])) && !Array.isArray(obj[item])) {
      obj[item] = []
    } else if (!isObj(obj[item])) {
      obj[item] = {}
    }

    /**
     * Carry on recursively.
     */
    return noop(obj[item], i + 1)
  }

  /**
   * Start recursion
   */
  return noop(obj, 0)
}

/**
 * Runs a bunch of sanitization rules on a given value
 *
 * @method sanitizeField
 *
 * @param  {Object} sanitizations
 * @param  {Mixed}  value
 * @param  {Array}  rules
 *
 * @return {Mixed}
 *
 * @throws {Exception} If sanitization rule doesnt exists
 */
function sanitizeField (sanitizations, value, rules) {
  let result = value

  rules.forEach((rule) => {
    const ruleFn = snakeToCamelCase(rule.name)
    if (typeof (sanitizations[ruleFn]) !== 'function') {
      throw new Error(`${ruleFn} is not a sanitization method`)
    }
    result = sanitizations[ruleFn](result, rule.args)
  })

  return result
}

export default (sanitizations) => {
  return {
    sanitize (data, fields) {
      const parsedFields = parse(fields, data)

      return Object.keys(parsedFields).reduce((result, field) => {
        const fieldValue = prop(data, field)
        if (fieldValue !== null) {
          setPath(result, field, sanitizeField(sanitizations, fieldValue, parsedFields[field]))
        }
        return result
      }, clone(data, false))
    },
  }
}
