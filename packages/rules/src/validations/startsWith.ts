
import { skippable } from '../utils'
import { ValidationNode } from 'indicative-compiler'

/**
 * Ensure the value of field under validation starts with a certain substr. This
 * validation will also trim whitespaces before making the check
 *
 * [source, js]
 * ----
 * const rules = {
 *   phone_no: 'starts_with:99'
 * }
 *
 * // or
 * const rules = {
 *   phone_no: [
 *     rule('starts_with', '99')
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('startsWith: make sure to define substring')
    }
    return args
  },
  validate: (data, field, [substring]: [string]) => {
    const fieldValue = data[field]
    return skippable(fieldValue) || String(fieldValue).startsWith(substring)
  },
}

export { validation as default }
