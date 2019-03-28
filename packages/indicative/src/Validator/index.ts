/*
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { validations } from 'indicative-rules'
import { VanillaFormatter } from 'indicative-formatters'
import {
  DataNode,
  Schema,
  Messages,
  validationCompiler,
  TopLevelRunner,
} from 'indicative-compiler'

import { ValidationOptions } from '../Contracts'
import { CacheManager } from '../CacheManager'

export class Validator {
  private _cacheManager = new CacheManager<TopLevelRunner>()

  public async validate<Data extends DataNode> (
    data: Data,
    rules: Schema,
    messages: Messages,
    options?: Partial<ValidationOptions>,
  ): Promise<Data> {
    options = Object.assign({}, options)

    let runner = this._cacheManager.get(options.cacheKey)
    if (!runner) {
      runner = validationCompiler(rules, validations, messages)
    }

    this._cacheManager.set(runner!, options.cacheKey)
    return runner(data, new VanillaFormatter(), options, true)
  }

  public async validateAll<Data extends DataNode> (
    data: Data,
    rules: Schema,
    messages: Messages,
    options?: Partial<ValidationOptions>,
  ): Promise<Data> {
    options = Object.assign({}, options)

    let runner = this._cacheManager.get(options.cacheKey)
    if (!runner) {
      runner = validationCompiler(rules, validations, messages)
    }

    this._cacheManager.set(runner!, options.cacheKey)
    return runner(data, new VanillaFormatter(), options, false)
  }
}
