import toPromise from '../../lib/toPromise'
import skippable from '../../lib/skippable'
import before from '../raw/before'

/**
 * Ensures the value of field under validation is before a given
 * date.
 *
 * This method will import link:https://date-fns.org/v1.29.0/docs/isBefore[isBefore] method from date-fns.
 *
 * [source, js]
 * ----
 * const rules = {
 *   confCall: 'before:2018-11-20'
 * }
 *
 * // or
 * const rules = {
 *   confCall: [
 *     rule('before', new Date().setDate(new Date().getMonth() + 12))
 *   ]
 * }
 * ----
 */
export default (data, field, message, [beforeDate], get) => {
  return toPromise(() => {
    if (!beforeDate) {
      return new Error('before:make sure to define the before date')
    }

    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !before(fieldValue, beforeDate)) {
      return message
    }
  })
}
