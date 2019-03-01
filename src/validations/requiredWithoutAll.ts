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
 *   zipcode: 'required_without_all:address,state'
 * }
 *
 * // or
 * const rules = {
 *   zipcode: [
 *     rule('required_without_all', ['address', 'state'])
 *   ]
 * }
 * ----
 */
const requiredWithoutAll: ValidationFn = (data, field, message, args: string[], get) => {
  return toPromise(() => {
    const hasAnyField = args.some((item) => existy(get(data, item)))
    if (!hasAnyField && empty(get(data, field))) {
      return message
    }
  })
}

export { requiredWithoutAll as default }
