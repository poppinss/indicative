import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'
import isDate from '../raw/date'
import { ValidationFn } from '../contracts'

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
const date: ValidationFn = (data, field, message, _args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !isDate(fieldValue, false)) {
      return message
    }
  })
}

export { date as default }
