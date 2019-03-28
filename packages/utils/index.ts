/*
* indicative-utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { toBoolean } from './src/toBoolean'
import { toDate } from './src/toDate'
import { toInt } from './src/toInt'
import { toNumber } from './src/toNumber'
import { toString } from './src/toString'
import { ensureLength } from './src/ensureLength'
import { changeType } from './src/changeType'

export { skippable } from './src/skippable'
export { patchValue } from './src/patchValue'

export const casts = { toBoolean, toDate, toInt, toNumber, toString }
export const args = { ensureLength, changeType }
