'use strict'

/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import * as formatters from '../../src/formatters'

group('Vanilla Formatter', () => {
  test('add new error', (assert) => {
    const formatter = new formatters.Vanilla()
    formatter.addError('validation failed', 'username', 'required')
    assert.deepEqual(formatter.toJSON(), [
      {
        field: 'username',
        message: 'validation failed',
        validation: 'required'
      }
    ])
  })
})

group('JsonApi Formatter', () => {
  test('add new error', (assert) => {
    const formatter = new formatters.JsonApi()
    formatter.addError('validation failed', 'username', 'required')
    assert.deepEqual(formatter.toJSON(), [
      {
        source: { pointer: 'username' },
        detail: 'validation failed',
        title: 'required'
      }
    ])
  })
})
