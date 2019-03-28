/*
* indicative-utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Raises exception if length of args array is less than the expected length
 */
export function ensureLength (args: any[], message: string, minLength = 1): void {
  if (args.length < minLength) {
    throw new Error(message)
  }
}
