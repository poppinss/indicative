import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'
import { ValidationFn, ArgComparison } from '../contracts'

/**
 * Ensures the length of a string or array is not greater than
 * the defined length.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'max:40'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('max', 40)
 *   ]
 * }
 * ----
 */
const max: ValidationFn = (data, field, message, [maxValue]: ArgComparison, get) => {
  return toPromise(() => {
    if (!maxValue) {
      throw new Error('max:make sure to define max length')
    }

    const fieldValue = get(data, field)
    const transformedValue = Array.isArray(fieldValue) ? fieldValue : String(fieldValue)

    if (!skippable(fieldValue) && transformedValue.length > Number(maxValue)) {
      return message
    }
  })
}

export { max as default }
