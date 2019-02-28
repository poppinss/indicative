import toPromise from '../../lib/toPromise'
import empty from '../raw/empty'

/**
 * Ensures the value of field under validation is not empty. All of the following
 * values will be considered empty.
 *
 * [ul-shrinked]
 * - An empty Object `{}`
 * - Empty Array `[]`
 * - Empty string, `null` or `undefined`
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
export default (data, field, message, _args, get) => {
  return toPromise(() => {
    if (empty(get(data, field))) {
      return message
    }
  })
}
