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

test.group('raw | email', () => {
  test('return false when input is not a valid email', (assert) => {
    assert.isFalse(Is.email('mail'))
  })

  test('return false when input is a url instead of email', (assert) => {
    assert.isFalse(Is.email('http://foo.com'))
  })

  test('return true when input is a valid email address', (assert) => {
    assert.isTrue(Is.email('someone@example.com'))
  })

  test('return true when input is a valid email address with different TLD', (assert) => {
    assert.isTrue(Is.email('someone@example.org'))
  })

  test('return true when input is a valid email address with 63 characters TLD', (assert) => {
    assert.isTrue(
      Is.email('someone@example.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijk'),
    )
  })
})
