import skippable from '../../lib/skippable'
import toPromise from '../../lib/toPromise'
import boolean from '../raw/boolean'

/**
 * Ensures the value of a field is a boolean. Also it will cast following
 * strings to their boolean counter parts.
 *
 * - `'0'` will become `0`
 * - `'1'` will become `1`
 * - `'true'` will become `true`
 * - `'false'` will become `false`
 *
 * [source, js]
 * ----
 * const rules = {
 *   remember_me: 'boolean'
 * }
 *
 * // or
 * const rules = {
 *   remember_me: [
 *     rule('boolean')
 *   ]
 * }
 * ----
 */
export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !boolean(fieldValue, false)) {
      return message
    }
  })
}
