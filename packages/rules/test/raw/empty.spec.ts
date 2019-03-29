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

test.group('raw | empty', () => {
  test('return true when object is empty', (assert) => {
    assert.isTrue(Is.empty({}))
  })

  test('return true when array is empty', (assert) => {
    assert.isTrue(Is.empty([]))
  })

  test('return true when empty string has been passed', (assert) => {
    assert.isTrue(Is.empty(''))
  })

  test('return true when null is passed', (assert) => {
    assert.isTrue(Is.empty(null))
  })

  test('return true when undefined is passed', (assert) => {
    assert.isTrue(Is.empty(undefined))
  })

  test('return false when number is passed', (assert) => {
    assert.isFalse(Is.empty(220))
  })

  test('return false when date is passed', (assert) => {
    assert.isFalse(Is.empty(new Date()))
  })

  test('return false when string with value is passed', (assert) => {
    assert.isFalse(Is.empty('hello'))
  })
})
