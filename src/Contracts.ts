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

import { ErrorFormatterContract } from 'indicative-compiler'
import { ErrorCollectorFn } from 'indicative-compiler/build/src/contracts'
import { Schema, Messages, TypedSchema, ParsedTypedSchema } from 'indicative-parser'

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
export type ValidateFn = <T extends ParsedTypedSchema<TypedSchema> | Schema>(
  data: any,
  schema: T,
  messages?: Messages,
  config?: Partial<ValidatorConfig>,
) => T extends Schema ? Promise<any> : Promise<T['props']>

/**
 * Shape of `sanitize` function.
 */
export type SanitizeFn = (
  data: any,
  schema: Schema,
  config?: Partial<SanitizerConfig>,
) => any
