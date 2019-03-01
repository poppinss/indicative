/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { pope } from 'pope'
import snakeToCamelCase from './snakeToCamelCase'
import { MessagesNode } from '../contracts'

/**
 * Returns message for a given field and a validation rule. The priority is
 * defined as follows in order from top to bottom.
 *
 * 1. Message for `field.validation`
 * 2. Message for `field.*.validation`
 * 3. Message for validation
 * 4. Default message
 *
 * ### Templating
 * Support dynamic placeholders in messages as shown below.
 *
 * ```
 * {{ validation }} validation failed on {{ field }}
 * ```
 * 1. validation - Validation name
 * 2. field - Field under validation
 * 3. argument - An array of values/args passed to the validation.
 *
 * ### Closure
 * Also you can define a closure for a message, which receives
 * following arguments.
 *
 * ```
 * required: function (field, validation, args) {
 *  return `${validation} failed on ${field}`
 * }
 * ```
 */
export function getMessage
(
  messages: MessagesNode,
  field: string,
  validation: string,
  args: any[],
) : string {
  const normalized = field.replace(/\.\d/g, '.*')
  const camelizedValidation = snakeToCamelCase(validation)

  /**
   * Find the best possible message for the given field under
   * validation. We start with the
   *
   * 1. Actual field name
   * 2. Then field name with wildcard for arrays
   * 3. Then message for just the validation
   * 4. Finally fallback to custom string
   */
  const message = messages[`${field}.${validation}`]
    || messages[`${field}.${camelizedValidation}`]
    || messages[`${normalized}.${validation}`]
    || messages[`${normalized}.${camelizedValidation}`]
    || messages[validation]
    || messages[camelizedValidation]
    || '{{validation}} validation failed on {{ field }}'

  return typeof (message) === 'function'
    ? message(field, validation, args)
    : pope(message, { field, validation, argument: args })
}
