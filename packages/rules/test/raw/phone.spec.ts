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

test.group('raw | phone', () => {
  test('return true when input is a valid phone number', (assert) => {
    assert.isTrue(Is.phone('1235599809'))
  })

  test('return true when input is a valid phone number with hyphens', (assert) => {
    assert.isTrue(Is.phone('123-559-9809'))
  })

  test('return true when input is a valid fax phone number ', (assert) => {
    assert.isTrue(Is.phone('123.559.9809'))
  })

  test('return false when input not a valid phone number ', (assert) => {
    assert.isFalse(Is.phone('1020'))
  })
})
