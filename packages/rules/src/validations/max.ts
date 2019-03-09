import { skippable } from '../utils'
import { ArgComparison } from '../contracts'
import { ValidationNode } from 'indicative-compiler'

/**
 * Ensures the length of a string or array is not greater than
 * the defined length.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'max:40'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('max', 40)
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('max: make sure to define max length')
    }

    const maxLength = Number(args[0])
    if (isNaN(maxLength)) {
      throw new Error('max: length must be defined as an integer')
    }

    return [maxLength]
  },
  validate: (data, field, [maxLength]: ArgComparison) => {
    const fieldValue = data[field]
    const transformedValue = Array.isArray(fieldValue) ? fieldValue : String(fieldValue)
    return skippable(fieldValue) || transformedValue.length <= maxLength
  },
}

export { validation as default }
