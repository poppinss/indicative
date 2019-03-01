import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import isObject from '../raw/isObject'
import { ValidationFn } from '../contracts'

/**
 * Ensures the value of field under validation is a valid Javascript
 * object.
 *
 * The validation will fail for `Arrays`, though they are objects too in Javascript.
 *
 * [source, js]
 * ----
 * const rules = {
 *   user: 'object'
 * }
 *
 * // or
 * const rules = {
 *   user: [
 *     rule('object')
 *   ]
 * }
 * ----
 */
const obj: ValidationFn = (data, field, message, _args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && !isObject(fieldValue)) {
      return message
    }
  })
}

export { obj as default }
