import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'
import { ValidationFn } from '../contracts'

/**
 * Ensures the value of field under validation contains a given substring.
 *
 * [source, js]
 * ----
 * const rules = {
 *   url: 'includes:adonisjs.com'
 * }
 *
 * // or
 * const rules = {
 *   url: [
 *     rule('includes', ['adonisjs.com'])
 *   ]
 * }
 * ----
 */
const includes: ValidationFn = (data, field, message, [substring]: [string], get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && String(fieldValue).indexOf(substring) === -1) {
      return message
    }
  })
}

export { includes as default }
