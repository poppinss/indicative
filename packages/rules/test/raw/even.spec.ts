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

test.group('raw | even', () => {
  test('return true when input is a even number', (assert) => {
    assert.isTrue(Is.even(4))
  })

  test('return false when input is not a even number', (assert) => {
    assert.isFalse(Is.even(5))
  })

  test('return false when input is not a number', (assert) => {
    assert.isFalse((Is.even as any)('hello'))
  })

  test('return true when is a number like string', (assert) => {
    assert.isTrue((Is.even as any)('10'))
  })
})
