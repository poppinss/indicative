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
import { DataNode, Schema, Messages, validationCompiler, TopLevelRunner } from 'indicative-compiler'

import { ValidationOptions } from '../Contracts'
import { CacheManager } from '../CacheManager'

/**
 * Validator instance exposes the API to run validations using indicative schema,
 * user data and custom message. The class internally manages in memory cache
 * of compiled schemas to improve performance
 */
export class Validator {
  private _cacheManager = new CacheManager<TopLevelRunner>()

  /**
   * Returns runner instance and automatically caches it when
   * `cacheKey` is defined
   */
  private _getRunner (
    rules: Schema,
    messages: Messages,
    options: Partial<ValidationOptions>,
  ): TopLevelRunner {
    if (!options.cacheKey) {
      return validationCompiler(rules, validations, messages)
    }

    let runner = this._cacheManager.get(options.cacheKey)
    if (!runner) {
      runner = validationCompiler(rules, validations, messages)
    }

    this._cacheManager.set(options.cacheKey, runner)
    return runner
  }

  /**
   * Validate user data and stop on first validation failure.
   */
  public async validate<Data extends DataNode> (
    data: Data,
    rules: Schema,
    messages: Messages,
    options?: Partial<ValidationOptions>,
  ): Promise<Data> {
    options = Object.assign({}, options)
    const runner = this._getRunner(rules, messages, options)
    return runner(data, new VanillaFormatter(), options, true)
  }

  /**
   * Validate user data and continue even when validation
   * fails
   */
  public async validateAll<Data extends DataNode> (
    data: Data,
    rules: Schema,
    messages: Messages,
    options?: Partial<ValidationOptions>,
  ): Promise<Data> {
    options = Object.assign({}, options)
    const runner = this._getRunner(rules, messages, options)
    return runner(data, new VanillaFormatter(), options, false)
  }
}
