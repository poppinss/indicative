/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export const even = (input: string | number, strict: boolean = false): boolean => {
  if (strict && typeof (input) !== 'number') {
    return false
  }

  return Number(input) % 2 === 0
}
