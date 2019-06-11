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

import { validations } from 'indicative-rules'
import { Schema, Messages } from 'indicative-parser'
import { ValidatorCompiler, ValidatorExecutor } from 'indicative-compiler'

import { CacheManager } from '../CacheManager'
import { ValidateFn, ValidatorConfig } from '../Contracts'
import { config as validatorConfig } from './config'

const cacheManager = new CacheManager<ReturnType<ValidatorCompiler['compile']>>()

/**
 * Returns executor by pre-compiling and optionally caching schema.
 */
function getExecutor (schema: Schema, messages: Messages, config: ValidatorConfig) {
  /**
   * Always compile schema, when there is no cacheKey
   */
  if (!config.cacheKey) {
    const compiler = new ValidatorCompiler(schema, messages, validations)
    return new ValidatorExecutor(compiler.compile())
  }

  /**
   * Pre-compile the schema and set it as cache when it's not
   * inside the cache already
   */
  const compiledSchema = cacheManager.get(config.cacheKey)
  if (!compiledSchema) {
    const compiler = new ValidatorCompiler(schema, messages, validations)
    cacheManager.set(config.cacheKey, compiler.compile())
  }

  return new ValidatorExecutor(cacheManager.get(config.cacheKey)!)
}

/**
 * Validates the given data set against the defined schema. The validator
 * stops at the first error. You must use [[validateAll]] to continue
 * validations, even after first error.
 *
 * It is recommended to define the `config` cacheKey to avoid
 * re-compiling the same schema again and again.
 */
export const validate: ValidateFn = (data, schema, messages, config?) => {
  config = Object.assign({}, validatorConfig, config)

  return getExecutor(schema, messages || {}, config as ValidatorConfig).exec(
    data,
    config.formatter!,
    config,
    true,
    config.removeAdditional!,
  )
}

/**
 * Validates the given data set against the defined schema. The validator
 * continues even after errors. You must use [[validate]] to stop
 * validations after first error.
 *
 * It is recommended to define the `config` cacheKey to avoid
 * re-compiling the same schema again and again.
 */
export const validateAll: ValidateFn = (data, schema, messages, config?) => {
  config = Object.assign({}, validatorConfig, config)

  return getExecutor(schema, messages || {}, config as ValidatorConfig).exec(
    data,
    config.formatter!,
    config,
    false,
    config.removeAdditional!,
  )
}
