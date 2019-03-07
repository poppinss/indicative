/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ParsedRule, MessageNode } from 'indicative-parser'
import { ValidationFn, DataRoot, DataNode, IndicativeFormatter } from '../Contracts'
import { dotProp, addError } from '../utils'

/**
 * Executor job is to execute a single validation function on a given field.
 * The consumer of this class decides whether to use `async` or `sync`
 * validation methods, which actually depends upon the underlying
 * validation function.
 */
export class Executor {
  /**
   * Calcuating length of dot path upfront (complitation phase)
   * to avoid doing it at runtime.
   */
  private _dotPathLength = this._dotPath.length

  constructor (
    private _validationFn: ValidationFn,
    private _message: MessageNode,
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
  private _exec (data: DataNode, root: DataRoot) {
    const node = dotProp(data, this._dotPath, this._dotPathLength)
    if (!node || typeof (node) !== 'object' || node.constructor !== Object) {
      return true
    }

    return this._validationFn(node, this._field, this._rule.args, this._type, root)
  }

  /**
   * Executes the validation asynchronously
   */
  public async execAsync (data: DataNode, formatter: IndicativeFormatter, root: DataRoot): Promise<boolean> {
    let passed: boolean = false
    let hardError: string | Error | null = null

    /**
     * Trying running the function and ignore errors. If actual method
     * fails, then value `passed` will false and hence we collect
     * error for the field
     */
    try {
      passed = await this._exec(data, root)
    } catch (error) {
      hardError = error
    }

    /**
     * Add error if not passed
     */
    if (!passed) {
      addError(formatter, this._field, this._rule, hardError || this._message, this._dotPath, root)
    }

    return !!passed
  }

  /**
   * Executes the validation synchronously
   */
  public exec (data: DataNode, formatter: IndicativeFormatter, root: DataRoot): boolean {
    let passed: boolean = false
    let hardError: string | Error | null = null

    try {
      passed = this._exec(data, root)
    } catch (error) {
      hardError = error
    }

    /**
     * Add error when validation fails with exception or by return false
     */
    if (!passed) {
      addError(formatter, this._field, this._rule, hardError || this._message, this._dotPath, root)
    }

    return !!passed
  }
}
