import toPromise from '../../lib/toPromise'
import skippable from '../../lib/skippable'
import isAbove from '../raw/above'

/**
 * Makes sure the value provided by the end user is above the
 * expected value.
 *
 * This method will wrap both the values inside the `Number` function.
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: 'above:20'
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rule('above', 20)
 *   ]
 * }
 * ----
 */
export default (data, field, message, [minValue], get) => {
  return toPromise(() => {
    if (!minValue) {
      return new Error('above:make sure to define minValue')
    }

    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !isAbove(fieldValue, minValue)) {
      return message
    }
  })
}
