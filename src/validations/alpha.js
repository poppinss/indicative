import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import alpha from '../raw/alpha'

/**
 * Makes sure the field under validation is alpha only. The regex used is `/^[a-z]+$/i`.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'alpha'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('alpha')
 *   ]
 * }
 * ----
 */
export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !alpha(fieldValue)) {
      return message
    }
  })
}
