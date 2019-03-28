/*
* indicative-utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export function toNumber (value: any): number | null {
  if (typeof (value) === 'number') {
    return value
  }

  if (typeof (value) !== 'string') {
    return null
  }

  const casted = Number(value)
  if (isNaN(casted)) {
    return null
  }

  return casted
}
