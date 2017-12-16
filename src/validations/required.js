import toPromise from '../../lib/toPromise'
import empty from '../raw/empty'

/**
 * Ensures the value of field under validation is not empty.
 * `{}`, `[]`, `''`, `null`, `undefined` all will fail the required rule.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'required'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('required')
 *   ]
 * }
 * ----
 */
export default (data, field, message, args, get) => {
  return toPromise(() => {
    if (empty(get(data, field))) {
      return message
    }
  })
}
