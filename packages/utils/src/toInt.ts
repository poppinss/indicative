/*
* indicative-utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

export function toInt (value: any): number | null {
  if (typeof (value) === 'number') {
    return (parseInt as any)(value)
  }

  if (typeof (value) !== 'string') {
    return null
  }

  const casted = parseInt(value)
  if (isNaN(casted)) {
    return null
  }

  return casted
}
