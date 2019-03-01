import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'
import { ValidationFn } from '../contracts'

/**
 * Ensure the value of field under validation ends with a certain substr. This
 * validation will also trim whitespaces before making the check
 *
 * [source, js]
 * ----
 * const rules = {
 *   reg_no: 'ends_with:qaw'
 * }
 *
 * // or
 * const rules = {
 *   reg_no: [
 *     rule('ends_with', 'qaw')
 *   ]
 * }
 * ----
 */
const endsWith: ValidationFn = (data, field, message, [substring]: [string], get) => {
  return toPromise(() => {
    if (!substring) {
      throw new Error('endsWith:make sure to define the matching substring')
    }

    const fieldValue = get(data, field)
    if (!skippable(fieldValue) && String(fieldValue).trim().substr(-substring.length) !== String(substring)) {
      return message
    }
  })
}

export { endsWith as default }
