/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { DataRoot, DataNode, FormatterContract, Validation } from '../Contracts/ValidationCompiler'
import { Message, ParsedRule } from 'indicative-parser'
import { reportError, isObject, dotProp } from '../utils'

/**
 * Runs a single validation on a given field with
 * run time.
 */
export class ValidationRunner {
  private _dotPathLength = this._dotPath.length

  constructor (
    private _validation: Validation,
    private _field: string,
    private _rule: ParsedRule,
    private _message: Message,
    private _type: 'object' | 'literal' | 'array',
    private _dotPath: string[],
  ) {}

  /**
   * Reports error to the formatter
   */
  private _reportError (formatter: FormatterContract, root: DataRoot, error?: Error) {
    reportError(formatter, this._field, this._rule, error || this._message, this._dotPath, root)
  }

  /**
   * Runs the validation function
   */
  private _runValidation (data: any, root: DataRoot, config: unknown) {
    let tip = dotProp(data, this._dotPath, this._dotPathLength)
    let runtimeField = this._field

    if (runtimeField === '*' && root.currentIndex !== undefined) {
      runtimeField = String(root.currentIndex)
      tip = { [runtimeField]: tip }
    }

    if (!isObject(tip)) {
      return true
    }

    return this._validation.validate(tip, runtimeField, this._rule.args, this._type, root, config)
  }

  /**
   * Runs the validation and reports error to the formatter (in case of failure)
   */
  public exec (
    data: DataNode,
    formatter: FormatterContract,
    root: DataRoot,
    config: unknown,
  ): boolean {
    try {
      const passed = this._runValidation(data, root, config)
      if (!passed) {
        this._reportError(formatter, root)
      }

      return !!passed
    } catch (error) {
      this._reportError(formatter, root, error)
      return false
    }
  }

  /**
   * Same as [[ValidationRunner.exec]] but for async validations
   */
  public async execAsync (
    data: DataNode,
    formatter: FormatterContract,
    root: DataRoot,
    config: unknown,
  ): Promise<boolean> {
    try {
      const passed = await this._runValidation(data, root, config)
      if (!passed) {
        this._reportError(formatter, root)
      }

      return !!passed
    } catch (error) {
      this._reportError(formatter, root, error)
      return false
    }
  }
}
