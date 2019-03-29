/*
* indicative-rules
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import isCreditCard from 'validator/lib/isCreditCard'

/**
 * Returns a boolean telling, if value is a valid credit card number pattern
 * or not.
 *
 * @example
 * ```js
 * const { is } = require('indicative')
 *
 * if (is.creditCard('4111-1111-1111-1111')) {
 * }
 * ```
 */
export const creditCard = (input: string): boolean => isCreditCard(input)
