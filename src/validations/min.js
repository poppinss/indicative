import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'

/**
 * Ensures the length of a string is not is not less than
 * the expected length
 *
 * [source, js]
 * ----
 * const rules = {
 *   password: 'min:6'
 * }
 *
 * // or
 * const rules = {
 *   password: [
 *     rule('min', 6)
 *   ]
 * }
 * ----
 */
export default (data, field, message, [minLength], get) => {
  return toPromise(() => {
    if (!minLength) {
      throw new Error('min:make sure to define min length')
    }

    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && String(fieldValue).length < minLength) {
      return message
    }
  })
}
