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

test.group('raw | isNull', () => {
  test('return true when input is null', (assert) => {
    assert.isTrue(Is.isNull(null))
  })

  test('return false when input is undefined', (assert) => {
    assert.isFalse(Is.isNull(undefined))
  })

  test('return false when input is empty', (assert) => {
    assert.isFalse(Is.isNull(''))
  })
})
