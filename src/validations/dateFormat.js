import toPromise from '../../lib/toPromise'
import skippable from '../../lib/skippable'
import dateFormat from '../raw/dateFormat'

/**
 * Ensures the date or date time is valid as the one of the defined formats.
 *
 * This method will import link:https://date-fns.org/v1.29.0/docs/format[format] method from dateFns.
 *
 * [source, js]
 * ----
 * // always use the rule method
 *
 * const rules = {
 *   publish_at: [
 *     rule('dateFormat', 'YYYY-MM-DD HH:mm:ss')
 *   ]
 * }
 * ----
 */
export default (data, field, message, args, get) => {
  return toPromise(() => {
    if (args.length === 0) {
      throw new Error('dateFormat:make sure to define atleast one date format')
    }

    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !dateFormat(fieldValue, args)) {
      return message
    }
  })
}
