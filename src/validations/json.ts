import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import isJson from '../raw/json'
import { ValidationFn } from '../contracts'

/**
 * Ensures the value of field under validation is safe to be parsed
 * using `JSON.parse` method.
 *
 * [source, js]
 * ----
 * const rules = {
 *   payload: 'json'
 * }
 *
 * // or
 * const rules = {
 *   payload: [
 *     rule('json')
 *   ]
 * }
 * ----
 */
const json: ValidationFn = (data, field, message, _args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)

    if (!skippable(fieldValue) && !isJson(fieldValue)) {
      return message
    }
  })
}

export { json as default }
