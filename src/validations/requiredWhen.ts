import toPromise from '../../lib/toPromise'
import empty from '../raw/empty'
import { ValidationFn } from '../contracts'

/**
 * The field is checked for required validation, when expected field value is same
 * as the expected value.
 *
 * `{}`, `[]`, `''`, `null`, `undefined` are considered as empty values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   state: 'required_when:country,US'
 * }
 *
 * // or
 * const rules = {
 *   state: [
 *     rule('required_when', ['country', 'US'])
 *   ]
 * }
 * ----
 */
const requiredWhen: ValidationFn = (data, field, message, [otherField, expectedValue]: [string, any], get) => {
  return toPromise(() => {
    const otherValue = get(data, otherField)

    // tslint:disable-next-line:triple-equals
    if (expectedValue == otherValue && empty(get(data, field))) {
      return message
    }
  })
}

export { requiredWhen as default }
