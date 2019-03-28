/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export function patchValue (data: any, field: string, fieldValue: any, root: any) {
  if (field === 'arr:literal') {
    root.parentArray[root.currentIndex] = fieldValue
    return
  }

  data[field] = fieldValue
}
