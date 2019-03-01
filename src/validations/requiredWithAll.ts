import toPromise from '../../lib/toPromise'
import empty from '../raw/empty'
import existy from '../raw/existy'
import { ValidationFn } from '../contracts'

/**
 * Ensures the field is required when all other fields have non-empty values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   tax_id: 'required_with_all:car,house'
 * }
 *
 * // or
 * const rules = {
 *   tax_id: [
 *     rule('required_with_all', ['car', 'house'])
 *   ]
 * }
 * ----
 */
const requiredWithAll: ValidationFn = (data, field, message, args: string[], get) => {
  return toPromise(() => {
    const missingAnyField = args.some((item) => !existy(get(data, item)))
    if (!missingAnyField && empty(get(data, field))) {
      return message
    }
  })
}

export { requiredWithAll as default }
