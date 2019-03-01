import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'
import isAfter from '../raw/after'
import { ValidationFn, ArgComparisonDate } from '../contracts'

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
const after: ValidationFn = (data, field, message, [comparisonDate]: ArgComparisonDate, get) => {
  return toPromise(() => {
    if (!comparisonDate) {
      return new Error('after:make sure to define the after date')
    }

    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !isAfter(fieldValue, comparisonDate)) {
      return message
    }
  })
}

export { after as default }
