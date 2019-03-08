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
  MessageNode,
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
 * values to validate data
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
export type ValidationFn = ((
  data: DataNode,
  field: string,
  args: any[],
  type: 'object' | 'literal' | 'array',
  root: DataRoot,
  config: IndicativeCompilerConfig,
) => boolean | Promise<boolean>)

/**
 * Shape of collection of validations. Validation functions have
 * to upfront define if there are async or not
 */
export type ValidationsNode = {
  [field: string]: {
    async: boolean,
    fn: ValidationFn,
  },
}

export type IndicativeCompilerConfig = {
  EXISTY_STRICT: boolean,
  CAST_VALUES: boolean,
}

/**
 * Executor functions are executed at runtime
 * after the compiling phase
 */
export type ExecutorFn = {
  async: boolean,
  fn: ((data: any, formatter: IndicativeFormatter, root: DataRoot, bail: boolean) => Promise<boolean> | boolean),
}

/**
 * Formatter constructor, since instance of formatters
 * are created during validation
 */
export interface IndicativeFormatterConstructor {
  new (): IndicativeFormatter,
}

/**
 * Formatter interface
 */
export interface IndicativeFormatter {
  errors: unknown[],
  addError (error: string | Error, field: string, validation: string, args: string[]): void
  toJSON (): unknown,
}

/**
 * Message builder returns the messages for a tree node
 */
export interface MessageBuilderContract {
  getBucket (field: string, dotPath: string[]): MessageBucketContract
  child (dotPath: string[]): MessageBuilderContract
}

/**
 * Messages bucket has all the rules messages for a given tree
 * node
 */
export interface MessageBucketContract {
  get (rule: ParsedRule): MessageNode
}

/**
 * Error node for vanilla formatter
 */
export type VanillaErrorNode = {
  message: string,
  field: string,
  validation: string,
}

/**
 * Compiler function that returns executor fn
 */
export type SchemaExecutorFn = (
  node: SchemaNodeLiteral | SchemaNodeObject | SchemaNodeArray,
  validations: ValidationsNode,
  builder: MessageBuilderContract,
  field: string,
  dotPath: string[],
  message: MessageBucketContract,
) => ExecutorFn[]
