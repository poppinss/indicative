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
import * as validations from '../../src/validations'
import { RulesConfig } from '../../src/Contracts'

const config: RulesConfig = {
  existyStrict: true,
  castValues: true,
}

const root = { original: {} }

test.group('Validations | date', () => {
  test('return false when field value is not a string or date', async (assert) => {
    const data = {
      field1: '10th',
      field2: {},
      field3: [],
      field4: false,
      field5: 1,
    }

    const args: any[] = []

    assert.isFalse(validations.date.validate(data, 'field1', args, 'literal', root, config))
    assert.isFalse(validations.date.validate(data, 'field2', args, 'literal', root, config))
    assert.isFalse(validations.date.validate(data, 'field3', args, 'literal', root, config))
    assert.isFalse(validations.date.validate(data, 'field4', args, 'literal', root, config))
    assert.isFalse(validations.date.validate(data, 'field5', args, 'literal', root, config))

    assert.deepEqual(data, {
      field1: '10th',
      field2: {},
      field3: [],
      field4: false,
      field5: 1,
    })
  })

  test('cast iso string to date', async (assert) => {
    const data: { dob: any } = { dob: '2015-10-20' }
    const field = 'dob'

    const args: any[] = []
    const result = validations.date.validate(data, field, args, 'literal', root, config)

    assert.isTrue(result)
    assert.instanceOf(data.dob, Date)
    assert.equal((data.dob as Date).getDate(), 20)
    assert.equal((data.dob as Date).getMonth(), 9)
    assert.equal((data.dob as Date).getFullYear(), 2015)
  })

  test('cast short date string to date', async (assert) => {
    const data: { dob: any } = { dob: '10/20/2015' }
    const field = 'dob'

    const args: any[] = []
    const result = validations.date.validate(data, field, args, 'literal', root, config)

    assert.isTrue(result)
    assert.instanceOf(data.dob, Date)
    assert.equal((data.dob as Date).getDate(), 20)
    assert.equal((data.dob as Date).getMonth(), 9)
    assert.equal((data.dob as Date).getFullYear(), 2015)
  })

  test('cast long date string to date', async (assert) => {
    const data: { dob: any } = { dob: 'Oct 20 2015' }
    const field = 'dob'

    const args: any[] = []
    const result = validations.date.validate(data, field, args, 'literal', root, config)

    assert.isTrue(result)
    assert.instanceOf(data.dob, Date)
    assert.equal((data.dob as Date).getDate(), 20)
    assert.equal((data.dob as Date).getMonth(), 9)
    assert.equal((data.dob as Date).getFullYear(), 2015)
  })
})
