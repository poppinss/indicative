/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Patches value for a given field inside data object. The array literal
 * values needs to be patched on the array index and for same reason
 * we need the `DataRoot` object
 */
export function patchValue (data: any, field: string, fieldValue: any, root: {
  currentIndex?: number,
  parentArray?: any[],
}) {
  if (field === 'arr:literal') {
    root.parentArray![root.currentIndex!] = fieldValue
    return
  }

  data[field] = fieldValue
}
