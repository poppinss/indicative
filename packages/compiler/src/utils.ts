/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Message, ParsedRule, ParsedMessages } from 'indicative-parser'
import { DataRoot, FormatterContract } from './Contracts/ValidationCompiler'

/**
 * Returns nested value from an object based on nested paths. The `pathsSize`
 * must be pre-computed for speed. There are better implementation of dotProps
 * like `lodash.get` but this method optimized for speed and doesn't handle
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
 * can be memory expensive and hence a function is a better choice
 * here.
*/
export function defaultMessage (field: string, validation: string): string {
  return `${validation} validation failed on ${field}`
}

/**
 * Reports error to the formatter. The method does some extra work
 * of properly constructing the full path to the field in the
 * data object
 */
export function reportError (
  formatter: FormatterContract,
  field: string,
  rule: ParsedRule,
  message: Message | Error,
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

/**
 * Returns data tip for the dotPath. If tip is not valid object, then null
 * is returned
 */
export function isObject (data: any) {
  return data && data.constructor === Object
}

/**
 * Returns a boolean telling if value is array or not
 */
export function isArray (data: any) {
  return data && Array.isArray(data)
}

/**
 * Returns an array of items for a given index from an array. The objective
 * is to always return an array, regardless of index being a specific
 * value like `0`, `1` or a wildcard like `*`
 */
export function getItemsForIndex (collection: any[], index: string): any[] {
  if (index === '*') {
    return collection
  }

  if (collection[index]) {
    return [collection[index]]
  }

  return []
}

/**
 * Returns the message for a given path, field and rule. If
 * no custom message is found, then default message is
 * used.
 */
export function getMessageFromPath (
  { fields: fieldsMessages, rules: rulesMessages }: ParsedMessages,
  field: string,
  rule: ParsedRule,
  basePath: string[],
): Message {
  const messagePath = field === '*' ? basePath.join('.') : basePath.concat([field]).join('.')
  let message: Message = defaultMessage

  if (fieldsMessages[messagePath] && fieldsMessages[messagePath][rule.name]) {
    message = fieldsMessages[messagePath][rule.name]
  } else if (rulesMessages[rule.name]) {
    message = rulesMessages[rule.name]
  }

  return message
}
