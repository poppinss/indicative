import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'

/**
 * Ensure the value is a valid array. Also this validation will never
 * validate the size of array.
 *
 * [source, js]
 * ----
 * const rules = {
 *   whiteListedUrls: 'array'
 * }
 *
 * // or
 * const rules = {
 *   whiteListedUrls: [
 *     rule('array')
 *   ]
 * }
 * ----
 */
export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !Array.isArray(fieldValue)) {
      return message
    }
  })
}
