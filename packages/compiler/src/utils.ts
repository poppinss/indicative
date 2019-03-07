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

/**
 * Returns default error message at runtime. Another way is to have seperate
 * strings as default messages for each field and validation, but that
 * can be memory expensive and hence a function is a safe choice
 * here.
*/
export function defaultMessage (field, validation) {
  return `${validation} validation failed on ${field}`
}

/**
 * Adds error to the formatter by normalizing runtime
 * values.
 */
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

  /**
   * Build full path to the field inside the user data
   * object. In case of `arrayIndexes` and `paths`, we
   * need to build the path by looping over them
   */
  if (root.arrayPaths && root.arrayIndexes) {
    fullPath = root.arrayPaths.map((path, index) => {
      return (path as any).concat([root.arrayIndexes![index]]).join('.')
    }).concat(dotPath).concat(field).join('.')
  } else {
    fullPath = dotPath.concat(field).join('.')
  }

  /**
   * If message is a function, then execute it, otherwise use
   * the message considering it as a string
   */
  if (typeof (message) === 'function') {
    compiledMessage = message(fullPath, rule.name, rule.args)
  } else {
    compiledMessage = message
  }

  formatter.addError(compiledMessage, fullPath, rule.name, rule.args)
}
