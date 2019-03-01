import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import isAlphaNumeric from '../raw/alphaNumeric'
import { ValidationFn } from '../contracts'

/**
 * Makes sure the field under validation is alpha numeric only.
 * The regex used is `/^[a-z0-9]+$/i`.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'alpha_numeric'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('alpha_numeric')
 *   ]
 * }
 * ----
 */
const alphaNumeric: ValidationFn = (data, field, message, _args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !isAlphaNumeric(fieldValue)) {
      return message
    }
  })
}

export { alphaNumeric as default }
