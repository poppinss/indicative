
import { skippable } from '../utils'
import { before } from '../raw/before'
import { ArgComparisonDate } from '../contracts'
import { ValidationNode } from 'indicative-compiler'

/**
 * Ensures the value of field under validation is before a given
 * date.
 *
 * This method will import link:https://date-fns.org/v1.29.0/docs/isBefore[isBefore] method from date-fns.
 *
 * [source, js]
 * ----
 * const rules = {
 *   confCall: 'before:2018-11-20'
 * }
 *
 * // or
 * const rules = {
 *   confCall: [
 *     rule('before', new Date().setDate(new Date().getMonth() + 12))
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args: any[]): any[] {
    if (!args || !args.length) {
      throw new Error('before: make sure to define the before date')
    }

    return args
  },
  validate: (data, field, [beforeDate]: ArgComparisonDate) => {
    const fieldValue = data[field]
    return skippable(fieldValue) || before(fieldValue, beforeDate)
  },
}

export { validation as default }
