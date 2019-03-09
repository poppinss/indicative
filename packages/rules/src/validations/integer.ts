import { skippable } from '../utils'
import { ValidationNode } from 'indicative-compiler'
import { config } from '../config'

/**
 * Ensures the value is a valid integer. Also string representation of a number
 * will return true.
 *
 * integer(10) // true
 * integer('10') // true
 * integer('foo') // false
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: 'integer'
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rule('integer')
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  validate: (data, field) => {
    let fieldValue = data[field]
    if (skippable(fieldValue)) {
      return true
    }

    fieldValue = config.castValues ? Number(fieldValue) : fieldValue
    return Number.isInteger(fieldValue)
  },
}

export { validation as default }
