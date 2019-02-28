import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import same from '../raw/same'

/**
 * Ensures a field value as confirmed using a `_confirmation` convention. This is
 * mainly used for password confirmation field.
 *
 * For example: If the password field name is `password`, then another field called
 * `password_confirmation` must exist and should have the same value as the actual
 * field.
 *
 * [source, js]
 * ----
 * const rules = {
 *   password: 'confirmed'
 * }
 *
 * // or
 * const rules = {
 *   password: [
 *     rule('confirmed')
 *   ]
 * }
 * ----
 */
export default (data, field, message, _args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !same(fieldValue, get(data, `${field}_confirmation`))) {
      return message
    }
  })
}
