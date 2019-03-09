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
import { subYears, addMonths } from 'date-fns'
import { config } from '../src/config'

const root = { original: {} }

test.group('Validations | required', () => {
  test('return false when field is not defined', async (assert) => {
    const data = {}
    const field = 'name'
    const args: any[] = []
    assert.isFalse(validations.required.validate(data, field, args, 'literal', root, config))
  })

  test('return false when field is defined but empty', async (assert) => {
    const data = { name: '' }
    const field = 'name'

    const args: any[] = []
    assert.isFalse(validations.required.validate(data, field, args, 'literal', root, config))
  })

  test('return true when field is defined and has value', async (assert) => {
    const data = { name: 'virk' }
    const field = 'name'

    const args: any[] = []
    const result = validations.required.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return true when field is defined and has boolean negative value', async (assert) => {
    const data = { name: false }
    const field = 'name'

    const args: any[] = []
    const result = validations.required.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return true when field is defined and has numeric value', async (assert) => {
    const data = { name: 0 }
    const field = 'name'

    const args: any[] = []
    const result = validations.required.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | email', () => {
  test('should return false when field is defined and does not have valid email', async (assert) => {
    const data = { email: 'virk' }
    const field = 'email'

    const args: any[] = []
    assert.isFalse(validations.email.validate(data, field, args, 'literal', root, config))
  })

  test('should return false when field is defined as negative boolean', async (assert) => {
    const data = { email: false }
    const field = 'email'

    const args: any[] = []
    assert.isFalse(validations.email.validate(data, field, args, 'literal', root, config))
  })

  test('should return false when field is defined as 0', async (assert) => {
    const data = { email: 0 }
    const field = 'email'

    const args: any[] = []
    assert.isFalse(validations.email.validate(data, field, args, 'literal', root, config))
  })

  test('skip email validation when email field does not exists', async (assert) => {
    const data = {}
    const field = 'email'

    const args: any[] = []
    const result = validations.email.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when valid email is provided', async (assert) => {
    const data = { email: 'foo@bar.com' }
    const field = 'email'

    const args: any[] = []
    const result = validations.email.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when valid email with extension is provided', async (assert) => {
    const data = { email: 'foo+baz@bar.com' }
    const field = 'email'

    const args: any[] = []
    const result = validations.email.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | Accepted', () => {
  test('should return false when field is defined but not accepted', async (assert) => {
    const data = { terms: false }
    const field = 'terms'

    const args: any[] = []
    assert.isFalse(validations.accepted.validate(data, field, args, 'literal', root, config))
  })

  test('work fine validation when field is defined and accepted using true', async (assert) => {
    const data = { terms: true }
    const field = 'terms'

    const args: any[] = []
    const result = validations.accepted.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine validation when field is defined and accepted using string', async (assert) => {
    const data = { terms: 'okay' }
    const field = 'terms'

    const args: any[] = []
    const result = validations.accepted.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field is not present or is undefined', async (assert) => {
    const data = {}
    const field = 'terms'

    const args: any[] = []
    const result = validations.accepted.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | after', () => {
  test('throw exception when after value is not defined', async (assert) => {
    const args: any[] = []
    const fn = () => validations.after.compile!(args)
    assert.throw(fn, 'after: make sure to define the after date')
  })

  test('return args as it when has after date', async (assert) => {
    const args: any[] = ['2010-11-20']
    assert.deepEqual(validations.after.compile!(args), args)
  })

  test('return false when date is not after defined date', async (assert) => {
    const data = { dob: '1980-11-20' }
    const field = 'dob'

    const args = ['2010-11-20']
    assert.isFalse(validations.after.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is after defined date', async (assert) => {
    const data = { dob: '2011-01-01' }
    const field = 'dob'

    const args = ['2010-11-20']
    const result = validations.after.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when dob is not defined', async (assert) => {
    const data = {}
    const field = 'dob'

    const args = ['2010-11-20']
    const result = validations.after.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | alpha', () => {
  test('return false when value is not alpha', async (assert) => {
    const data = { username: 'virk1234' }
    const field = 'username'

    const args: any[] = []
    assert.isFalse(validations.alpha.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is a valid alpha', async (assert) => {
    const data = { username: 'virk' }
    const field = 'username'

    const args: any[] = []
    const result = validations.alpha.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'username'

    const args: any[] = []
    const result = validations.alpha.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { username: undefined }
    const field = 'username'

    const args: any[] = []
    const result = validations.alpha.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | before', () => {
  test('throw exception when before value is missing', async (assert) => {
    const args: any[] = []
    const fn = () => validations.before.compile!(args)
    assert.throw(fn, 'before: make sure to define the before date')
  })

  test('return args whe before value is defined', async (assert) => {
    const args: any[] = ['2010-11-20']
    assert.equal(validations.before.compile!(args), args)
  })

  test('return false when date is not before defined date', async (assert) => {
    const data = { dob: '2012-11-20' }
    const field = 'dob'

    const args = ['2010-11-20']
    assert.isFalse(validations.before.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is before defined date', async (assert) => {
    const data = { dob: '2009-01-01' }
    const field = 'dob'

    const args = ['2010-11-20']
    const result = validations.before.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when dob is not defined', async (assert) => {
    const data = {}
    const field = 'dob'

    const args = ['2010-11-20']
    const result = validations.before.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when dob is undefined', async (assert) => {
    const data = { dob: undefined }
    const field = 'dob'

    const args = ['2010-11-20']
    const result = validations.before.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | date', () => {
  test('return false when field value is not a valid date', async (assert) => {
    const data = { dob: '10th' }
    const field = 'dob'

    const args: any[] = []
    assert.isFalse(validations.date.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value of field is a valid date', async (assert) => {
    const data = { dob: '2015-10-20' }
    const field = 'dob'

    const args: any[] = []
    const result = validations.date.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value of field is a valid date but with a differen date format', async (assert) => {
    const data = { dob: '10/20/2015' }
    const field = 'dob'

    const args: any[] = []
    const result = validations.date.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'dob'

    const args: any[] = []
    const result = validations.date.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { dob: undefined }
    const field = 'dob'

    const args: any[] = []
    const result = validations.date.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | dateFormat', () => {
  test('throw exception when date format is not defined', async (assert) => {
    const args: any[] = []
    const fn = () => validations.dateFormat.compile!(args)
    assert.throw(fn, 'dateFormat: make sure to define atleast one date format')
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

  test('skip validation when field is not available', async (assert) => {
    const data = {}
    const field = 'dob'

    const args = ['YYYY/MM/DD']
    const result = validations.dateFormat.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field is undefined', async (assert) => {
    const data = { dob: undefined }
    const field = 'dob'

    const args = ['YYYY/MM/DD']
    const result = validations.dateFormat.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when time is missing from date', async (assert) => {
    assert.plan(1)

    const data = { dob: '2015/10/20' }
    const field = 'dob'
    const args = ['YYYY/MM/DD hh:mm:ss']

    assert.isFalse(validations.dateFormat.validate(data, field, args, 'literal', root, config))
  })

  test('return false when time format is different', async (assert) => {
    assert.plan(1)

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
    assert.plan(1)

    const data = { dob: '2015-10-20T23:33:34' }
    const field = 'dob'
    const args = ['YYYY-MM-DDTHH:mm:ssZ']

    assert.isFalse(validations.dateFormat.validate(data, field, args, 'literal', root, config))
  })

  test('fail when timezone is defined wrongly', async (assert) => {
    assert.plan(1)

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
    assert.plan(1)

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
    assert.plan(1)

    const data = { dob: '2015-10-20T23:33:34.1050Z' }
    const field = 'dob'
    const args = ['YYYY-MM-DDTHH:mm:ss.SSSZ']

    assert.isFalse(validations.dateFormat.validate(data, field, args, 'literal', root, config))
  })
})

test.group('Validations | in', () => {
  test('throw exception when `in` collection is not defined', async (assert) => {
    const args = []
    const fn = () => validations.in.compile!(args)
    assert.throw(fn, 'in: make sure to define search collection')
  })

  test('returns args as it is when valid', async (assert) => {
    const args = ['foo', 'bar']
    assert.deepEqual(validations.in.compile!(args), args)
  })

  test('return false when field value is not in defined fields', async (assert) => {
    const data = { gender: 'Foo' }
    const field = 'gender'

    const args = ['F', 'M', 'O']
    assert.isFalse(validations.in.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value of field is under one of the defined values', async (assert) => {
    const data = { gender: 'F' }
    const field = 'gender'

    const args = ['F', 'M', 'O']
    const result = validations.in.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when expected values are integer', async (assert) => {
    const data = { marks: 10 }
    const field = 'marks'

    const args = [10, 20, 40]
    const result = validations.in.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'marks'

    const args = [10, 20, 40]
    const result = validations.in.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { marks: undefined }
    const field = 'marks'

    const args = [10, 20, 40]
    const result = validations.in.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | notIn', () => {
  test('throw exception when notIn collection is not defined', async (assert) => {
    const args = []
    const fn = () => validations.notIn.compile!(args)
    assert.throw(fn, 'notIn: make sure to define search collection')
  })

  test('return args as it is when valid', async (assert) => {
    const args = ['admin', 'super', 'root']
    assert.deepEqual(validations.notIn.compile!(args), args)
  })

  test('return false when field value is in defined fields', async (assert) => {
    const data = { username: 'admin' }
    const field = 'username'

    const args = ['admin', 'super', 'root']
    assert.isFalse(validations.notIn.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when field value is not one of the given options', async (assert) => {
    const data = { username: 'foo' }
    const field = 'username'

    const args = ['admin', 'super', 'root']
    const result = validations.notIn.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field is undefined', async (assert) => {
    const data = {}
    const field = 'username'

    const args = ['admin', 'super', 'root']
    const result = validations.notIn.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { username: undefined }
    const field = 'username'

    const args = ['admin', 'super', 'root']
    const result = validations.notIn.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | requiredIf', () => {
  test('throw exception when conditional field is not defined', async (assert) => {
    const args = []
    const fn = () => validations.requiredIf.compile!(args)
    assert.throw(fn, 'requiredIf: make sure to define target field')
  })

  test('return args as it is when validates successfully', async (assert) => {
    const args = ['password']
    assert.deepEqual(validations.requiredIf.compile!(args), args)
  })

  test('skip validation when conditional field does not exists', async (assert) => {
    const data = {}
    const field = 'password_confirm'

    const args = ['password']
    const result = validations.requiredIf.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when conditional field exists and field under validation is missing', async (assert) => {
    const data = { password: 'foobar' }
    const field = 'password_confirm'

    const args = ['password']
    assert.isFalse(validations.requiredIf.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when conditional field is null', async (assert) => {
    const data = { password: null }
    const field = 'password_confirm'

    const args = ['password']
    const result = validations.requiredIf.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when field under validation is available', async (assert) => {
    const data = { password: 'foobar', 'password_confirm': 'foobar' }
    const field = 'password_confirm'

    const args = ['password']
    const result = validations.requiredIf.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | requiredWithAny', () => {
  test('throw exception when conditional field is not defined', async (assert) => {
    const args = []
    const fn = () => validations.requiredWithAny.compile!(args)
    assert.throw(fn, 'requiredWithAny: make sure to define one or more target fields')
  })

  test('return args as it is when validates successfully', async (assert) => {
    const args = ['username', 'email']
    assert.deepEqual(validations.requiredWithAny.compile!(args), args)
  })

  test('work fine when none of the targeted fields are present', async (assert) => {
    const data = {}
    const field = 'password'

    const args = ['username', 'email']
    const result = validations.requiredWithAny.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when targeted fields are present but actual field is missing', async (assert) => {
    const data = { username: 'foo' }
    const field = 'password'

    const args = ['username', 'email']
    assert.isFalse(validations.requiredWithAny.validate(data, field, args, 'literal', root, config))
  })

  test('return false when targeted fields are present but actual field value is null', async (assert) => {
    const data = { username: 'foo', password: null }
    const field = 'password'
    const args = ['username', 'email']

    assert.isFalse(validations.requiredWithAny.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when targeted fields are present and actual field value is valid', async (assert) => {
    const data = { username: 'foo', password: 'bar' }
    const field = 'password'
    const args = ['username', 'email']

    const result = validations.requiredWithAny.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | requiredWithAll', () => {
  test('throw exception when with fields are missing', async (assert) => {
    const args = []
    const fn = () => validations.requiredWithAll.compile!(args)
    assert.throw(fn, 'requiredWithAll: make sure to define one or more target fields')
  })

  test('return args when with fields are defined', async (assert) => {
    const args = ['username', 'email']
    assert.deepEqual(validations.requiredWithAll.compile!(args), args)
  })

  test('work fine when none of the targeted fields are present', async (assert) => {
    const data = {}
    const field = 'password'

    const args = ['username', 'email']
    const result = validations.requiredWithAll.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when all targeted fields are present but actual is missing', async (assert) => {
    assert.plan(1)

    const data = { username: 'foo', 'email': 'foo@bar.com' }
    const field = 'password'

    const args = ['username', 'email']
    assert.isFalse(validations.requiredWithAll.validate(data, field, args, 'literal', root, config))
  })

  test('return false when all targeted fields are present but actual field value is null', async (assert) => {
    assert.plan(1)

    const data = { username: 'foo', email: 'foo@bar.com', password: null }
    const field = 'password'

    const args = ['username', 'email']
    assert.isFalse(validations.requiredWithAll.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when all the targeted fields and actual field is defined', async (assert) => {
    const data = { username: 'foo', password: 'bar', 'email': 'foo@bar.com' }
    const field = 'password'

    const args = ['username', 'email']
    const result = validations.requiredWithAll.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when targeted fields and actual field are missing', async (assert) => {
    const data = { username: 'foo' }
    const field = 'password'

    const args = ['username', 'email']
    const result = validations.requiredWithAll.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | requiredWithoutAny', () => {
  test('throw exception when conditional field is not defined', async (assert) => {
    const args = []
    const fn = () => validations.requiredWithoutAny.compile!(args)
    assert.throw(fn, 'requiredWithoutAny: make sure to define one or more target fields')
  })

  test('return args as it is when validates successfully', async (assert) => {
    const args = ['username', 'email']
    assert.deepEqual(validations.requiredWithoutAny.compile!(args), args)
  })

  test('work fine when all the targeted fields are present', async (assert) => {
    const data = { username: 'foo', email: 'foo@bar.com' }
    const field = 'password'

    const args = ['username', 'email']
    const result = validations.requiredWithoutAny.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when targeted fields and actual field are missing', async (assert) => {
    assert.plan(1)
    const data = { username: 'foo' }
    const field = 'password'

    const args = ['username', 'email']
    assert.isFalse(validations.requiredWithoutAny.validate(data, field, args, 'literal', root, config))
  })

  test('return false when targeted fields are missing and actual field is null', async (assert) => {
    assert.plan(1)
    const data = { username: 'foo', password: null }
    const field = 'password'

    const args = ['username', 'email']
    assert.isFalse(validations.requiredWithoutAny.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when the targeted fields are missing and actual field is valid', async (assert) => {
    const data = { password: 'foobar' }
    const field = 'password'

    const args = ['username', 'email']
    const result = validations.requiredWithoutAny.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | requiredWithoutAll', () => {
  test('throw exception when conditional field is not defined', async (assert) => {
    const args = []
    const fn = () => validations.requiredWithoutAll.compile!(args)
    assert.throw(fn, 'requiredWithoutAll: make sure to define one or more target fields')
  })

  test('return args as it is when validates successfully', async (assert) => {
    const args = ['username', 'email']
    assert.deepEqual(validations.requiredWithoutAll.compile!(args), args)
  })

  test('work fine when all the targeted fields are present', async (assert) => {
    const data = { username: 'foo', email: 'foo@bar.com' }
    const field = 'password'

    const args = ['username', 'email']
    const result = validations.requiredWithoutAll.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when all the targeted fields are missing and actual field is missing', async (assert) => {
    const data = {}
    const field = 'password'

    const args = ['username', 'email']
    assert.isFalse(validations.requiredWithoutAll.validate(data, field, args, 'literal', root, config))
  })

  test('return false when all the targeted fields are missing and actual field is null', async (assert) => {
    const data = { password: null }
    const field = 'password'

    const args = ['username', 'email']
    assert.isFalse(validations.requiredWithoutAll.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when all the targeted fields are missing and actual field is valid', async (assert) => {
    const data = { password: 'foobar' }
    const field = 'password'

    const args = ['username', 'email']
    const result = validations.requiredWithoutAll.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when targeted fields and actual field are not present', async (assert) => {
    const data = { username: 'foo' }
    const field = 'password'

    const args = ['username', 'email']
    const result = validations.requiredWithoutAll.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | same', () => {
  test('throw exception when comparison field is missing', async (assert) => {
    const args = []
    const fn = () => validations.same.compile!(args)
    assert.throw(fn, 'same: make sure to define comparison field')
  })

  test('return args as it is when valid', async (assert) => {
    const args = ['password']
    assert.deepEqual(validations.same.compile!(args), args)
  })

  test('return false when value of targeted field is not equal to defined field', async (assert) => {
    const data = { password: 'foo', 'password_confirm': 'bar' }
    const field = 'password_confirm'

    const args = ['password']
    assert.isFalse(validations.same.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when target field does not exists', async (assert) => {
    const data = {'password_confirm': 'bar'}
    const field = 'password_confirm'

    const args = ['password']
    const result = validations.same.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when actual field does not exists', async (assert) => {
    const data = {}
    const field = 'password_confirm'

    const args = ['password']
    const result = validations.same.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value for both field matches', async (assert) => {
    const data = { password: 'foo', password_confirm: 'foo' }
    const field = 'password_confirm'

    const args = ['password']
    const result = validations.same.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when targeted field value exists but actual field does not exists', async (assert) => {
    const data = { password: 'foo' }
    const field = 'password_confirm'

    const args = ['password']
    const result = validations.same.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | equals', () => {
  test('throw exception when comparison value is missing', async (assert) => {
    const args: any[] = []
    const fn = () => validations.equals.compile!(args)
    assert.throw(fn, 'equals: make sure to define the comparison string')
  })

  test('returns args as it is when valid', async (assert) => {
    const args = ['bar']
    assert.deepEqual(validations.equals.compile!(args), args)
  })

  test('return false when value of targeted field is not equal to defined value', async (assert) => {
    const data = { title: 'foo' }
    const field = 'title'

    const args = ['bar']
    assert.isFalse(validations.equals.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'title'

    const args = ['bar']
    const result = validations.equals.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { title: undefined }
    const field = 'title'

    const args = ['bar']
    const result = validations.equals.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value for field matches to defined value', async (assert) => {
    const data = { title: 'bar' }
    const field = 'title'

    const args = ['bar']
    const result = validations.equals.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when then under validation is a number', async (assert) => {
    const data = { age: 18 }
    const field = 'age'
    const args = ['18']

    const result = validations.equals.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | notEquals', () => {
  test('throw erorr when comparison arg is missing', async (assert) => {
    const args = []
    const fn = () => validations.notEquals.compile!(args)
    assert.throw(fn, 'notEquals: make sure to define comparison value')
  })

  test('return args as it is when valid', async (assert) => {
    const args = ['bar']
    assert.deepEqual(validations.notEquals.compile!(args), args)
  })

  test('return false when value of targeted field is equal to defined value', async (assert) => {
    const data = { title: 'bar' }
    const field = 'title'

    const args = ['bar']
    assert.isFalse(validations.notEquals.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'title'

    const args = ['bar']
    const result = validations.notEquals.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { title: undefined }
    const field = 'title'

    const args = ['bar']
    const result = validations.notEquals.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value for field does not matches to defined value', async (assert) => {
    const data = { title: 'foo' }
    const field = 'title'

    const args = ['bar']
    const result = validations.notEquals.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | different', () => {
  test('throw exception when comparison value is missing', async (assert) => {
    const args: any[] = []
    const fn = () => validations.different.compile!(args)
    assert.throw(fn, 'different: make sure to define target field for comparison')
  })

  test('return args as it is when valid', async (assert) => {
    const args: any[] = ['dob']
    assert.deepEqual(validations.different.compile!(args), args)
  })

  test('return false when value of targeted field is equal to defined field', async (assert) => {
    const data = { dob: '2011-20-10', enrollment_date: '2011-20-10' }
    const field = 'enrollment_date'

    const args = ['dob']
    assert.isFalse(validations.different.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when target field does not exists', async (assert) => {
    const data = {'enrollment_date': '2011-20-10'}
    const field = 'enrollment_date'

    const args = ['dob']
    const result = validations.different.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when actual field does not exists', async (assert) => {
    const data = {}
    const field = 'enrollment_date'

    const args = ['dob']
    const result = validations.different.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value for both fields are different', async (assert) => {
    const data = { dob: '2011-20-10', 'enrollment_date': '2011-20-20' }
    const field = 'enrollment_date'

    const args = ['dob']
    const result = validations.different.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when targeted field value exists but actual field does not exists', async (assert) => {
    const data = { dob: '2011-20-10' }
    const field = 'enrollment_date'

    const args = ['dob']
    const result = validations.different.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | range', () => {
  test('return false when value of field is less then defined range', async (assert) => {
    const data = { age: 16 }
    const field = 'age'

    const args = [18, 60]
    assert.isFalse(validations.range.validate(data, field, args, 'literal', root, config))
  })

  test('return false when value of field is greater then defined range', async (assert) => {
    const data = { age: 61 }
    const field = 'age'

    const args = [18, 60]
    assert.isFalse(validations.range.validate(data, field, args, 'literal', root, config))
  })

  test('throw exception when max value is not defined', async (assert) => {
    const args = [18]
    const fn = () => validations.range.compile!(args)
    assert.throw(fn, 'range: make sure to define min and max values')
  })

  test('throw exception when min value is not null', async (assert) => {
    const args = [null, 60]
    const fn = () => validations.range.compile!(args)
    assert.throw(fn, 'range: min and max values must be defined as integers')
  })

  test('throw exception when max value is not null', async (assert) => {
    const args = [60, null]
    const fn = () => validations.range.compile!(args)
    assert.throw(fn, 'range: min and max values must be defined as integers')
  })

  test('should not throw an error when min value is zero', async (assert) => {
    const args = [0, 60]
    const result = validations.range.compile!(args)
    assert.deepEqual(result, args)
  })

  test('should not throw an error when max value is zero', async (assert) => {
    const data = { temp: -5 }
    const field = 'temp'

    const args = [-10, 0]
    const result = validations.range.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'age'

    const args = [18, 60]
    const result = validations.range.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { age: undefined }
    const field = 'age'

    const args = [18, 60]
    const result = validations.range.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when field value is under defined range', async (assert) => {
    const data = { age: 20 }
    const field = 'age'

    const args = [18, 60]
    const result = validations.range.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | min', () => {
  test('throw exception when min value is missing', async (assert) => {
    const args = []
    const fn = () => validations.min.compile!(args)
    assert.throw(fn, 'min: make sure to define min length')
  })

  test('throw exception when min value is not castable to number', async (assert) => {
    const args = ['foo']
    const fn = () => validations.min.compile!(args)
    assert.throw(fn, 'min: length must be defined as an integer')
  })

  test('cast max value to number when is defined in args', async (assert) => {
    const args = ['6']
    assert.deepEqual(validations.min.compile!(args), [6])
  })

  test('return false when length of field is less than defined length', async (assert) => {
    const data = { password: 'foo' }
    const field = 'password'
    const args = [6]

    assert.isFalse(validations.min.validate(data, field, args, 'literal', root, config))
  })

  test('return false when length of field as number is less than defined length', async (assert) => {
    const data = { password: 990 }
    const field = 'password'
    const args = [6]

    assert.isFalse(validations.min.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'password'
    const args = [6]

    const result = validations.min.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { password: undefined }
    const field = 'password'
    const args = [6]

    const result = validations.min.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when length of value of field is greater than defined length', async (assert) => {
    const data = { password: 'foobarbaz' }
    const field = 'password'
    const args = [6]

    const result = validations.min.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when length of value of field is equal to the defined length', async (assert) => {
    const data = { password: 'foobar' }
    const field = 'password'
    const args = [6]

    const result = validations.min.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when length of array is less than defined number', async (assert) => {
    const data = {options: ['yes']}
    const field = 'options'

    const args = [2]
    assert.isFalse(validations.min.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when length of array is equal or over than defined number', async (assert) => {
    const data = {options: ['yes', 'no']}
    const field = 'options'
    const args = [2]

    const result = validations.min.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | max', () => {
  test('throw exception when max value is missing', async (assert) => {
    const args = []
    const fn = () => validations.max.compile!(args)
    assert.throw(fn, 'max: make sure to define max length')
  })

  test('throw exception when max value is not castable to number', async (assert) => {
    const args = ['foo']
    const fn = () => validations.max.compile!(args)
    assert.throw(fn, 'max: length must be defined as an integer')
  })

  test('cast max value to number when is defined in args', async (assert) => {
    const args = ['6']
    assert.deepEqual(validations.max.compile!(args), [6])
  })

  test('return false when length of field is greater than defined length', async (assert) => {
    const data = { password: 'foobarbaz' }
    const field = 'password'
    const args = [6]

    assert.isFalse(validations.max.validate(data, field, args, 'literal', root, config))
  })

  test('return false when length of field as number is greater than defined length', async (assert) => {
    const data = { password: 1990909990 }
    const field = 'password'
    const args = [6]

    assert.isFalse(validations.max.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'password'
    const args = [6]

    const result = validations.max.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { password: undefined }
    const field = 'password'
    const args = [6]

    const result = validations.max.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when length of value of field is less than defined length', async (assert) => {
    const data = { password: 'foo' }
    const field = 'password'
    const args = [6]

    const result = validations.max.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when length of value of field is equal to the defined length', async (assert) => {
    const data = { password: 'foobar' }
    const field = 'password'
    const args = [6]

    const result = validations.max.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when array length exceeds the max number', async (assert) => {
    const data = {users: ['virk', 'nikk', 'joe']}
    const field = 'users'

    const args = [2]
    assert.isFalse(validations.max.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when array length is within the max number', async (assert) => {
    const data = {users: ['virk', 'nikk']}
    const field = 'users'

    const args = [2]
    const result = validations.max.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | above', () => {
  test('return false when value of field is less than defined value', async (assert) => {
    const data = { age: 16 }
    const field = 'age'
    const args = [17]

    assert.isFalse(validations.above.validate(data, field, args, 'literal', root, config))
  })

  test('return false when value of field is equal to the defined value', async (assert) => {
    const data = { age: 17 }
    const field = 'age'
    const args = [17]

    assert.isFalse(validations.above.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'age'
    const args = [17]

    const result = validations.above.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { age: undefined }
    const field = 'age'
    const args = [17]

    const result = validations.above.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value of field is greater than defined value', async (assert) => {
    const data = { age: 18 }
    const field = 'age'
    const args = [17]

    const result = validations.above.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('throw exception when comparison value is not defined', async (assert) => {
    const args: any[] = []
    const fn = () => validations.above.compile!(args)
    assert.throw(fn, 'above:make sure to define minValue')
  })

  test('returns args as number when defined', async (assert) => {
    const args: any[] = ['22']
    assert.deepEqual(validations.above.compile!(args), [22])
  })

  test('pass when values are in strings and user value is over expected value', async (assert) => {
    const data = { age: '18' }
    const field = 'age'

    const args = ['17']

    const result = validations.above.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('fail when values are in strings and user value is under expected value', async (assert) => {
    const data = { age: 16 }
    const field = 'age'
    const args = ['17']

    assert.isFalse(validations.above.validate(data, field, args, 'literal', root, config))
  })
})

test.group('Validations | under', () => {
  test('throw exception when under value is missing args', async (assert) => {
    const args = []
    const fn = () => validations.under.compile!(args)
    assert.throw(fn, 'under: make sure to define max value')
  })

  test('cast under value to integer', async (assert) => {
    const args = ['10']
    assert.deepEqual(validations.under.compile!(args), [10])
  })

  test('return false when value of field is greater than defined value', async (assert) => {
    const data = { age: 11 }
    const field = 'age'
    const args = [10]

    assert.isFalse(validations.under.validate(data, field, args, 'literal', root, config))
  })

  test('return false when value of field is equal to the defined value', async (assert) => {
    const data = { age: 10 }
    const field = 'age'
    const args = [10]

    assert.isFalse(validations.under.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'age'
    const args = [10]

    const result = validations.under.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { age: undefined }
    const field = 'age'
    const args = [10]

    const result = validations.under.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value of field is less than defined value', async (assert) => {
    const data = { age: 8 }
    const field = 'age'
    const args = [10]

    const result = validations.under.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | includes', () => {
  test('throw exception when `includes` collection is missing', async (assert) => {
    const args = []
    const fn = () => validations.includes.compile!(args)
    assert.throw(fn, 'includes: make sure to define value to match')
  })

  test('return args as it is when it is valid', async (assert) => {
    const args = ['app']
    assert.deepEqual(validations.includes.compile!(args), args)
  })

  test('return false when string does not include defined substring', async (assert) => {
    const data = { dpath: 'foo/bar' }
    const field = 'dpath'
    const args = ['app']

    assert.isFalse(validations.includes.validate(data, field, args, 'literal', root, config))
  })

  test('return false when string does not include defined substring', async (assert) => {
    const data = { dpath: 'foo/bar' }
    const field = 'dpath'
    const args = ['app']

    assert.isFalse(validations.includes.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'dpath'

    const args = ['app']
    const result = validations.includes.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { dpath: undefined }
    const field = 'dpath'

    const args = ['app']
    const result = validations.includes.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when field value includes given string', async (assert) => {
    const data = { dpath: '/app/bar' }
    const field = 'dpath'

    const args = ['app']
    const result = validations.includes.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | startsWith', () => {
  test('throw exception when substring arg is not defined', async (assert) => {
    const args = []
    const fn = () => validations.startsWith.compile!(args)

    assert.throw(fn, 'startsWith: make sure to define substring')
  })

  test('returns args as it is when valid', async (assert) => {
    const args = ['D']
    assert.deepEqual(validations.startsWith.compile!(args), args)
  })

  test('return false when string does not startsWith defined substring', async (assert) => {
    const data = { username: 'foo' }
    const field = 'username'

    const args = ['D']
    assert.isFalse(validations.startsWith.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'username'

    const args = ['D']
    const result = validations.startsWith.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { username: undefined }
    const field = 'username'

    const args = ['D']
    const result = validations.startsWith.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when field value startsWith given string', async (assert) => {
    const data = { username: 'Doe' }
    const field = 'username'

    const args = ['D']
    const result = validations.startsWith.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | endsWith', () => {
  test('throw exception when substring is missing', async (assert) => {
    const args: any[] = []
    const fn = () => validations.endsWith.compile!(args)
    assert.throw(fn, 'endsWith: make sure to define substring')
  })

  test('return args as it is when valid', async (assert) => {
    const args: any[] = ['e']
    assert.deepEqual(validations.endsWith.compile!(args), args)
  })

  test('return false when string does not endsWith defined substring', async (assert) => {
    const data = { username: 'foo' }
    const field = 'username'

    const args = ['e']
    assert.isFalse(validations.endsWith.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'username'

    const args = ['e']
    const result = validations.endsWith.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { username: undefined }
    const field = 'username'

    const args = ['e']
    const result = validations.endsWith.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when field value endsWith given string', async (assert) => {
    const data = { username: 'Doe' }
    const field = 'username'

    const args = ['e']
    const result = validations.endsWith.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | regex', () => {
  test('throw exception when regex pattern is missing', async (assert) => {
    const args = []
    const fn = () => validations.regex.compile!(args)
    assert.throw(fn, 'regex: make sure to define regex pattern')
  })

  test('compile regex string pattern to regex argument', async (assert) => {
    const args = ['[a-z]', 'i']
    const result = validations.regex.compile!(args)
    assert.deepEqual(result, [new RegExp(args[0], args[1])])
  })

  test('use regex pattern as it is', async (assert) => {
    const args = [/[a-z]/, 'i']
    const result = validations.regex.compile!(args)
    assert.deepEqual(result, [/[a-z]/])
  })

  test('return false when value does not match regex', async (assert) => {
    const data = {email: 'foo'}
    const field = 'email'

    const args = [/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/]
    assert.isFalse(validations.regex.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when fields does not exists', async (assert) => {
    const data = {}
    const field = 'country'

    const args = ['[a-z]']
    const result = validations.regex.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when fields value is undefined', async (assert) => {
    const data = {country: undefined}
    const field = 'country'

    const args = ['[a-z]']
    const result = validations.regex.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return true when value matches regex', async (assert) => {
    const data = { email: 'foo@gmail.com' }
    const field = 'email'

    const args = [/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/]
    assert.isTrue(validations.regex.validate(data, field, args, 'literal', root, config))
  })
})

test.group('Validations | alphaNumeric', () => {
  test('return false when value is not alpha numeric', async (assert) => {
    const data = { username: 'virk@123' }
    const field = 'username'
    const args: any[] = []

    assert.isFalse(validations.alphaNumeric.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is a valid alpha numeric', async (assert) => {
    const data = { username: 'virk123' }
    const field = 'username'

    const args: any[] = []
    const result = validations.alphaNumeric.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'username'

    const args: any[] = []
    const result = validations.alphaNumeric.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { username: undefined }
    const field = 'username'

    const args: any[] = []
    const result = validations.alphaNumeric.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | array', () => {
  test('return false when value is not a valid array', async (assert) => {
    const data = {users: 'foo'}
    const field = 'users'
    const args: any[] = []

    assert.isFalse(validations.array.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is a valid array', async (assert) => {
    const data = {users: ['doe', 'foo', 'bar']}
    const field = 'users'

    const args: any[] = []
    const result = validations.array.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'users'

    const args: any[] = []
    const result = validations.array.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {users: undefined}
    const field = 'users'

    const args: any[] = []
    const result = validations.array.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when value of field is an object', async (assert) => {
    const data = {users: {name: 'foo'}}
    const field = 'users'

    const args: any[] = []
    assert.isFalse(validations.array.validate(data, field, args, 'literal', root, config))
  })
})

test.group('Validations | subset', () => {
  test('throw exception when subset values are missing', async (assert) => {
    const args = []
    const fn = () => validations.subset.compile!(args)
    assert.throw(fn, 'subset: make sure to define subset collection')
  })

  test('returns args as it is when valdi', async (assert) => {
    const args = ['author', 'comments', 'related-articles']
    assert.deepEqual(validations.subset.compile!(args), args)
  })

  test('work fine when value is a subset of given superset', async (assert) => {
    const data = { include: ['author'] }
    const field = 'include'

    const args = ['author', 'comments', 'related-articles']
    const result = validations.subset.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value is a comma delimited string', async (assert) => {
    const data = { include: 'author,comments' }
    const field = 'include'

    const args = ['author', 'comments', 'related-articles']
    const result = validations.subset.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when value is not a subset of given superset', async (assert) => {
    const data = { include: ['author', 'comments', 'invalid-relationship'] }
    const field = 'include'
    const args = ['author', 'comments', 'related-articles']

    assert.isFalse(validations.subset.validate(data, field, args, 'literal', root, config))
  })
})

test.group('Validations | url', () => {
  test('return false when value is not a valid url', async (assert) => {
    const data = {github_profile: 'foo'}
    const field = 'github_profile'
    const args: any[] = []

    assert.isFalse(validations.url.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is a valid url', async (assert) => {
    const data = {github_profile: 'http://github.com/thetutlage'}
    const field = 'github_profile'
    const args: any[] = []

    const result = validations.url.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'github_profile'
    const args: any[] = []

    const result = validations.url.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {github_profile: undefined}
    const field = 'github_profile'
    const args: any[] = []

    const result = validations.url.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | ip', () => {
  test('return false when value is not a valid ip address', async (assert) => {
    const data = {user_ip: '909090909'}
    const field = 'user_ip'
    const args: any[] = []

    assert.isFalse(validations.ip.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is a valid ip address', async (assert) => {
    const data = {user_ip: '127.0.0.1'}
    const field = 'user_ip'
    const args: any[] = []

    const result = validations.ip.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'user_ip'
    const args: any[] = []

    const result = validations.ip.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {user_ip: undefined}
    const field = 'user_ip'
    const args: any[] = []

    const result = validations.ip.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | integer', () => {
  test('work fine when string value can be casted to a string', async (assert) => {
    const data = { marks: '10' }
    const field = 'marks'

    const args: any[] = []
    const result = validations.integer.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when value is a float', async (assert) => {
    const data = { marks: 10.1 }
    const field = 'marks'

    const args: any[] = []
    assert.isFalse(validations.integer.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'marks'

    const args: any[] = []
    const result = validations.integer.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { marks: undefined }
    const field = 'marks'

    const args: any[] = []
    const result = validations.integer.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value is an integer', async (assert) => {
    const data = { marks: 10 }
    const field = 'marks'

    const args: any[] = []
    const result = validations.integer.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value is an integer with zero precision', async (assert) => {
    const data = { marks: 10.0 }
    const field = 'marks'

    const args: any[] = []
    const result = validations.integer.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value is string', async (assert) => {
    const data = { marks: '10' }
    const field = 'marks'

    const args: any[] = []
    const result = validations.integer.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | boolean', () => {
  test('return false when value is not a boolean', async (assert) => {
    const data = {is_admin: 20}
    const field = 'is_admin'

    const args: any[] = []
    assert.isFalse(validations.boolean.validate(data, field, args, 'literal', root, config))
  })

  test('return false when value is a string', async (assert) => {
    const data = {is_admin: '20'}
    const field = 'is_admin'

    const args: any[] = []
    assert.isFalse(validations.boolean.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'is_admin'

    const args: any[] = []
    const result = validations.boolean.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {is_admin: undefined}
    const field = 'is_admin'

    const args: any[] = []
    const result = validations.boolean.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value is a valid positive boolean', async (assert) => {
    const data = {is_admin: true}
    const field = 'is_admin'

    const args: any[] = []
    const result = validations.boolean.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value is a valid negative boolean', async (assert) => {
    const data = {is_admin: false}
    const field = 'is_admin'

    const args: any[] = []
    const result = validations.boolean.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value is a valid positive numeric boolean', async (assert) => {
    const data = {is_admin: 1}
    const field = 'is_admin'

    const args: any[] = []
    const result = validations.boolean.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value is a valid negative numeric boolean', async (assert) => {
    const data = {is_admin: 0}
    const field = 'is_admin'

    const args: any[] = []
    const result = validations.boolean.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value is a string representation of 0', async (assert) => {
    const data = {is_admin: '0'}
    const field = 'is_admin'

    const args: any[] = []
    const result = validations.boolean.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value is a string representation of 1', async (assert) => {
    const data = {is_admin: '1'}
    const field = 'is_admin'

    const args: any[] = []
    const result = validations.boolean.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value is a string representation of true', async (assert) => {
    const data = {is_admin: 'true'}
    const field = 'is_admin'

    const args: any[] = []
    const result = validations.boolean.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when value is a string representation of false', async (assert) => {
    const data = {is_admin: 'false'}
    const field = 'is_admin'

    const args: any[] = []
    const result = validations.boolean.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | object', () => {
  test('return false when value is not a valid object', async (assert) => {
    const data = {profile: 'foo'}
    const field = 'profile'

    const args: any[] = []
    assert.isFalse(validations.object.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is a valid object', async (assert) => {
    const data = {profile: { username: 'foo'} }
    const field = 'profile'

    const args: any[] = []
    const result = validations.object.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'profile'

    const args: any[] = []
    const result = validations.object.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {profile: undefined}
    const field = 'profile'

    const args: any[] = []
    const result = validations.object.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when value of field is an array', async (assert) => {
    const data = {profile: ['username']}
    const field = 'profile'
    const args: any[] = []

    assert.isFalse(validations.object.validate(data, field, args, 'literal', root, config))
  })
})

test.group('Validations | json', () => {
  test('return false when value is not a valid json string', async (assert) => {
    const data = {profile: 'foo'}
    const field = 'profile'

    const args: any[] = []
    assert.isFalse(validations.json.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is a valid json string', async (assert) => {
    const data = {profile: JSON.stringify({name: 'foo'})}
    const field = 'profile'

    const args: any[] = []
    const result = validations.json.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'profile'

    const args: any[] = []
    const result = validations.json.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {profile: undefined}
    const field = 'profile'

    const args: any[] = []
    const result = validations.json.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | ipv4', () => {
  test('return false when value is not a valid ipv4 address', async (assert) => {
    const data = {user_ip: '2001:DB8:0:0:1::1'}
    const field = 'user_ip'

    const args: any[] = []
    assert.isFalse(validations.ipv4.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is a valid ipv4 address', async (assert) => {
    const data = {user_ip: '127.0.0.1'}
    const field = 'user_ip'

    const args: any[] = []
    const result = validations.ipv4.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'user_ip'

    const args: any[] = []
    const result = validations.ipv4.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {user_ip: undefined}
    const field = 'user_ip'

    const args: any[] = []
    const result = validations.ipv4.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | ipv6', () => {
  test('return false when value is not a valid ipv6 address', async (assert) => {
    const data = {user_ip: '127.0.0.1'}
    const field = 'user_ip'

    const args: any[] = []
    assert.isFalse(validations.ipv6.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is a valid ipv6 address', async (assert) => {
    const data = {user_ip: '2001:DB8:0:0:1::1'}
    const field = 'user_ip'

    const args: any[] = []
    const result = validations.ipv6.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'user_ip'

    const args: any[] = []
    const result = validations.ipv6.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {user_ip: undefined}
    const field = 'user_ip'

    const args: any[] = []
    const result = validations.ipv6.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | requiredWhen', () => {
  test('throw exception when conditional field is not defined', async (assert) => {
    const args = []
    const fn = () => validations.requiredWhen.compile!(args)
    assert.throw(fn, 'requiredWhen: make sure to define target field')
  })

  test('throw exception when conditional value is not defined', async (assert) => {
    const args = ['country']
    const fn = () => validations.requiredWhen.compile!(args)
    assert.throw(fn, 'requiredWhen: make sure to define target field')
  })

  test('return args as it is when validates successfully', async (assert) => {
    const args = ['country', 'US']
    assert.deepEqual(validations.requiredWhen.compile!(args), args)
  })

  test('skip validation when conditional field does not exists', async (assert) => {
    const data = {}
    const field = 'state'

    const args = ['country', 'US']
    const result = validations.requiredWhen.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when conditional field value matches and field under validation is missing', async (assert) => {
    const data = {country: 'US'}
    const field = 'state'

    const args = ['country', 'US']
    assert.isFalse(validations.requiredWhen.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when value of conditional field does not match', async (assert) => {
    const data = {country: 'UK'}
    const field = 'state'

    const args = ['country', 'US']
    const result = validations.requiredWhen.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when conditional field is null', async (assert) => {
    const data = {country: null}
    const field = 'state'

    const args = ['country', 'US']
    const result = validations.requiredWhen.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when field under validation is available and conditional field value match', async (assert) => {
    const data = {country: 'US', state: 'NewYork'}
    const field = 'state'

    const args = ['country', 'US']
    const result = validations.requiredWhen.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when expected value is falsy and field value exists', async (assert) => {
    assert.plan(1)

    const data = { source: false, password: 'foo' }
    const field = 'password'

    const args = ['source', false]
    const result = validations.requiredWhen.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | afterOffsetOf', () => {
  test('throw exception when offset arguments are missing', async (assert) => {
    const args: any[] = []
    const fn = () => validations.afterOffsetOf.compile!(args)
    assert.throw(fn, 'afterOffsetOf: make sure to define offset unit and key')
  })

  test('throw exception when offset unit is missing', async (assert) => {
    const args: any[] = [10]
    const fn = () => validations.afterOffsetOf.compile!(args)
    assert.throw(fn, 'afterOffsetOf: make sure to define offset unit and key')
  })

  test('throw exception when offset unit is not a valid key', async (assert) => {
    const args: any[] = [12, 'foo']
    const fn = () => validations.afterOffsetOf.compile!(args)
    assert.throw(fn, 'afterOffsetOf: 2nd argument must be a valid calc key')
  })

  test('return args when they are defined', async (assert) => {
    const args: any[] = ['20', 'days']
    assert.deepEqual(validations.afterOffsetOf.compile!(args), [20, 'days'])
  })

  test('return false when date is not after defined offset', async (assert) => {
    const data = {renewal: new Date()}
    const field = 'renewal'
    const args = ['12', 'months']

    assert.isFalse(validations.afterOffsetOf.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is after defined offset', async (assert) => {
    const data = {renewal: addMonths(new Date(), 13)}
    const field = 'renewal'

    const args = ['12', 'months']
    const result = validations.afterOffsetOf.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field is not defined', async (assert) => {
    const data = {}
    const field = 'renewal'

    const args = ['12', 'months']
    const result = validations.afterOffsetOf.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {renewal: undefined}
    const field = 'renewal'

    const args = ['12', 'months']
    const result = validations.afterOffsetOf.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | beforeOffsetOf', () => {
  test('throw exception when offset arguments are missing', async (assert) => {
    const args: any[] = []
    const fn = () => validations.beforeOffsetOf.compile!(args)
    assert.throw(fn, 'beforeOffsetOf: make sure to define offset unit and key')
  })

  test('throw exception when offset unit is missing', async (assert) => {
    const args: any[] = [10]
    const fn = () => validations.beforeOffsetOf.compile!(args)
    assert.throw(fn, 'beforeOffsetOf: make sure to define offset unit and key')
  })

  test('throw exception when offset unit is not a valid key', async (assert) => {
    const args: any[] = [12, 'foo']
    const fn = () => validations.beforeOffsetOf.compile!(args)
    assert.throw(fn, 'beforeOffsetOf: 2nd argument must be a valid calc key')
  })

  test('return args when they are defined', async (assert) => {
    const args: any[] = ['20', 'days']
    assert.deepEqual(validations.beforeOffsetOf.compile!(args), [20, 'days'])
  })

  test('return false when date is not before defined offset', async (assert) => {
    const data = {subscription: new Date()}
    const field = 'subscription'

    const args = ['12', 'months']
    assert.isFalse(validations.beforeOffsetOf.validate(data, field, args, 'literal', root, config))
  })

  test('work fine when value is before defined offset', async (assert) => {
    const data = {subscription: subYears(new Date(), 2)}
    const field = 'subscription'

    const args = ['12', 'months']
    const result = validations.beforeOffsetOf.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field is not defined', async (assert) => {
    const data = {}
    const field = 'subscription'

    const args = ['12', 'months']
    const result = validations.beforeOffsetOf.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {subscription: undefined}
    const field = 'subscription'

    const args = ['12', 'months']
    const result = validations.beforeOffsetOf.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | Confirmation', () => {
  test('work fine when the confirmed field is equal', async (assert) => {
    const data = { password: '1234', password_confirmation: '1234' }
    const field = 'password'

    const args: any[] = []
    const result = validations.confirmed.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when then confirmed field isn\'t equal', async (assert) => {
    const data = { password: '1234', password_confirmation: '12345' }
    const field = 'password'

    const args: any[] = []
    assert.isFalse(validations.confirmed.validate(data, field, args, 'literal', root, config))
  })

  test('return false when then confirmed field isn\'t equal', async (assert) => {
    const data = { password: '1234', password_confirmation: undefined }
    const field = 'password'

    const args: any[] = []
    assert.isFalse(validations.confirmed.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when field value is not defined', async (assert) => {
    const data = { }
    const field = 'password'

    const args: any[] = []
    const result = validations.confirmed.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { password: undefined, password_confirmation: undefined }
    const field = 'password'

    const args: any[] = []
    const result = validations.confirmed.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | String', () => {
  test('work fine when the confirmed field is string', async (assert) => {
    const data = { username: 'david' }
    const field = 'username'

    const args: any[] = []
    const result = validations.string.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when the confirmed field is a number', async (assert) => {
    const data = { username: 1234 }
    const field = 'username'

    const args: any[] = []
    assert.isFalse(validations.string.validate(data, field, args, 'literal', root, config))
  })

  test('return false when the confirmed field is a boolean', async (assert) => {
    const data = { username: true }
    const field = 'username'

    const args: any[] = []
    assert.isFalse(validations.string.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when field value is not defined', async (assert) => {
    const data = { }
    const field = 'username'

    const args: any[] = []
    const result = validations.string.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { username: undefined }
    const field = 'username'

    const args: any[] = []
    const result = validations.string.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})

test.group('Validations | Number', () => {
  test('work fine when the field value is a number (float)', async (assert) => {
    const data = { price: 12.01 }
    const field = 'price'

    const args: any[] = []
    const result = validations.number.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when the field value is a number (integer)', async (assert) => {
    const data = { age: 47 }
    const field = 'age'

    const args: any[] = []
    const result = validations.number.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('work fine when string value is castable to number', async (assert) => {
    const data = { price: '10' }
    const field = 'price'

    const args: any[] = []
    const result = validations.number.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('return false when the field value is a string', async (assert) => {
    const data = { price: 'AnError' }
    const field = 'price'

    const args: any[] = []
    assert.isFalse(validations.number.validate(data, field, args, 'literal', root, config))
  })

  test('return false when the field value is a boolean', async (assert) => {
    const data = { price: true }
    const field = 'price'

    const args: any[] = []
    assert.isFalse(validations.number.validate(data, field, args, 'literal', root, config))
  })

  test('skip validation when field value is not defined', async (assert) => {
    const data = { }
    const field = 'price'

    const args: any[] = []
    const result = validations.number.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { price: undefined }
    const field = 'price'

    const args: any[] = []
    const result = validations.number.validate(data, field, args, 'literal', root, config)
    assert.isTrue(result)
  })
})
