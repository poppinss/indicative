/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ValidationExecutor, FormatterContract, DataNode } from '../Contracts/ValidationCompiler'

/**
 * Runner takes an array of executor functions along side the formatter
 * instance to run all functions in series.
 */
export class FinalRunner {
  constructor (private _stack: ValidationExecutor[]) {}

  /**
   * Execute all executor functions by passing it the runtime `data`, along
   * with errors formatter.
   */
  public async exec (data: DataNode, formatter: FormatterContract, config: unknown, bail: boolean = true) {
    const root = { original: data }

    for (let executor of this._stack) {
      let passed = false

      /**
       * Based upon executor type, run the function as async or
       * non-async
       */
      if (executor.async) {
        passed = await executor.fn(data, formatter, root, config, bail)
      } else {
        passed = executor.fn(data, formatter, root, config, bail) as boolean
      }

      /**
       * Break if `bail=true`
       */
      if (bail && !passed) {
        break
      }
    }

    /**
     * Reject promise in case formatter has one
     * or more errors.
     */
    const errors = formatter.toJSON()
    if (errors) {
      throw errors
    }

    return data
  }
}
