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

test.group('raw | date', () => {
  test('return true when input is a date', (assert) => {
    assert.isTrue(Is.date(new Date()))
  })

  test('return false when input is a date like string', (assert) => {
    assert.isFalse((Is.date as any)('2015-11-30'))
  })
})
