'use strict'

/*
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const test = require('japa')
const VanillaFormatter = require('../src/Formatters/Vanilla')

test.group('Vanilla formatter', () => {
  test('add new error', (assert) => {
    const formatter = new VanillaFormatter()
    formatter.addError({ field: 'username', message: 'We need it' })
    assert.deepEqual(formatter.errors, [{ field: 'username', message: 'We need it' }])
  })

  test('returns errors JSON', (assert) => {
    const formatter = new VanillaFormatter()
    formatter.addError({ field: 'username', message: 'We need it' })
    assert.deepEqual(formatter.toJSON(), [{ field: 'username', message: 'We need it' }])
  })
})
