/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const alphaNumericRegex = /^[a-z0-9]+$/i

/**
 * Returns a boolean telling if value passes test
 * of alpha numeric characters set.
 */
export default (input: string): boolean => alphaNumericRegex.test(input)
