import { skippable } from '../utils'
import { json } from '../raw/json'
import { ValidationNode } from 'indicative-compiler'

/**
 * Ensures the value of field under validation is safe to be parsed
 * using `JSON.parse` method.
 *
 * [source, js]
 * ----
 * const rules = {
 *   payload: 'json'
 * }
 *
 * // or
 * const rules = {
 *   payload: [
 *     rule('json')
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  validate: (data, field) => {
    const fieldValue = data[field]
    return skippable(fieldValue) || json(fieldValue)
  },
}

export { validation as default }
