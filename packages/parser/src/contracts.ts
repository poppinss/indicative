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
 * Shape of object node inside schema tree
 */
export type SchemaNodeObject = {
  type: 'object',
  rules: ParsedRule[],
  children: ParsedSchema,
}

/**
 * Shape of literal node inside schema tree
 */
export type SchemaNodeLiteral = {
  type: 'literal',
  rules: ParsedRule[],
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
