
import { skippable } from '../utils'
import { ValidationNode } from 'indicative-compiler'

/**
 * Makes sure that the value of field under validation is not
 * same as the defined value.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'not_equals:root'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('not_equals', 'root')
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('notEquals: make sure to define comparison value')
    }

    return args
  },
  validate: (data, field, [comparisonValue]: [any]) => {
    const fieldValue = data[field]

    // tslint:disable-next-line:triple-equals
    return skippable(fieldValue) || comparisonValue != fieldValue
  },
}

export { validation as default }
