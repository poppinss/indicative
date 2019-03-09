import { skippable } from '../utils'
import { isObject } from '../raw/isObject'
import { ValidationNode } from 'indicative-compiler'

/**
 * Ensures the value of field under validation is a valid Javascript
 * object.
 *
 * The validation will fail for `Arrays`, though they are objects too in Javascript.
 *
 * [source, js]
 * ----
 * const rules = {
 *   user: 'object'
 * }
 *
 * // or
 * const rules = {
 *   user: [
 *     rule('object')
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  validate: (data, field) => {
    const fieldValue = data[field]
    return skippable(fieldValue) || isObject(fieldValue)
  },
}

export { validation as default }
