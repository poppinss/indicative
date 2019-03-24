/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ParsedRule, Message } from 'indicative-parser'
import { dotProp, addError } from '../utils'
import { ValidationFunction, DataRoot, DataNode, FormatterContract } from '../Contracts'

/**
 * Executor executes a validation function for a given rule and field
 * at a time. All of the work is done at compile time and `exec` or
 * `execAsync` methods are called with runtime values.
 *
 * The `exec` and `execAsync` are two different functions, since we don't want
 * to call non-async functions as `async`, since it drops the peformance of
 * the code drastically.
 */
export class Executor {
  /**
   * Calcuating length of dot path upfront (complitation phase)
   * to avoid doing it at runtime.
   */
  private _dotPathLength = this._dotPath.length

  constructor (
    private _validationFn: ValidationFunction,
    private _message: Message,
    private _rule: ParsedRule,
    private _field: string,
    private _dotPath: string[],
    private _type: 'literal' | 'array' | 'object',
  ) {}

  /**
   * Executes the underlying validation function by ensuring
   * top level value is an object, otherwise validation is
   * skipped
   */
  private _exec (data: DataNode, root: DataRoot, config: unknown) {
    const dataNode = dotProp(data, this._dotPath, this._dotPathLength)

    /**
     * Ignore validation when top level data node is not an object.
     */
    if (!dataNode || dataNode.constructor !== Object) {
      return true
    }

    return this._validationFn(dataNode, this._field, this._rule.args, this._type, root, config)
  }

  /**
   * Handles the validation result and returns a boolean with the final
   * status of the test. In case of error, formatter is notified about
   * it.
   */
  private _handleResult (
    passed: boolean,
    formatter: FormatterContract,
    root: DataRoot,
    hardError?: string | Error,
  ): boolean {
    /**
     * Add error if not passed
     */
    if (!passed) {
      addError(formatter, this._field, this._rule, hardError || this._message, this._dotPath, root)
    }

    return !!passed
  }

  /**
   * Executes the validation asynchronously
   */
  public async execAsync (
    data: DataNode,
    formatter: FormatterContract,
    root: DataRoot,
    config: unknown,
  ): Promise<boolean> {
    let passed: boolean = false
    let hardError: string | Error

    try {
      passed = await this._exec(data, root, config)
    } catch (error) {
      hardError = error
    }

    return this._handleResult(passed, formatter, root, hardError!)
  }

  /**
   * Executes the validation synchronously
   */
  public exec (data: DataNode, formatter: FormatterContract, root: DataRoot, config: unknown): boolean {
    let passed: boolean = false
    let hardError: string | Error

    try {
      passed = this._exec(data, root, config) as boolean
    } catch (error) {
      hardError = error
    }

    return this._handleResult(passed, formatter, root, hardError!)
  }
}
