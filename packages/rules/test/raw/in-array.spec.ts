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

test.group('raw | inArray', () => {
  test('return true when value falls in an array', (assert) => {
    assert.isTrue(Is.inArray(2, [1, 2, 3]))
  })

  test('return false when value does not fall in an array', (assert) => {
    assert.isFalse(Is.inArray(2, [1, 3, 5]))
  })

  test('return false when comparison value is not an array', (assert) => {
    assert.isFalse(Is.inArray(2, {} as any))
  })
})
