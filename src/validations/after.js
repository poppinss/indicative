import toPromise from '../../lib/toPromise'
import skippable from '../../lib/skippable'
import after from '../raw/after'

/**
 * Ensures the value of the field is after the expected
 * date.
 *
 * This method will import link:https://date-fns.org/docs/isAfter[isAfter] function of date-fns.
 *
 * [source, js]
 * ----
 * const rules = {
 *   confCall: `after:`${new Date()}
 * }
 *
 * // or
 * const rules = {
 *   confCall: [
 *     rule('after', new Date())
 *   ]
 * }
 * ----
 */
export default (data, field, message, [afterDate], get) => {
  return toPromise(() => {
    if (!afterDate) {
      return new Error('after:make sure to define the after date')
    }

    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !after(fieldValue, afterDate)) {
      return message
    }
  })
}
