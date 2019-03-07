/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ExecutorFn, IndicativeFormatter, DataNode } from '../Contracts'

/**
 * Runner takes an array of executor functions along side the formatter
 * instance to run all functions in series.
 */
export class Runner {
  constructor (private _stack: ExecutorFn[]) {}

  public async exec (data: DataNode, formatter: IndicativeFormatter, bail: boolean) {
    const root = { original: data }

    for (let executor of this._stack) {
      let passed = false

      if (executor.async) {
        passed = await executor.fn(data, formatter, root, bail)
      } else {
        passed = executor.fn(data, formatter, root, bail) as boolean
      }

      if (bail && !passed) {
        break
      }
    }

    const errors = formatter.toJSON()
    if (errors) {
      throw errors
    }

    return data
  }
}
