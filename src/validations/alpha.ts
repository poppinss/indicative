import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import isAlpha from '../raw/alpha'
import { ValidationFn } from '../contracts'

/**
 * Makes sure the field under validation is alpha only. The regex used is `/^[a-z]+$/i`.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'alpha'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('alpha')
 *   ]
 * }
 * ----
 */
const alpha: ValidationFn = (data, field, message, _args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !isAlpha(fieldValue)) {
      return message
    }
  })
}

export { alpha as default }
