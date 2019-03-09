
import { skippable } from '../utils'
import { ValidationNode } from 'indicative-compiler'

/**
 * Ensures 2 values are lossely same. This validation will not check for the same type, but
 * instead checks for the same value.
 *
 * Since HTTP request data is always a string, it is better not to perform type checks on it.
 *
 * [source, js]
 * ----
 * const rules = {
 *   coupon: 'equals:5050'
 * }
 *
 * // or
 * const rules = {
 *   coupon: [
 *     rule('equals', 5050)
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('equals: make sure to define the comparison string')
    }

    return args
  },
  validate: (data, field, [comparisonValue]: [string]) => {
    const fieldValue = data[field]

    // tslint:disable-next-line:triple-equals
    return skippable(fieldValue) || comparisonValue == fieldValue
  },
}

export { validation as default }
