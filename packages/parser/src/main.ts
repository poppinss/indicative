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
} from './contracts'

/**
 * Sets the literal node to the source object for the given key. Rules
 * are patched on existing nodes as well
 */
function setLiteral (source: ParsedSchema, key: string, rules: ParsedRule[]): SchemaNodeLiteral {
  const item = (source[key] || { type: 'literal' }) as SchemaNodeLiteral
  item.rules = rules
  source[key] = item
  return item
}

/**
 * Sets the object node to the source object for the given key. `type`
 * is patched on existing nodes as well
 */
function setObject (source: ParsedSchema, key: string): SchemaNodeObject {
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
function setArray (source: ParsedSchema, key: string): SchemaNodeArray {
  const item = (source[key] || { rules: [] }) as SchemaNodeArray
  item.type = 'array'
  item.each = item.each || { children: {}, rules: [] }
  source[key] = item
  return item
}

/**
 * Parses the field tokens to form the tree
 */
function parseField (
  tokens: string[],
  rules: ParsedRule[],
  out: ParsedSchema | SchemaNodeArray,
  index = 0,
) {
  const token = tokens[index++]
  const isLast = tokens.length === index
  const isArray = tokens[index] === '*'

  /**
   * Last item was an array
   */
  if (token === '*') {
    if (isLast) {
      (out as SchemaNodeArray).each.rules = rules
      return
    }
    return parseField(tokens, rules, (out as SchemaNodeArray).each.children, index)
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
    const item = setArray(out as ParsedSchema, token)
    return parseField(tokens, rules, item, index)
  }

  /**
   * Falling back to object
   */
  const item = setObject(out as ParsedSchema, token)
  return parseField(tokens, rules, item.children, index)
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
 *      rules: [],
 *      children: {
 *        username: {
 *          type: 'literal',
 *          rules: [{
 *            name: 'required',
 *            args: []
 *          }]
 *        }
 *      }
 *    }
 *   }
 * }
 * ```
 */
export function parser (schema: Schema): ParsedSchema {
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

      parseField(field.split('.'), parsedRules, result)
      return result
    }, {})
}

/**
 * Returns parsed rule node
 */
export function rule (name: string, args: any | any[]): ParsedRule {
  return { name, args: Array.isArray(args) ? args : [args] }
}
