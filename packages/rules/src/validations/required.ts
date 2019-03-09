import { empty } from '../raw/empty'
import { ValidationNode } from 'indicative-compiler'

/**
 * Ensures the value of field under validation is not empty. All of the following
 * values will be considered empty.
 *
 * [ul-shrinked]
 * - An empty Object `{}`
 * - Empty Array `[]`
 * - Empty string, `null` or `undefined`
 *
 * [source, js]
 * ----
 * const rules = {
 *   username: 'required'
 * }
 *
 * // or
 * const rules = {
 *   username: [
 *     rule('required')
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  validate: (data, field) => {
    return !empty(data[field])
  },
}

export { validation as default }
