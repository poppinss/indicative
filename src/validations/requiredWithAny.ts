import toPromise from '../../lib/toPromise'
import empty from '../raw/empty'
import existy from '../raw/existy'
import { ValidationFn } from '../contracts'

/**
 * Ensures the field is required when any of the other fields have non-empty values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   password: 'required_with_any:username,email'
 * }
 *
 * // or
 * const rules = {
 *   password: [
 *     rule('required_with_any', ['username', 'email'])
 *   ]
 * }
 * ----
 */
const requiredWithAny: ValidationFn = (data, field, message, args: string[], get) => {
  return toPromise(() => {
    const hasAnyField = args.some((item) => existy(get(data, item)))
    if (hasAnyField && empty(get(data, field))) {
      return message
    }
  })
}

export { requiredWithAny as default }
