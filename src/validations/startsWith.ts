import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'
import { ValidationFn } from '../contracts'

/**
 * Ensure the value of field under validation starts with a certain substr. This
 * validation will also trim whitespaces before making the check
 *
 * [source, js]
 * ----
 * const rules = {
 *   phone_no: 'starts_with:99'
 * }
 *
 * // or
 * const rules = {
 *   phone_no: [
 *     rule('starts_with', '99')
 *   ]
 * }
 * ----
 */
const startsWith: ValidationFn = (data, field, message, [substring]: [string], get) => {
  return toPromise(() => {
    if (!substring) {
      throw new Error('startsWith:make sure to define the matching substring')
    }

    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && String(fieldValue).trim().substr(0, substring.length) !== substring) {
      return message
    }
  })
}

export { startsWith as default }
