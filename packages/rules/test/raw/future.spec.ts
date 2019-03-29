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

test.group('raw | future', () => {
  test('return false when date is in past', (assert) => {
    const isFuture = Is.future('2001-11-01')
    assert.isFalse(isFuture)
  })

  test('return true when date is in future', (assert) => {
    const isFuture = Is.future('2200-11-01')
    assert.isTrue(isFuture)
  })
})
