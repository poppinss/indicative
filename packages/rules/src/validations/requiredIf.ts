import { empty } from '../raw/empty'
import { existy } from '../raw/existy'
import { ValidationNode } from 'indicative-compiler'

/**
 * The field is checked for required validation, when expected field exists.
 *
 * [source, js]
 * ----
 * const rules = {
 *   address: 'required_if:needs_delivery'
 * }
 *
 * // or
 * const rules = {
 *   address: [
 *     rule('required_if', 'needs_delivery')
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('requiredIf: make sure to define target field')
    }

    return args
  },
  validate: (data, field, [targetField]: [string]) => {
    if (!existy(data[targetField])) {
      return true
    }

    return !empty(data[field])
  },
}

export { validation as default }
