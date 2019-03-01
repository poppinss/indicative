'use strict'

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { validator } from './src/core/validator'
import { sanitizor } from './src/core/sanitizor'
import * as validations from './src/validations'
import * as sanitizations from './src/sanitizations'
import * as raw from './src/raw'
import * as formatters from './src/formatters'
import { rule } from './src/core/rule'
import { configure } from './src/core/configure'
import { config } from './src/core/config'
import { IndicativeFormatterConstructor, DataNode, RulesNode, MessagesNode } from './src/contracts'

export function validate <T extends DataNode> (
  data: T,
  fields: RulesNode,
  messages?: MessagesNode,
  formatter?: IndicativeFormatterConstructor,
): Promise<T> {
  return validator(validations, config.FORMATTER || formatters.Vanilla)
    .validate<T>(data, fields, messages, formatter)
}

export function validateAll (
  data: DataNode,
  fields: RulesNode,
  messages?: MessagesNode,
  formatter?: IndicativeFormatterConstructor,
) {
  return validator(validations, config.FORMATTER || formatters.Vanilla)
    .validateAll(data, fields, messages, formatter)
}

export function sanitize (data, fields) {
  return sanitizor(sanitizations).sanitize(data, fields)
}

export { raw as is }
export { sanitizations as sanitizor }
export { validations }
export { rule }
export { formatters }
export { configure }
