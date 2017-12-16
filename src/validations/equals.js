import toPromise from '../../lib/toPromise'
import skippable from '../../lib/skippable'

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
export default (data, field, message, args, get) => {
  const targetedValue = args[0]
  return toPromise(() => {
    const fieldValue = get(data, field)

    if (!skippable(fieldValue) && targetedValue != fieldValue) { // eslint-disable-line eqeqeq
      return message
    }
  })
}
