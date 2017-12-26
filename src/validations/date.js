import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'
import date from '../raw/date'

/**
 * Ensures the field under validation is a valid date. The value can be a
 * date object or a valid date string.
 *
 * If value is a string, it will be processed using `new Date(givenString)`.
 *
 * [source, js]
 * ----
 * const rules = {
 *   login_at: 'date'
 * }
 *
 * // or
 * const rules = {
 *   login_at: [
 *     rule('date')
 *   ]
 * }
 * ----
 */
export default (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !date(fieldValue, false)) {
      return message
    }
  })
}
