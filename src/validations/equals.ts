import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'
import { ValidationFn } from '../contracts'

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
const equals: ValidationFn = (data, field, message, [comparisonValue]: [string], get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)

    // tslint:disable-next-line:triple-equals
    if (!skippable(fieldValue) && comparisonValue != fieldValue) {
      return message
    }
  })
}

export { equals as default }
