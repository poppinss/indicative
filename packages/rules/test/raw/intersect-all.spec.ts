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

test.group('raw | intersectAll', () => {
  test('return false when input array values are not in targeted array', (assert) => {
    assert.isFalse(Is.intersectAll([10, 20], [30, 40, 50]))
  })

  test('return false when any one value falls in targeted array', (assert) => {
    assert.isFalse(Is.intersectAll([10, 20], [10, 40, 50]))
  })

  test('return true when all values falls in targeted array', (assert) => {
    assert.isTrue(Is.intersectAll([10, 20], [10, 20, 50]))
  })

  test('return false when input value is not an array', (assert) => {
    assert.isFalse((Is.intersectAll as any)(10, [30, 10, 50]))
  })

  test('return false when target value is not an array', (assert) => {
    assert.isFalse((Is.intersectAll as any)([10, 20], 10))
  })
})
