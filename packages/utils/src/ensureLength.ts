/*
* indicative-utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export function ensureLength (args: any[], message: string, expectedLength = 1): void {
  if (args.length < expectedLength) {
    throw new Error(message)
  }
}
