
import { skippable } from '../utils'
import { ValidationNode } from 'indicative-compiler'

/**
 * Ensures the value of field under validation contains a given substring.
 *
 * [source, js]
 * ----
 * const rules = {
 *   url: 'includes:adonisjs.com'
 * }
 *
 * // or
 * const rules = {
 *   url: [
 *     rule('includes', ['adonisjs.com'])
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('includes: make sure to define value to match')
    }

    return args
  },
  validate: (data, field, [substring]: [string]) => {
    const fieldValue = data[field]
    return skippable(fieldValue) || String(fieldValue).includes(substring)
  },
}

export { validation as default }
