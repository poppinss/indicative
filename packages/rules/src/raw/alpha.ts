/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const alphaRegex = /^[a-z]+$/i

/**
 * Returns a boolean telling if value has just
 * alphabets or not.
 */
export const alpha = (input: string): boolean => alphaRegex.test(input)
