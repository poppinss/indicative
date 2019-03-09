
import { empty } from '../raw/empty'
import { existy } from '../raw/existy'
import { ValidationNode } from 'indicative-compiler'

/**
 * Ensures the field is required when all other fields have non-empty values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   tax_id: 'required_with_all:car,house'
 * }
 *
 * // or
 * const rules = {
 *   tax_id: [
 *     rule('required_with_all', ['car', 'house'])
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('requiredWithAll: make sure to define one or more target fields')
    }

    return args
  },
  validate: (data, field, args: string[]) => {
    const missingField = args.some((item) => !existy(data[item]))
    if (missingField) {
      return true
    }

    return !empty(data[field])
  },
}

export { validation as default }
