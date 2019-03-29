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

test.group('raw | inDateRange', () => {
  test('return true when date between 2 dates', (assert) => {
    const isInDateRange = Is.inDateRange('2015-11-20', '2015-11-10', '2015-11-30')
    assert.isTrue(isInDateRange)
  })

  test('return false when min date expectation failed', (assert) => {
    const isInDateRange = Is.inDateRange('2015-11-20', '2015-11-22', '2015-11-30')
    assert.isFalse(isInDateRange)
  })

  test('return false when max date expectation failed', (assert) => {
    const isInDateRange = Is.inDateRange('2015-11-20', '2015-11-10', '2015-11-15')
    assert.isFalse(isInDateRange)
  })
})
