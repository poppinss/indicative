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
  MessagesNodeArray,
  MessagesRulesMap,
  MessagesNodeObject,
  MessagesNodeLiteral,
} from './contracts'

/**
 * Sets literal value for [[SchemaNodeLiteral]] or [[MesssagesNodeLiteral]]
 * based upon the `forMessage` param.
 */
function setLiteral (
  source: ParsedSchema,
  key: string,
  rhs: ParsedRule[],
  forMessage: false,
): SchemaNodeLiteral

function setLiteral (
  source: ParsedMessages,
  key: string,
  rhs: MessagesRulesMap,
  forMessage: true,
): MessagesNodeLiteral

function setLiteral (
  source: ParsedSchema | ParsedMessages,
  key: string,
  rhs: ParsedRule[] | MessagesRulesMap,
  forMessage: boolean,
): SchemaNodeLiteral | MessagesNodeLiteral {
  if (forMessage) {
    const item = (source[key] || { type: 'literal' }) as MessagesNodeLiteral
    item.messages = rhs as MessagesRulesMap
    source[key] = item
    return item
  }

  const item = (source[key] || { type: 'literal' }) as SchemaNodeLiteral
  item.rules = rhs as ParsedRule[]
  source[key] = item
  return item
}

/**
 * Sets the object node to the source object for the given key. `type`
 * is patched on existing nodes as well
 */
function setObject (source: ParsedSchema, key: string, forMessage: false): SchemaNodeObject
function setObject (source: ParsedMessages, key: string, forMessage: true): MessagesNodeObject
function setObject (
  source: ParsedSchema | ParsedMessages,
  key: string,
  forMessage: boolean,
): SchemaNodeObject | MessagesNodeObject {
  if (source[key] && source[key].type === 'array') {
    throw new Error(`cannot reshape ${key} array to an object`)
  }

  if (forMessage) {
    const item = (source[key] || { messages: {} }) as MessagesNodeObject
    item.type = 'object'
    item.children = item.children || {}
    source[key] = item
    return item
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
function setArray (source: ParsedSchema, key: string, index: string, forMessage: false): SchemaNodeArray
function setArray (source: ParsedMessages, key: string, index: string, forMessage: true): MessagesNodeArray
function setArray (
  source: ParsedSchema | ParsedMessages,
  key: string,
  index: string,
  forMessage: boolean,
): SchemaNodeArray | MessagesNodeArray {
  if (source[key] && source[key].type === 'object') {
    throw new Error(`cannot reshape ${key} object to an array`)
  }

  if (forMessage) {
    const item = (source[key] || { messages: {} }) as MessagesNodeArray
    item.type = 'array'
    item.each = item.each || {}
    item.each[index] = item.each[index] || { children: {}, messages: {} }
    source[key] = item
    return item
  }

  const item = (source[key] || { rules: [] }) as SchemaNodeArray
  item.type = 'array'
  item.each = item.each || {}
  item.each[index] = item.each[index] || { children: {}, rules: [] }
  source[key] = item
  return item
}

/**
 * Parses the field tokens to form the tree
 */
function parseFieldForRules (
  tokens: string[],
  rules: ParsedRule[],
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
      (out as SchemaNodeArray).each[token].rules = rules
      return
    }
    return parseFieldForRules(tokens, rules, (out as SchemaNodeArray).each[token].children, index)
  }

  /**
   * Last item in the list of tokens. we must
   * patch the rules here.
   */
  if (isLast) {
    setLiteral(out as ParsedSchema, token, rules, false)
    return
  }

  /**
   * Current item as an array
   */
  if (isArray) {
    const item = setArray(out as ParsedSchema, token, isIndexedArray ? tokens[index] : '*', false)
    return parseFieldForRules(tokens, rules, item, index)
  }

  /**
   * Falling back to object
   */
  const item = setObject(out as ParsedSchema, token, false)
  return parseFieldForRules(tokens, rules, item.children, index)
}

/**
 * Parses the field tokens for messages to form the tree
 */
function parseFieldForMessage (
  tokens: string[],
  message: MessageNode,
  out: ParsedMessages | MessagesNodeArray,
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
      (out as MessagesNodeArray).each[token].messages = {
        [tokens[index]]: message,
      }
      return
    }
    return parseFieldForMessage(tokens, message, (out as MessagesNodeArray).each[token].children, index)
  }

  /**
   * Last item in the list of tokens. we must
   * patch the rules here.
   */
  if (isLast) {
    setLiteral(out as ParsedMessages, token, { [tokens[index]]: message }, true)
    return
  }

  /**
   * Current item as an array
   */
  if (isArray) {
    const item = setArray(out as ParsedMessages, token, isIndexedArray ? tokens[index] : '*', true)
    return parseFieldForMessage(tokens, message, item, index)
  }

  /**
   * Falling back to object
   */
  const item = setObject(out as ParsedMessages, token, true)
  return parseFieldForMessage(tokens, message, item.children, index)
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
export function messagesParser (schema: Messages): { named: ParsedMessages, rules: MessagesRulesMap } {
  return Object
    .keys(schema)
    .reduce((result: { named: ParsedMessages, rules: MessagesRulesMap }, field: string) => {
      const message = schema[field]
      const tokens = field.split('.')

      if (tokens.length === 1) {
        result.rules = { [field]: message }
        return result
      }

      parseFieldForMessage(tokens, message, result.named)
      return result
    }, { named: {}, rules: {} })
}

/**
 * Returns parsed rule node
 */
export function rule (name: string, args: any | any[]): ParsedRule {
  return { name, args: Array.isArray(args) ? args : [args] }
}
