/*
* indicative-utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { toDate } from './toDate'
import { toNumber } from './toNumber'
import { toString } from './toString'
import { toBoolean } from './toBoolean'
import { toInt } from './toInt'

/**
 * Changes the type of the value to a desired data type. An exception is raised
 * when value cannot be casted to the desired type
 */
export function cast (value: any, toType: 'number', errorMessage?: string): number | null
export function cast (value: any, toType: 'date', errorMessage?: string): Date | null
export function cast (value: any, toType: 'string', errorMessage?: string): string | null
export function cast (value: any, toType: 'integer', errorMessage?: string): number | null
export function cast (value: any, toType: 'boolean', errorMessage?: string): boolean | null
export function cast (
  value: any,
  toType: 'number' | 'date' | 'string' | 'integer' | 'boolean',
  errorMessage?: string,
): any {
  if (typeof(value) === toType) {
    return value
  }

  let castedValue: any = null
  switch (toType) {
    case 'number':
      castedValue = toNumber(value)
      break
    case 'string':
      castedValue = toString(value)
      break
    case 'integer':
      castedValue = toInt(value)
      break
    case 'date':
      castedValue = toDate(value)
      break
    case 'boolean':
      castedValue = toBoolean(value)
      break
  }

  if (!castedValue && errorMessage) {
    throw new Error(errorMessage)
  }

  return castedValue
}
