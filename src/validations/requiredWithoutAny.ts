import toPromise from '../../lib/toPromise'
import empty from '../raw/empty'
import existy from '../raw/existy'
import { ValidationFn } from '../contracts'

/**
 * Ensures the field is required when all of the other fields has empty values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   email: 'required_without_any:username,account_id'
 * }
 *
 * // or
 * const rules = {
 *   email: [
 *     rule('required_without_any', ['username', 'account_id'])
 *   ]
 * }
 * ----
 */
const requiredWithoutAny: ValidationFn = (data, field, message, args: string[], get) => {
  return toPromise(() => {
    const hasAnyField = args.some((item) => !existy(get(data, item)))
    if (hasAnyField && empty(get(data, field))) {
      return message
    }
  })
}

export { requiredWithoutAny as default }
