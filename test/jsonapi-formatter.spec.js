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
const JSONAPIFormatter = require('../src/Formatters/JSONAPI')

test.group('JSONAPI formatter', () => {
  test('add new error', (assert) => {
    const formatter = new JSONAPIFormatter()
    formatter.addError({ field: 'username', message: 'We need it', validation: 'required' })
    assert.deepEqual(formatter.errors, [
      {
        title: 'required',
        detail: 'We need it',
        source: {
          pointer: 'username'
        }
      }
    ])
  })

  test('return errors JSON', (assert) => {
    const formatter = new JSONAPIFormatter()
    formatter.addError({ field: 'username', message: 'We need it', validation: 'required' })
    assert.deepEqual(formatter.toJSON(), {
      errors: [
        {
          title: 'required',
          detail: 'We need it',
          source: {
            pointer: 'username'
          }
        }
      ]
    })
  })
})
