/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Parsed rule is created by parsing a single rule defination
 * like `required` or `min:4`
 */
export type ParsedRule = {
  name: string,
  args: any[],
}

/**
 * Array node defines the fields which uses one of the following
 * array expressions.
 *
 * 1. users.*.username
 * 2. users.*
 * 3. users.0.username
 * 4. users.0
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
 * Object node defines the fields which uses one of the following
 * object expressions.
 *
 * 1. user.username
 */
export type SchemaNodeObject = {
  type: 'object',
  rules: ParsedRule[],
  children: ParsedSchema,
}

/**
 * Literal are leaf nodes inside the tree. A literal can exist
 * on an array or object or direct leafs of a flat tree
 */
export type SchemaNodeLiteral = {
  type: 'literal',
  rules: ParsedRule[],
}

/**
 * Shape of the schema defined by the end user
 */
export type Schema = {
  [field: string]: string | ParsedRule[],
}

/**
 * The shape of schema after parser parses it
 */
export type ParsedSchema = {
  [field: string]: SchemaNodeArray | SchemaNodeLiteral | SchemaNodeObject,
}

/**
 * Shape of a single validation message. The functions are evaluated at runtime
 */
export type Message = string | ((field: string, validation: string, args: any[]) => string)

/**
 * Shape of user defined messages schema
 */
export type Messages = {
  [field: string]: Message,
}

/**
 * Shape of parsed messages for a given node
 */
export type ParsedRulesMessages = { [rule: string]: Message }

/**
 * Parsed messages tree
 */
export type ParsedFieldsMessages = {
  [field: string]: ParsedRulesMessages,
}

/**
 * Final tree for messages. The `rules` object has flat list of messages
 * for a given rule. However, `fields` are scoped inside a field name.
 */
export type ParsedMessages = {
  fields: ParsedFieldsMessages,
  rules: ParsedRulesMessages,
}
