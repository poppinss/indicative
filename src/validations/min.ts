import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'

/**
 * Ensures the length of a string or array is not is not less than
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
export default (data, field, message, args, get) => {
  return toPromise(() => {
    if (!args[0]) {
      throw new Error('min:make sure to define min length')
    }

    const fieldValue = get(data, field)
    const transformedValue = Array.isArray(fieldValue) ? fieldValue : String(fieldValue)

    if (!skippable(fieldValue) && transformedValue.length < args[0]) {
      return message
    }
  })
}
