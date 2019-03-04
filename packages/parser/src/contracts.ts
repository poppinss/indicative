/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Shape of parsed rule
 */
export type ParsedRule = {
  name: string,
  args: any[],
}

/**
 * Shape of array node inside schema tree
 */
export type SchemaNodeArray = {
  type: 'array',
  rules: ParsedRule[],
  each: {
    [index: string]: {
      rules: ParsedRule[],
      children: ParsedSchema,
    },
  },
}

/**
 * Shape of array node inside messages tree
 */
export type MessagesNodeArray = {
  type: 'array',
  messages: MessagesRulesMap,
  each: {
    [index: string]: {
      messages: MessagesRulesMap,
      children: ParsedMessages,
    },
  },
}

/**
 * Shape of object node inside schema tree
 */
export type SchemaNodeObject = {
  type: 'object',
  rules: ParsedRule[],
  children: ParsedSchema,
}

/**
 * Shape of object node inside messages tree
 */
export type MessagesNodeObject = {
  type: 'object',
  messages: MessagesRulesMap,
  children: ParsedMessages,
}

/**
 * Shape of literal node inside schema tree
 */
export type SchemaNodeLiteral = {
  type: 'literal',
  rules: ParsedRule[],
}

/**
 * Shape of literal node inside messages tree
 */
export type MessagesNodeLiteral = {
  type: 'literal',
  messages: MessagesRulesMap,
}

/**
 * User defined schema
 */
export type Schema = {
  [field: string]: string | ParsedRule[],
}

/**
 * Parsed schema tree
 */
export type ParsedSchema = {
  [field: string]: SchemaNodeArray | SchemaNodeLiteral | SchemaNodeObject,
}

/**
 * Shape of a single validation message
 */
export type MessageNode = string | ((field: string, validation: string, args: any[]) => string)

/**
 * Shape of messages
 */
export type Messages = {
  [field: string]: MessageNode,
}

/**
 * Parsed messages node for a given field
 */
export type MessagesRulesMap = { [rule: string]: MessageNode }

/**
 * Parsed messages tree
 */
export type ParsedMessages = {
  [field: string]: MessagesNodeArray | MessagesNodeLiteral | MessagesNodeObject,
}
