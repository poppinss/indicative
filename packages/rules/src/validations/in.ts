import { skippable } from '../utils'

import { inArray } from '../raw/inArray'
import { ValidationNode } from 'indicative-compiler'

/**
 * Ensures the value of a given field matches one of expected values.
 *
 * [source, js]
 * ----
 * const rules = {
 *   post_type: 'in:draft,published'
 * }
 *
 * // or
 * const rules = {
 *   post_type: [
 *     rule('in', ['draft', 'published'])
 *   ]
 * }
 * ----
 */
const validation: ValidationNode = {
  async: false,
  compile (args): any[] {
    if (!args || !args.length) {
      throw new Error('in: make sure to define search collection')
    }

    return args
  },
  validate: (data, field, args) => {
    const fieldValue = data[field]
    return skippable(fieldValue) || inArray(fieldValue, args)
  },
}

export { validation as default }
