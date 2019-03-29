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

test.group('raw | isNumber', () => {
  test('return true when input is a number', (assert) => {
    assert.isTrue(Is.isNumber(10))
  })

  test('return false when input is NaN', (assert) => {
    assert.isFalse(Is.isNumber(NaN))
  })

  test('return true when input is constructed using Number method', (assert) => {
    assert.isTrue(Is.isNumber(Number('10')))
  })

  test('return false when input is a string', (assert) => {
    assert.isFalse((Is.isNumber as any)('10'))
  })
})
