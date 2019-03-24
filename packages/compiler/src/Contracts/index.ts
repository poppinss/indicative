/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import {
  SchemaNodeLiteral,
  SchemaNodeObject,
  SchemaNodeArray,
  Message,
  ParsedRule,
} from 'indicative-parser'

/**
 * Incoming data must be defined as a top level object.
 * Top level `arrays` or `null` or `undefined` isn't
 * allowed.
 */
export type DataNode = {
  [field: string]: any,
}

/**
 * Shape of root data node passed to validation functions. This is
 * passed so that validation function can reach beyond their own
 * values.
 */
export type DataRoot = {
  original: DataNode,
  parentArray?: any[],
  arrayIndexes?: number[],
  arrayPaths?: string[][],
}

/**
 * Validation function for defining a validation
 * rule
 */
export type ValidationFunction = ((
  data: DataNode,
  field: string,
  args: any[],
  type: 'object' | 'literal' | 'array',
  root: DataRoot,
  config: unknown,
) => boolean | Promise<boolean>)

/**
 * Collection of validations
 */
export type Validations = {
  [field: string]: Validation,
}

/**
 * Shape of a single validation function. Validation function has
 * to upfront define, if it's async or not.
 */
export type Validation = {
  async: boolean,
  compile?: (args: any[]) => any[],
  validate: ValidationFunction,
}

/**
 * Executor functions are top level pre compiled functions
 * created out of parsed schema tree.
 */
export type ExecutorFunction = {
  async: boolean,
  fn: ((
    data: any,
    formatter: FormatterContract,
    root: DataRoot,
    config: unknown,
    bail: boolean,
  ) => Promise<boolean> | boolean),
}

/**
 * Formatter interface
 */
export interface FormatterContract {
  errors: unknown[],
  addError (error: string | Error, field: string, rule: string, args: string[]): void,
  toJSON (): unknown,
}

/**
 * Message builder returns the messages for a tree node
 */
export interface MessagesStoreContract {
  getMessageFor (field: string, rule: ParsedRule): Message,
  getChildStore (dotPath: string[]): MessagesStoreContract,
}

/**
 * The consumer function that consumes a node
 * from the parsed tree
 */
export type SchemaNodeConsumer = (
  node: SchemaNodeLiteral | SchemaNodeObject | SchemaNodeArray,
  validations: Validations,
  builder: MessagesStoreContract,
  field: string,
  dotPath: string[],
) => ExecutorFunction[]

/**
 * Validation runner that executes an array of top level
 * functions
 */
export type ValidationRunnerFunction = (<Data extends DataNode, Config extends any>(
  data: Data,
  formatter: FormatterContract,
  config: Config,
  bail?: boolean,
) => Promise<Data>)
