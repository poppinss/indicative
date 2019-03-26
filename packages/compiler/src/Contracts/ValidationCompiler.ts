/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ParsedMessages } from 'indicative-parser'

/**
 * Validation data
 */
export type DataNode = {
  [field: string]: any,
}

/**
 * The shape of the root object passed to all validation
 * functions to have context specific validations
 */
export type DataRoot = {
  original: DataNode,
  parentArray?: any[],
  arrayIndexes?: number[],
  currentIndex?: number,
  arrayPaths?: string[][],
}

/**
 * Interface for error formatters
 */
export interface FormatterContract {
  errors: unknown[],
  addError (error: string | Error, field: string, rule: string, args: string[]): void,
  toJSON (): unknown,
}

/**
 * Shape of top level validation runner objects
 */
export type ValidationExecutor = {
  async: boolean,
  fn: ((
    data: DataNode,
    formatter: FormatterContract,
    root: DataRoot,
    config: unknown,
    bail: boolean,
  ) => Promise<boolean> | boolean),
}

/**
 * Arguments for node consumer
 */
export type NodeConsumerArgs = [Validations, ParsedMessages]

/**
 * Shape of a single validation node. The `validate` function
 * is called at runtime and `compile` is called at compile
 * time.
 *
 * The async flag is required to generate optimized top level
 * functions
 */
export type Validation = {
  async: boolean,
  compile?: (args: any[]) => any[],
  validate: ((
    data: DataNode,
    field: string,
    args: any[],
    type: 'object' | 'literal' | 'array',
    root: DataRoot,
    config: unknown,
  ) => boolean | Promise<boolean>),
}

/**
 * Shape of validations object
 */
export type Validations = {
  [field: string]: Validation,
}

export type TopLevelRunner = (<Data extends DataNode>(
  data: Data,
  formatter: FormatterContract,
  config: unknown,
  bail?: boolean,
) => Promise<Data>)
