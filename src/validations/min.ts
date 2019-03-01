import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'
import { ValidationFn, ArgComparison } from '../contracts'

/**
 * Ensures the length of a string or array is not is not less than
 * the expected length
 *
 * [source, js]
 * ----
 * const rules = {
 *   password: 'min:6'
 * }
 *
 * // or
 * const rules = {
 *   password: [
 *     rule('min', 6)
 *   ]
 * }
 * ----
 */
const min: ValidationFn = (data, field, message, [minValue]: ArgComparison, get) => {
  return toPromise(() => {
    if (!minValue) {
      throw new Error('min:make sure to define min length')
    }

    const fieldValue = get(data, field)
    const transformedValue = Array.isArray(fieldValue) ? fieldValue : String(fieldValue)

    if (!skippable(fieldValue) && transformedValue.length < Number(minValue)) {
      return message
    }
  })
}

export { min as default }
