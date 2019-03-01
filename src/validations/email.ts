import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import isEmail from '../raw/email'
import { ValidationFn } from '../contracts'

/**
 * Ensures the field under validation is a valid email format.
 *
 * NOTE: This validation never checks for the existence of the email address.
 *
 * [source, js]
 * ----
 * const rules = {
 *   email: 'email'
 * }
 *
 * // or
 * const rules = {
 *   email: [
 *     rule('email')
 *   ]
 * }
 * ----
 */
const email: ValidationFn = (data, field, message, _args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !isEmail(fieldValue)) {
      return message
    }
  })
}

export { email as default }
