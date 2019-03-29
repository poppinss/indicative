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
import { format } from 'date-fns'

import * as Is from '../../src/raw'

test.group('raw | dateFormat', () => {
  test('return true when valid format is valid as per allowed format', (assert) => {
    const isFormatted = Is.dateFormat(format(new Date(), 'YYYY-MM-DD'), 'YYYY-MM-DD')
    assert.isTrue(isFormatted)
  })

  test('return false when date is invalid', (assert) => {
    const isFormatted = Is.dateFormat('hello', 'YYYY-MM-DD')
    assert.isFalse(isFormatted)
  })

  test('return false when date is set to string Invalid date', (assert) => {
    const isFormatted = Is.dateFormat('Invalid Date', 'YYYY-MM-DD')
    assert.isFalse(isFormatted)
  })

  test('return true when date is valid as per any given format', (assert) => {
    const isFormatted = Is.dateFormat(format(new Date(), 'YYYY-MM-DD'), ['YYYY/MM/DD', 'YYYY-MM-DD'])
    assert.isTrue(isFormatted)
  })

  test('ignore timezones when matching date formats', (assert) => {
    assert.isTrue(Is.dateFormat(format(new Date(), 'YYYY-MM-DD ZZ'), ['YYYY/MM/DD', 'YYYY-MM-DD ZZ']))
    assert.isTrue(Is.dateFormat(format(new Date(), 'YYYY-MM-DD Z'), ['YYYY/MM/DD', 'YYYY-MM-DD Z']))
  })

  test('return false when original input is missing format', (assert) => {
    assert.isFalse(Is.dateFormat(format(new Date(), 'YYYY-MM-DD'), ['YYYY/MM/DD', 'YYYY-MM-DD ZZ']))
    assert.isFalse(Is.dateFormat(format(new Date(), 'YYYY-MM-DD'), ['YYYY/MM/DD', 'YYYY-MM-DD Z']))
  })
})
