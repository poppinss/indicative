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

test.group('raw | positive', () => {
  test('return true when input is greater than 0', (assert) => {
    assert.isTrue(Is.positive(1))
  })

  test('return false when input is less than 0', (assert) => {
    assert.isFalse(Is.positive(-42))
  })
})
