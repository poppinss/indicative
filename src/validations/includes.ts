import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'

/**
 * Ensures the value of field under validation contains a given substring.
 *
 * [source, js]
 * ----
 * const rules = {
 *   url: 'includes:adonisjs.com'
 * }
 *
 * // or
 * const rules = {
 *   url: [
 *     rule('includes', ['adonisjs.com'])
 *   ]
 * }
 * ----
 */
export default (data, field, message, args, get) => {
  return toPromise(() => {
    const substring = args[0]

    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && String(fieldValue).indexOf(substring) === -1) {
      return message
    }
  })
}
