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
  MessageNode,
  Messages,
  ParsedMessagesNode,
} from './contracts'

/**
 * Sets the literal node to the source object for the given key. Rules
 * are patched on existing nodes as well
 */
function setLiteral (
  source: ParsedSchema,
  key: string,
  rhs: ParsedRule[] | ParsedMessagesNode,
): SchemaNodeLiteral {
  const item = (source[key] || { type: 'literal' }) as SchemaNodeLiteral
  item.rhs = rhs
  source[key] = item
  return item
}

/**
 * Sets the object node to the source object for the given key. `type`
 * is patched on existing nodes as well
 */
function setObject (source: ParsedSchema, key: string, forMessage: boolean): SchemaNodeObject {
  if (source[key] && source[key].type === 'array') {
    throw new Error(`cannot reshape ${key} array to an object`)
  }

  const item = (source[key] || { rhs: forMessage ? {} : [] }) as SchemaNodeObject
  item.type = 'object'
  item.children = item.children || {}
  source[key] = item
  return item
}

/**
 * Sets the array node to the source object for the given key. `type`
 * and `each` properties are patched on existing nodes as well.
 */
function setArray (source: ParsedSchema, key: string, index: string, forMessage: boolean): SchemaNodeArray {
  if (source[key] && source[key].type === 'object') {
    throw new Error(`cannot reshape ${key} object to an array`)
  }

  const item = (source[key] || { rhs: forMessage ? {} : [] }) as SchemaNodeArray
  item.type = 'array'
  item.each = item.each || {}
  item.each[index] = item.each[index] || { children: {}, rhs: forMessage ? {} : [] }
  source[key] = item
  return item
}

/**
 * Parses the field tokens to form the tree
 */
function parseFieldForRules (
  tokens: string[],
  rhs: ParsedRule[],
  out: ParsedSchema | SchemaNodeArray,
  index = 0,
) {
  const token = tokens[index++]
  const isLast = tokens.length === index
  const isIndexedArray = /^\d+$/.test(tokens[index])
  const isArray = tokens[index] === '*' || isIndexedArray

  /**
   * Last item was an array
   */
  if (token === '*' || /^\d+$/.test(token)) {
    if (isLast) {
      (out as SchemaNodeArray).each[token].rhs = rhs
      return
    }
    return parseFieldForRules(tokens, rhs, (out as SchemaNodeArray).each[token].children, index)
  }

  /**
   * Last item in the list of tokens. we must
   * patch the rules here.
   */
  if (isLast) {
    setLiteral(out as ParsedSchema, token, rhs)
    return
  }

  /**
   * Current item as an array
   */
  if (isArray) {
    const item = setArray(out as ParsedSchema, token, isIndexedArray ? tokens[index] : '*', false)
    return parseFieldForRules(tokens, rhs, item, index)
  }

  /**
   * Falling back to object
   */
  const item = setObject(out as ParsedSchema, token, false)
  return parseFieldForRules(tokens, rhs, item.children, index)
}

/**
 * Parses the field tokens for messages to form the tree
 */
function parseFieldForMessage (
  tokens: string[],
  rhs: MessageNode,
  out: SchemaNodeArray | {
    [field: string]: SchemaNodeArray | SchemaNodeLiteral | SchemaNodeObject,
  },
  index = 0,
) {
  const token = tokens[index++]
  const isLast = tokens.length === (index + 1)
  const isIndexedArray = /^\d+$/.test(tokens[index])
  const isArray = tokens[index] === '*' || isIndexedArray

  /**
   * Last item was an array
   */
  if (token === '*' || /^\d+$/.test(token)) {
    if (isLast) {
      (out as SchemaNodeArray).each[token].rhs = {
        [tokens[index]]: rhs,
      }
      return
    }
    return parseFieldForMessage(tokens, rhs, (out as SchemaNodeArray).each[token].children, index)
  }

  /**
   * Last item in the list of tokens. we must
   * patch the rules here.
   */
  if (isLast) {
    setLiteral(out as ParsedSchema, token, {
      [tokens[index]]: rhs,
    })
    return
  }

  /**
   * Current item as an array
   */
  if (isArray) {
    const item = setArray(out as ParsedSchema, token, isIndexedArray ? tokens[index] : '*', true)
    return parseFieldForMessage(tokens, rhs, item, index)
  }

  /**
   * Falling back to object
   */
  const item = setObject(out as ParsedSchema, token, true)
  return parseFieldForMessage(tokens, rhs, item.children, index)
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
 *    rhs: [],
 *    each: {
 *      '*': {
 *        rhs: [],
 *        children: {
 *          username: {
 *            type: 'literal',
 *            rhs: [{
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
 *    rhs: {},
 *    each: {
 *      '*': {
 *        rhs: {},
 *        children: {
 *          username: {
 *            type: 'literal',
 *            rhs: {
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

      if (tokens.length === 1) {
        result.rules = { [field]: message }
        return result
      }

      parseFieldForMessage(tokens, message, result.named)
      return result
    }, { rules: {}, named: {} })
}

/**
 * Returns parsed rule node
 */
export function rule (name: string, args: any | any[]): ParsedRule {
  return { name, args: Array.isArray(args) ? args : [args] }
}
