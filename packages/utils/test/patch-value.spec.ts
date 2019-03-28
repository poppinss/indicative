/*
* indicative-utils
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as test from 'japa'
import { patchValue } from '../src/patchValue'

test.group('patchValue', () => {
  test('update field value on the object', (assert) => {
    const data: { age: any } = { age: 22 }
    patchValue(data, 'age', '22', {})
    assert.deepEqual(data, { age: '22' })
  })

  test('update field value on array index when field value is arr:literal', (assert) => {
    const data: { age: any } = { age: 22 }

    const root: {
      parentArray: any[],
      currentIndex: number,
    } = {
      parentArray: [22],
      currentIndex: 0,
    }

    patchValue(data, 'arr:literal', '22', root)

    assert.deepEqual(data, { age: 22 })
    assert.deepEqual(root.parentArray, ['22'])
  })
})
