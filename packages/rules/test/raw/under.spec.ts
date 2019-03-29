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

test.group('raw | under', () => {
  test('return false when input is greater than comparison input', (assert) => {
    assert.isFalse(Is.under(42, 40))
  })

  test('return true when input is less than comparison input', (assert) => {
    assert.isTrue(Is.under(30, 40))
  })
})
