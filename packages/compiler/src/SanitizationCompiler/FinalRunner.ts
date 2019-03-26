/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { SanitizationExecutor, DataNode } from '../Contracts/SanitizationCompiler'

/**
 * Runner takes an array of executor functions along side the formatter
 * instance to run all functions in series.
 */
export class FinalRunner {
  constructor (private _stack: SanitizationExecutor[]) {}

  /**
   * Execute all executor functions by passing it the runtime `data`, along
   * with errors formatter.
   */
  public async exec (data: DataNode, config: unknown) {
    // const root = { original: data }

    for (let executor of this._stack) {
      executor(data, config)
    }

    return data
  }
}
