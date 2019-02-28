import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'
import isString from '../raw/isString'

/**
 * Ensures the value is a string
 *
 * [source, js]
 * ----
 * const rules = {
 *   bio: 'string'
 * }
 *
 * // or
 * const rules = {
 *   password_confirmation: [
 *     rule('bio', 'string')
 *   ]
 * }
 * ----
 */
export default (data, field, message, _args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !isString(fieldValue)) {
      return message
    }
  })
}
