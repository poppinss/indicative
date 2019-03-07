/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { DataRoot, IndicativeFormatter } from './Contracts'
import { MessageNode, ParsedRule } from 'indicative-parser'

/**
 * Returns nested value from an object based on nested paths. The `pathsSize`
 * must be pre-computed for speed. There are better implementation of dotProps
 * like `lodash.get` but it is optimized for speed and doesn't handle weird
 * edge cases like `array indexes`.
 */
export function dotProp (value: any, paths: string[], pathsSize: number): any {
  for (let i = 0; i < pathsSize; i++) {
    value = value[paths[i]] || null
    if (value === null) {
      break
    }
  }

  return value
}

export function addError (
  formatter: IndicativeFormatter,
  field: string,
  rule: ParsedRule,
  message: MessageNode | Error,
  dotPath: string[],
  root: DataRoot,
): void {
  let fullPath: string = ''
  let compiledMessage: string | Error = ''

  if (root.arrayIndexes && root.arrayPaths) {
    fullPath = root.arrayPaths.map((p, i) => {
      return (p as any).concat([root.arrayIndexes![i]]).join('.')
    }).concat(dotPath).concat(field).join('.')
  } else {
    fullPath = `${dotPath.concat(field).join('.')}`
  }

  if (typeof (message) === 'function') {
    compiledMessage = message(fullPath, rule.name, rule.args)
  } else {
    compiledMessage = message
  }

  formatter.addError(compiledMessage, fullPath, rule.name, rule.args)
}
