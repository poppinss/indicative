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
import * as validations from '../src/validations'
import { RulesConfig } from '../src/Contracts'

const config: RulesConfig = {
  existyStrict: true,
  castValues: true,
}

const root = { original: {} }

test.group('Validations | dateFormat', () => {
  test('throw exception when date format is not defined', async (assert) => {
    const args: any[] = []
    const fn = () => validations.dateFormat.compile!(args)
    assert.throw(fn, 'dateFormat:make sure to define atleast one date format')
  })

  test('return args when date format is defined', async (assert) => {
    const args: any[] = ['YYYY/MM/DD']
    assert.deepEqual(validations.dateFormat.compile!(args), args)
  })

  test('return false when field value is not a valid date', async (assert) => {
    const data = { dob: '10th' }
    const field = 'dob'

    const args = ['YYYY/MM/DD']
    assert.isFalse(validations.dateFormat.validate(data, field, args, 'literal', root, config))
  })

  test('return false when value is a date but not with different format', async (assert) => {
    const data = { dob: '10-20-2015' }
    const field = 'dob'

    const args = ['YYYY/MM/DD']
    assert.isFalse(validations.dateFormat.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when field value is a valid date according to given format', async (assert) => {
    const data = { dob: '2015/10/20' }
    const field = 'dob'

    const args = ['YYYY/MM/DD']
    const result = validations.dateFormat.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('should match against multiple formats', async (assert) => {
    const data = { dob: '2015/10/20' }
    const field = 'dob'

    const args = ['YYYY-MM-DD', 'YYYY/MM/DD']
    const result = validations.dateFormat.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when time is missing from date', async (assert) => {
    const data = { dob: '2015/10/20' }
    const field = 'dob'
    const args = ['YYYY/MM/DD hh:mm:ss']

    assert.isFalse(validations.dateFormat.validate(data, field, args, 'literal', root, config))
  })

  test('return false when time format is different', async (assert) => {
    const data = { dob: '2015/10/20 23:33:34' }
    const field = 'dob'
    const args = ['YYYY/MM/DD hh:mm:ss']

    assert.isFalse(validations.dateFormat.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when time is in correct format', async (assert) => {
    const data = { dob: '2015/10/20 23:33:34' }
    const field = 'dob'
    const args = ['YYYY/MM/DD HH:mm:ss']

    const result = validations.dateFormat.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('ignore timezone when Z identifier is defined', async (assert) => {
    const data = { dob: '2015-10-20T23:33:34+05:30' }
    const field = 'dob'
    const args = ['YYYY-MM-DDTHH:mm:ssZ']

    const result = validations.dateFormat.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('ignore timezone when ZZ identifier is defined', async (assert) => {
    const data = { dob: '2015-10-20T23:33:34+0530' }
    const field = 'dob'
    const args = ['YYYY-MM-DDTHH:mm:ssZZ']

    const result = validations.dateFormat.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('fail when timezone is missing and Z identifier is used', async (assert) => {
    const data = { dob: '2015-10-20T23:33:34' }
    const field = 'dob'
    const args = ['YYYY-MM-DDTHH:mm:ssZ']

    assert.isFalse(validations.dateFormat.validate(data, field, args, 'literal', root, config))
  })

  test('fail when timezone is defined wrongly', async (assert) => {
    const data = { dob: '2015-10-20T23:33:34+5030' }
    const field = 'dob'
    const args = ['YYYY-MM-DDTHH:mm:ssZ']

    assert.isFalse(validations.dateFormat.validate(data, field, args, 'literal', root, config))
  })

  test('pass when Z identifier is used instead of offset', async (assert) => {
    const data = { dob: '2015-10-20T23:33:34Z' }
    const field = 'dob'
    const args = ['YYYY-MM-DDTHH:mm:ssZ']

    const result = validations.dateFormat.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('fail when Z identifier is used but with wrong timezone identifier', async (assert) => {
    const data = { dob: '2015-10-20T23:33:34Z' }
    const field = 'dob'
    const args = ['YYYY-MM-DDTHH:mm:ssZZ']

    assert.isFalse(validations.dateFormat.validate(data, field, args, 'literal', root, config))
  })

  test('pass when milliseconds are expected with timezone offset', async (assert) => {
    const data = { dob: '2015-10-20T23:33:34.231Z' }
    const field = 'dob'
    const args = ['YYYY-MM-DDTHH:mm:ss.SSSZ']

    const result = validations.dateFormat.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('fail when milliseconds are expected but they are incorrect', async (assert) => {
    const data = { dob: '2015-10-20T23:33:34.1050Z' }
    const field = 'dob'
    const args = ['YYYY-MM-DDTHH:mm:ss.SSSZ']

    assert.isFalse(validations.dateFormat.validate(data, field, args, 'literal', root, config))
  })
})
