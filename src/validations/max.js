import toPromise from '../../lib/toPromise'
import skippable from '../../lib/skippable'

/**
 * Ensures the length of a string is not greater than
 * the defined length.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'max:40'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('max', 40)
 *   ]
 * }
 * ----
 */
export default (data, field, message, [maxLength], get) => {
  return toPromise(() => {
    if (!maxLength) {
      throw new Error('max:make sure to define max length')
    }
    const fieldValue = get(data, field)

    if (!skippable(fieldValue) && String(fieldValue).length > maxLength) {
      return message
    }
  })
}
