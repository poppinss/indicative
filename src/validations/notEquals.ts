import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'
import { ValidationFn } from '../contracts'

/**
 * Makes sure that the value of field under validation is not
 * same as the defined value.
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'not_equals:root'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('not_equals', 'root')
 *   ]
 * }
 * ----
 */
const notEquals: ValidationFn = (data, field, message, [comparisonValue]: [any], get) => {
  return toPromise(() => {
    const fieldValue = get(data, field)

    if (!comparisonValue) {
      throw new Error('rule:notEquals comparisonValue is required')
    }

    // tslint:disable-next-line:triple-equals
    if (!skippable(fieldValue) && comparisonValue == fieldValue) {
      return message
    }
  })
}

export { notEquals as default }
