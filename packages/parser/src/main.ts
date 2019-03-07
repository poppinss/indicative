/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as Pipe from 'haye/dist/haye-pipe'
import * as ArrayPresenter from 'haye/dist/haye-array-presenter'

import {
  Schema,
  ParsedSchema,
  ParsedRule,
  SchemaNodeLiteral,
  SchemaNodeArray,
  SchemaNodeObject,
  ParsedMessages,
  Messages,
} from './contracts'

/**
 * Updates `messages` or `rules` property on the input tree based
 * upon it's shape
 */
function setLiteral (source: ParsedSchema, key: string, rhs: ParsedRule[]): SchemaNodeLiteral {
  const item = (source[key] || { type: 'literal' }) as SchemaNodeLiteral
  item.rules = rhs as ParsedRule[]

  source[key] = item
  return item
}

/**
 * Update node `type=object`
 */
function setObject (source: ParsedSchema, key: string): SchemaNodeObject {
  if (source[key] && source[key].type === 'array') {
    throw new Error(`cannot reshape ${key} array to an object`)
  }

  const item = (source[key] || { rules: [] }) as SchemaNodeObject
  item.type = 'object'
  item.children = item.children || {}

  source[key] = item
  return item
}

/**
 * Sets the array node to the source object for the given key. `type`
 * and `each` properties are patched on existing nodes as well.
 */
function setArray (source: ParsedSchema, key: string, index: string): SchemaNodeArray {
  if (source[key] && source[key].type === 'object') {
    throw new Error(`cannot reshape ${key} object to an array`)
  }

  const item = (source[key] || { rules: [] }) as SchemaNodeArray
  item.each = item.each || {}
  item.each[index] = item.each[index] || { children: {}, rules: [] }
  item.type = 'array'

  source[key] = item
  return item
}

/**
 * Parses field tokens recursively to a [[ParsedSchema]] tree
 */
function parseFieldForRules (
  tokens: string[],
  rules: ParsedRule[],
  out: ParsedSchema | SchemaNodeArray,
  index = 0,
) {
  const token = tokens[index++]

  /**
   * Finding if we are on the last item. Last item defines
   * the rules for the current node inside the tree
   */
  const isLast = tokens.length === index

  /**
   * Indexed array have `digits` like `users.0.username`
   */
  const isIndexedArray = /^\d+$/.test(tokens[index])

  /**
   * Is upcoming token an array
   */
  const isArray = tokens[index] === '*' || isIndexedArray

  /**
   * Last item was marked as array, since current token is a `*`
   * or has defined index
   */
  if (token === '*' || /^\d+$/.test(token)) {
    /**
     * Last item must update rules for each item for the array
     */
    if (isLast) {
      (out as SchemaNodeArray).each[token].rules = rules
      return
    }

    /**
     * Otherwise continue recursion
     */
    return parseFieldForRules(tokens, rules, (out as SchemaNodeArray).each[token].children, index)
  }

  /**
   * Last item in the list of tokens. we must
   * patch the rules here.
   */
  if (isLast) {
    setLiteral(out as ParsedSchema, token, rules)
    return
  }

  /**
   * Current item as an array
   */
  if (isArray) {
    const item = setArray(out as ParsedSchema, token, isIndexedArray ? tokens[index] : '*')
    return parseFieldForRules(tokens, rules, item, index)
  }

  /**
   * Falling back to object
   */
  const item = setObject(out as ParsedSchema, token)
  return parseFieldForRules(tokens, rules, item.children, index)
}

/**
 * Parses the schema object to a tree of parsed schema. The
 * output is optimized for executing validation rules.
 *
 * @example
 * ```
 * parser({
 *  'users.*.username': 'required'
 * })
 *
 * // output
 *
 * {
 *   users: {
 *    type: 'array',
 *    rules: [],
 *    each: {
 *      '*': {
 *        rules: [],
 *        children: {
 *          username: {
 *            type: 'literal',
 *            rules: [{
 *              name: 'required',
 *              args: []
 *            }]
 *          }
 *        }
 *      }
 *    }
 *   }
 * }
 * ```
 */
export function schemaParser (schema: Schema): ParsedSchema {
  return Object
    .keys(schema)
    .reduce((result: ParsedSchema, field: string) => {
      const rules = schema[field]
      let parsedRules: ParsedRule[] = []

      if (typeof (rules) === 'string') {
        parsedRules = new Pipe(rules, new ArrayPresenter())
      } else {
        parsedRules = rules
      }

      parseFieldForRules(field.split('.'), parsedRules, result)
      return result
    }, {})
}

/**
 * Parses an object of messages to a parsed schema tree. The output is
 * optimized for picking the message while iterating for the
 * schema tree.
 *
 * @example
 * ```
 * parser({
 *  'users.*.username.required': 'Username is required'
 * })
 *
 * // output
 *
 * {
 *   users: {
 *    type: 'array',
 *    messages: {},
 *    each: {
 *      '*': {
 *        messages: {},
 *        children: {
 *          username: {
 *            type: 'literal',
 *            messages: {
 *              required: 'Username is requried'
 *            }
 *          }
 *        }
 *      }
 *    }
 *   }
 * }
 */
export function messagesParser (schema: Messages): ParsedMessages {
  return Object
    .keys(schema)
    .reduce((result: ParsedMessages, field: string) => {
      const message = schema[field]
      const tokens = field.split('.')
      const rule = tokens.pop() as string

      /**
       * If token length is 1, then it is a plain rule vs `field.rule`
       */
      if (!tokens.length) {
        result.rules = { [rule]: message }
        return result
      }

      const qualifiedName = tokens.join('.')
      result.named[qualifiedName] = result.named[qualifiedName] || {}
      result.named[qualifiedName][rule] = message

      return result
    }, { named: {}, rules: {} })
}

/**
 * Returns parsed rule node
 */
export function rule (name: string, args: any | any[]): ParsedRule {
  return { name, args: Array.isArray(args) ? args : [args] }
}
