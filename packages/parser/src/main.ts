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
  ParsedNamedMessages,
  ParsedMessages,
  MessageNode,
  Messages,
  MessagesNodeArray,
  MessagesRulesMap,
  MessagesNodeObject,
  MessagesNodeLiteral,
} from './contracts'

/**
 * Overload for rules schema
 */
function setLiteral (
  source: ParsedSchema,
  key: string,
  rhs: ParsedRule[],
  forMessage: false,
): SchemaNodeLiteral

/**
 * Overload for messages schema
 */
function setLiteral (
  source: ParsedNamedMessages,
  key: string,
  rhs: MessagesRulesMap,
  forMessage: true,
): MessagesNodeLiteral

/**
 * Updates `messages` or `rules` property on the input tree based
 * upon it's shape
 */
function setLiteral (
  source: ParsedSchema | ParsedNamedMessages,
  key: string,
  rhs: ParsedRule[] | MessagesRulesMap,
  forMessage: boolean,
): SchemaNodeLiteral | MessagesNodeLiteral {
  let item = (source[key] || { type: 'literal' })

  if (forMessage) {
    item = item as MessagesNodeLiteral
    item.messages = rhs as MessagesRulesMap
  } else {
    item = item as SchemaNodeLiteral
    item.rules = rhs as ParsedRule[]
  }

  source[key] = item
  return item
}

/**
 * Overload for rules schema
 */
function setObject (source: ParsedSchema, key: string, forMessage: false): SchemaNodeObject

/**
 * Overload for messages schema
 */
function setObject (source: ParsedNamedMessages, key: string, forMessage: true): MessagesNodeObject

/**
 * Update node `type=object`
 */
function setObject (
  source: ParsedSchema | ParsedNamedMessages,
  key: string,
  forMessage: boolean,
): SchemaNodeObject | MessagesNodeObject {
  if (source[key] && source[key].type === 'array') {
    throw new Error(`cannot reshape ${key} array to an object`)
  }

  let item

  if (forMessage) {
    item = (source[key] || { messages: {} }) as MessagesNodeObject
  } else {
    item = (source[key] || { rules: [] }) as SchemaNodeObject
  }

  item.type = 'object'
  item.children = item.children || {}
  source[key] = item
  return item
}

/**
 * Overload for rules schema
 */
function setArray (source: ParsedSchema, key: string, index: string, forMessage: false): SchemaNodeArray

/**
 * Overload for messages schema
 */
function setArray (source: ParsedNamedMessages, key: string, index: string, forMessage: true): MessagesNodeArray

/**
 * Sets the array node to the source object for the given key. `type`
 * and `each` properties are patched on existing nodes as well.
 */
function setArray (
  source: ParsedSchema | ParsedNamedMessages,
  key: string,
  index: string,
  forMessage: boolean,
): SchemaNodeArray | MessagesNodeArray {
  if (source[key] && source[key].type === 'object') {
    throw new Error(`cannot reshape ${key} object to an array`)
  }

  let item

  if (forMessage) {
    item = (source[key] || { messages: {} }) as MessagesNodeArray
    item.each = item.each || {}
    item.each[index] = item.each[index] || { children: {}, messages: {} }
  } else {
    item = (source[key] || { rules: [] }) as SchemaNodeArray
    item.each = item.each || {}
    item.each[index] = item.each[index] || { children: {}, rules: [] }
  }

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
  out: ParsedNamedMessages | MessagesNodeArray,
  index = 0,
) {
  const token = tokens[index++]

  /**
   * Finding if we are on the last item. We need to increment the current
   * index, since the last token is not part of the tree nodes, but
   * instead is the rule for which message is defined
   */
  const isLast = tokens.length === (index + 1)

  /**
   * Indexed array have `digits` like `users.0.username`
   */
  const isIndexedArray = /^\d+$/.test(tokens[index])

  /**
   * Is upcoming token an array
   */
  const isArray = tokens[index] === '*' || isIndexedArray

  /**
   * Last item was an array
   */
  if (token === '*' || /^\d+$/.test(token)) {
    if (isLast) {
      (out as MessagesNodeArray).each[token].messages = { [tokens[index]]: message }
      return
    }
    return parseFieldForMessage(tokens, message, (out as MessagesNodeArray).each[token].children, index)
  }

  /**
   * Last item in the list of tokens. we must
   * patch the rules here.
   */
  if (isLast) {
    setLiteral(out as ParsedNamedMessages, token, { [tokens[index]]: message }, true)
    return
  }

  /**
   * Current item as an array
   */
  if (isArray) {
    const item = setArray(out as ParsedNamedMessages, token, isIndexedArray ? tokens[index] : '*', true)
    return parseFieldForMessage(tokens, message, item, index)
  }

  /**
   * Falling back to object
   */
  const item = setObject(out as ParsedNamedMessages, token, true)
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
export function messagesParser (schema: Messages): ParsedMessages {
  return Object
    .keys(schema)
    .reduce((result: ParsedMessages, field: string) => {
      const message = schema[field]
      const tokens = field.split('.')

      /**
       * If token length is 1, then it is a plain rule vs `field.rule`
       */
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
