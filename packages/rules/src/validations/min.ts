import { skippable } from '../utils'
import { ArgComparison } from '../contracts'
import { ValidationNode } from 'indicative-compiler'

/**
 * Ensures the length of a string or array is not is not less than
 * the expected length
 *
 * [source, js]
 * ----
 * const rules = {
 *   password: 'min:6'
 * }
 *
 * // or
 * const rules = {
 *   password: [
 *     rule('min', 6)
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('min: make sure to define min length')
    }

    const minLength = Number(args[0])
    if (isNaN(minLength)) {
      throw new Error('min: length must be defined as an integer')
    }

    return [minLength]
  },
  validate: (data, field, [minLength]: ArgComparison) => {
    const fieldValue = data[field]
    const transformedValue = Array.isArray(fieldValue) ? fieldValue : String(fieldValue)
    return skippable(fieldValue) || transformedValue.length >= minLength
  },
}

export { validation as default }
