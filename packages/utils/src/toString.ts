/*
* indicative-utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export function toString (value: any): string | null {
  if (value === null || value === undefined || value.constructor === Object) {
    return null
  }

  return String(value)
}
