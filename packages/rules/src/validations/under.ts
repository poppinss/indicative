import { skippable } from '../utils'
import { ValidationNode } from 'indicative-compiler'
import { config } from '../config'
import { ArgComparison } from '../Contracts'

/**
 * Ensures the value of a field is under a certain value. All values
 * will be casted to `Number`.
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: 'under:60'
 * }
 *
 * // or
 * const rules = {
 *   password_confirmation: [
 *     rule('age', 60)
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('under: make sure to define max value')
    }

    return [Number(args[0])]
  },
  validate: (data, field, [maxValue]: ArgComparison) => {
    let fieldValue = data[field]
    if (skippable(fieldValue)) {
      return true
    }

    fieldValue = config.castValues ? Number(fieldValue) : fieldValue
    return fieldValue < maxValue
  },
}

export { validation as default }
