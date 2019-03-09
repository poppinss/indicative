
import { isString } from '../raw/isString'
import { subset } from '../raw/subset'
import { skippable } from '../utils'
import { ValidationNode } from 'indicative-compiler'

/**
 * Ensures the value of a given field is a
 * subset of expected values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   include: 'subset:foo,bar,baz'
 * }
 *
 * // or
 * const rules = {
 *   include: [
 *     rule('subset', ['foo', 'bar', 'baz'])
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('subset: make sure to define subset collection')
    }

    return args
  },
  validate: (data, field, args) => {
    let fieldValue = data[field]

    if (isString(fieldValue)) {
      fieldValue = fieldValue.split(',').map((val: string) => val.trim())
    }

    return skippable(fieldValue) || subset(fieldValue, args)
  },
}

export { validation as default }
