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

test.group('raw | affirmative', () => {
  test('return true when valid is affirmative', (assert) => {
    assert.isTrue(Is.affirmative('yes'))
    assert.isTrue(Is.affirmative(true))
    assert.isTrue(Is.affirmative('true'))
    assert.isTrue(Is.affirmative('ok'))
    assert.isTrue(Is.affirmative('okay'))
    assert.isTrue(Is.affirmative('y'))
    assert.isTrue(Is.affirmative('A'))
  })

  test('return true when valid is affirmative regardles off letter casing', (assert) => {
    assert.isTrue(Is.affirmative('YES'))
    assert.isTrue(Is.affirmative(true))
    assert.isTrue(Is.affirmative('TRUE'))
    assert.isTrue(Is.affirmative('OK'))
    assert.isTrue(Is.affirmative('OKAY'))
    assert.isTrue(Is.affirmative('Y'))
    assert.isTrue(Is.affirmative('A'))
  })

  test('return false when keyword is lowercase', (assert) => {
    assert.isFalse(Is.affirmative('a'))
  })
})
