/**
 * @module indicative
 */

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Schema } from 'indicative-parser'
import { sanitizations } from 'indicative-rules'
import { SanitizerCompiler, SanitizerExecutor } from 'indicative-compiler'

import { CacheManager } from '../CacheManager'
import { SanitizerConfig, SanitizeFn } from '../Contracts'

const cacheManager = new CacheManager<ReturnType<SanitizerCompiler['compile']>>()

/**
 * Returns executor by pre-compiling and optionally caching schema.
 */
function getExecutor (schema: Schema, config: SanitizerConfig) {
  /**
   * Always compile schema, when there is no cacheKey
   */
  if (!config.cacheKey) {
    const compiler = new SanitizerCompiler(schema, sanitizations)
    return new SanitizerExecutor(compiler.compile())
  }

  /**
   * Pre-compile the schema and set it as cache when it's not
   * inside the cache already
   */
  const compiledSchema = cacheManager.get(config.cacheKey)
  if (!compiledSchema) {
    const compiler = new SanitizerCompiler(schema, sanitizations)
    cacheManager.set(config.cacheKey, compiler.compile())
  }

  return new SanitizerExecutor(cacheManager.get(config.cacheKey)!)
}

/**
 * Santize given data against a pre-defined set of rules schema.
 *
 * It is recommended to define the `config` cacheKey to avoid
 * re-compiling the same schema again and again.
 */
export const sanitize: SanitizeFn = (data, schema, config) => {
  config = config || {}
  return getExecutor(schema, config).exec(data, config)
}
