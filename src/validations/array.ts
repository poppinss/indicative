import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import { ValidationFn } from '../contracts'

/**
 * Ensure the value is a valid array. Also this validation will never
 * validate the size of array.
 *
 * [source, js]
 * ----
 * const rules = {
 *   whiteListedUrls: 'array'
 * }
 *
 * // or
 * const rules = {
 *   whiteListedUrls: [
 *     rule('array')
 *   ]
 * }
 * ----
 */
const array: ValidationFn = (data, field, message, _args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !Array.isArray(fieldValue)) {
      return message
    }
  })
}

export { array as default }
