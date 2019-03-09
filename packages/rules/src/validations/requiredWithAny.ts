
import { empty } from '../raw/empty'
import { existy } from '../raw/existy'
import { ValidationNode } from 'indicative-compiler'

/**
 * Ensures the field is required when any of the other fields have non-empty values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   password: 'required_with_any:username,email'
 * }
 *
 * // or
 * const rules = {
 *   password: [
 *     rule('required_with_any', ['username', 'email'])
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('requiredWithAny: make sure to define one or more target fields')
    }

    return args
  },
  validate: (data, field, args: string[]) => {
    const matchingField = args.some((item) => existy(data[item]))
    if (matchingField) {
      return !empty(data[field])
    }

    return true
  },
}

export { validation as default }
