import { skippable } from '../utils'
import { isNumber } from '../raw/isNumber'
import { ValidationNode } from 'indicative-compiler'
import { config } from '../config'

/**
 * Makes sure that the value of field under validation is a valid
 * number. The validation will pass for floats too, since it uses `typeof` internally.
 *
 * For strict integers, you must use the link:integer[integer] rule.
 *
 * [source, js]
 * ----
 * const rules = {
 *   game_points: 'number'
 * }
 *
 * // or
 * const rules = {
 *   game_points: [
 *     rule('number')
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  validate: (data, field) => {
    const fieldValue = data[field]
    return skippable(fieldValue) || isNumber(fieldValue, !config.castValues)
  },
}

export { validation as default }
