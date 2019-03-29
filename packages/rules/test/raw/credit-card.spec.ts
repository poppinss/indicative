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

test.group('raw | creditCard', () => {
  test('return false when input is not a valid credit card number', (assert) => {
    assert.isFalse(Is.creditCard('3685-1600-4490-1023'))
  })

  test('return false when input is not a valid credit card number', (assert) => {
    assert.isFalse(Is.creditCard('4444-4444-4444-4444'))
  })

  test('return false when input is not a valid credit card number without hyphens', (assert) => {
    assert.isFalse(Is.creditCard('4444444444444444'))
  })

  test('return true when input is a valid credit card number without hyphens', (assert) => {
    assert.isFalse(Is.creditCard('5031433215406351'))
  })

  test('return true when input is a valid credit card number', (assert) => {
    assert.isFalse(Is.creditCard('5031-4332-1540-6351'))
  })
})
