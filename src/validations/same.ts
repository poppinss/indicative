import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'
import existy from '../raw/existy'
import { ValidationFn } from '../contracts'

/**
 * Ensures the value of 2 fields are same.
 *
 * [source, js]
 * ----
 * const rules = {
 *   password_confirmation: 'same:password'
 * }
 *
 * // or
 * const rules = {
 *   password_confirmation: [
 *     rule('same', ['password'])
 *   ]
 * }
 * ----
 */
const same: ValidationFn = (data, field, message, args: [string], get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    const targetedFieldValue = get(data, args[0])

    if (!skippable(fieldValue) && existy(targetedFieldValue) && targetedFieldValue !== fieldValue) {
      return message
    }
  })
}

export { same as default }
