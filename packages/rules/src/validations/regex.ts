import { skippable } from '../utils'
import { ArgRegex } from '../contracts'
import { ValidationNode } from 'indicative-compiler'

/**
 * Ensures the value of field under validation, passes the regex test. The regex
 * can be defined as a string or a RegExp object.
 *
 * NOTE: For complex `regex`, always use the `rule` method.
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: [
 *     rule('regex', /[a-z]+/)
 *   ]
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rule('regex', new RegExp('[a-z]+'))
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): ArgRegex {
    if (!args || !args.length) {
      throw new Error('regex: make sure to define regex pattern')
    }

    const expression = args[0] instanceof RegExp ? args[0] : new RegExp(args[0], args[1])
    return [expression]
  },
  validate: (data, field, [expression]: ArgRegex) => {
    const fieldValue = data[field]
    return skippable(fieldValue) || expression.test(fieldValue)
  },
}

export { validation as default }
