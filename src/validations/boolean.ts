import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import isBoolean from '../raw/boolean'
import { ValidationFn } from '../contracts'

/**
 * Ensures the value of a field is a boolean. Also it will cast following
 * strings to their boolean counter parts.
 *
 * [source, plain]
 * ----
 * '0' -> 0
 * '1' -> 1
 * 'true' -> true
 * 'false' -> false
 * ----
 *
 * [source, js]
 * ----
 * const rules = {
 *   remember_me: 'boolean'
 * }
 *
 * // or
 * const rules = {
 *   remember_me: [
 *     rule('boolean')
 *   ]
 * }
 * ----
 */
const boolean: ValidationFn = (data, field, message, _args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !isBoolean(fieldValue, false)) {
      return message
    }
  })
}

export { boolean as default }
