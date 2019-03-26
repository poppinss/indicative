/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ParsedRule } from 'indicative-parser'
import { isObject, dotProp } from '../utils'
import { Sanitization, DataNode } from '../Contracts/SanitizationCompiler'

/**
 * Runs a single validation on a given field with
 * run time.
 */
export class SanitizationRunner {
  private _dotPathLength = this._dotPath.length

  constructor (
    private _sanitization: Sanitization,
    private _field: string,
    private _rule: ParsedRule,
    private _type: 'object' | 'literal' | 'array',
    private _dotPath: string[],
  ) {}

  /**
   * Runs the validation function
   */
  private _sanitize (data: any, config: unknown) {
    let tip = dotProp(data, this._dotPath, this._dotPathLength)
    let runtimeField = this._field

    // if (runtimeField === '*' && root.currentIndex !== undefined) {
    //   runtimeField = String(root.currentIndex)
    //   tip = { [runtimeField]: tip }
    // }

    if (!isObject(tip)) {
      return true
    }

    return this._sanitization.sanitize(tip, runtimeField, this._rule.args, this._type, config)
  }

  /**
   * Runs the validation and reports error to the formatter (in case of failure)
   */
  public exec (data: DataNode, config: unknown) {
    this._sanitize(data, config)
  }
}
