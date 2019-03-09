
import { skippable } from '../utils'
import { existy } from '../raw/existy'
import { ValidationNode } from 'indicative-compiler'

/**
 * Ensures the value of 2 fields are same.
 *
 * [source, js]
 * ----
 * const rules = {
 *   password_confirmation: 'same:password'
 * }
 *
 * // or
 * const rules = {
 *   password_confirmation: [
 *     rule('same', ['password'])
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('same: make sure to define comparison field')
    }

    return args
  },
  validate: (data, field, [comparisonField]: [string]) => {
    const fieldValue = data[field]
    const targetedFieldValue = data[comparisonField]

    return skippable(fieldValue) || !existy(targetedFieldValue) || targetedFieldValue === fieldValue
  },
}

export { validation as default }
