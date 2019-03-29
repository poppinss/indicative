'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as test from 'japa'
import * as Is from '../../src/raw'

test.group('raw | sorted', () => {
  test('return false when array is not sorted', (assert) => {
    assert.isFalse(Is.sorted([1, 2, 4, 1]))
  })

  test('return false when array has negative values', (assert) => {
    assert.isFalse(Is.sorted([3, 9, -3, 10]))
  })

  test('should true when there is only one value inside the array', (assert) => {
    assert.isTrue(Is.sorted([3]))
  })

  test('return false when input is not an array', (assert) => {
    assert.isFalse((Is.sorted as any)(1))
  })

  test('return true when array is sorted', (assert) => {
    assert.isTrue(Is.sorted([1, 2, 4, 5]))
  })
})
