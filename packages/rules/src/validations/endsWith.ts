import { skippable } from '../utils'
import { ValidationNode } from 'indicative-compiler'

/**
 * Ensure the value of field under validation ends with a certain substr. This
 * validation will also trim whitespaces before making the check
 *
 * [source, js]
 * ----
 * const rules = {
 *   reg_no: 'ends_with:qaw'
 * }
 *
 * // or
 * const rules = {
 *   reg_no: [
 *     rule('ends_with', 'qaw')
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('endsWith: make sure to define substring')
    }

    return args
  },
  validate: (data, field, [substring]: [string]) => {
    const fieldValue = data[field]
    return skippable(fieldValue) || String(fieldValue).endsWith(String(substring))
  },
}

export { validation as default }
