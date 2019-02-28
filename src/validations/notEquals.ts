import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'

/**
 * Makes sure that the value of field under validation is not
 * same as the defined value.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'not_equals:root'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('not_equals', 'root')
 *   ]
 * }
 * ----
 */
export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)

    // tslint:disable-next-line:triple-equals
    if (!skippable(fieldValue) && args[0] && args[0] == fieldValue) {
      return message
    }
  })
}
