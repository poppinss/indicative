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

import { Schema, Messages } from 'indicative-parser'
import { ErrorFormatterContract } from 'indicative-compiler'
import { ErrorCollectorFn } from 'indicative-compiler/build/src/contracts'

/**
 * Shape of validator config
 */
export type ValidatorConfig = {
  cacheKey?: string,
  existyStrict: boolean,
  removeAdditional: boolean,
  customErrorCollector?: ErrorCollectorFn,
  formatter: { new (): ErrorFormatterContract },
}

/**
 * Shape of sanitizer config. This must be passed inline
 */
export type SanitizerConfig = {
  cacheKey?: string,
}

/**
 * Shape of `validate` and `validateAll` function.
 */
export type ValidateFn = (
  data: any,
  schema: Schema,
  messages?: Messages,
  config?: Partial<ValidatorConfig>,
) => Promise<any>

/**
 * Shape of `sanitize` function.
 */
export type SanitizeFn = (
  data: any,
  schema: Schema,
  config?: Partial<SanitizerConfig>,
) => any
