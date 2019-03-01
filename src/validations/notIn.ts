import skippable from '../core/skippable'
import toPromise from '../../lib/toPromise'
import inArray from '../raw/inArray'
import { ValidationFn } from '../contracts'

/**
 * Makes sure that the value of field under validation is not
 * from one of the defined values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'not_in:root,admin,super'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('not_in', ['root', 'admin', 'super'])
 *   ]
 * }
 * ----
 */
const notIn: ValidationFn = (data, field, message, args, get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && inArray(fieldValue, args)) {
      return message
    }
  })
}

export { notIn as default }
