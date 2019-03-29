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

test.group('raw | alphaNumeric', () => {
  test('return false when input contains special characters', (assert) => {
    assert.isFalse(Is.alphaNumeric('hellowo$ld'))
  })

  test('return true when input contains letters only', (assert) => {
    assert.isTrue(Is.alphaNumeric('hello'))
  })

  test('return true when input contains letters and numbers both', (assert) => {
    assert.isTrue(Is.alphaNumeric('hello123'))
  })

  test('return true when input are numbers only', (assert) => {
    assert.isTrue(Is.alphaNumeric('123'))
  })
})
