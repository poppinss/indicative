import skippable from '../../lib/skippable'
import toPromise from '../../lib/toPromise'

/**
 * Ensures the value is a valid integer.
 *
 * [source, js]
 * ----
 * const rules = {
 *   age: 'integer'
 * }
 *
 * // or
 * const rules = {
 *   age: [
 *     rule('integer')
 *   ]
 * }
 * ----
 */
export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !Number.isInteger(fieldValue)) {
      return message
    }
  })
}
