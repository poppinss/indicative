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

test.group('raw | isBoolean', () => {
  test('return true when value is a positive boolean', (assert) => {
    assert.isTrue(Is.boolean(true))
  })

  test('return true when value is a negative boolean', (assert) => {
    assert.isTrue(Is.boolean(false))
  })

  test('return false when value is a number', (assert) => {
    assert.isFalse((Is.boolean as any)(1))
  })

  test('return false when value is a string', (assert) => {
    assert.isFalse((Is.boolean as any)('true'))
  })
})
