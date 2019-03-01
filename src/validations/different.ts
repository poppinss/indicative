import toPromise from '../../lib/toPromise'
import skippable from '../core/skippable'
import { ValidationFn } from '../contracts'

/**
 * Ensures the value of the field under validation is always different from
 * the targeted field value.
 *
 * [source, js]
 * ----
 * const rules = {
 *   secondary_email: 'different:primary_email'
 * }
 *
 * // or
 * const rules = {
 *   secondary_email: [
 *     rule('different', 'primary_email')
 *   ]
 * }
 * ----
 */
const different: ValidationFn = (data, field, message, [targetedField]: [string], get) => {
  return toPromise(() => {
    if (!targetedField) {
      throw new Error('different:make sure to define target field for comparison')
    }

    const fieldValue = get(data, field)
    const targetedFieldValue = get(data, targetedField)
    if (!skippable(fieldValue) && targetedFieldValue && targetedFieldValue === fieldValue) {
      return message
    }
  })
}

export { different as default }
