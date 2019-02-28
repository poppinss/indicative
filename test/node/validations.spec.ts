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
import { prop } from 'pope'
import { subYears, addMonths } from 'date-fns'

test.group('Validations | required', () => {
  test('should reject promise when field is not defined', async (assert) => {
    const data = {}
    const field = 'name'
    const message = 'name is required'
    const get = prop
    const args: any[] = []
    try {
      await validations.required(data, field, message, args, get)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should reject promise when field is defined but empty', async (assert) => {
    const data = {name: ''}
    const field = 'name'
    const message = 'name is required'
    const get = prop
    const args: any[] = []
    try {
      await validations.required(data, field, message, args, get)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should resolve promise when field is defined and has value', async (assert) => {
    const data = {name: 'virk'}
    const field = 'name'
    const message = 'name is required'
    const get = prop
    const args: any[] = []
    const passes = await validations.required(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should resolve promise when field is defined and has boolean negative value', async (assert) => {
    const data = {name: false}
    const field = 'name'
    const message = 'name is required'
    const get = prop
    const args: any[] = []
    const passes = await validations.required(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should resolve promise when field is defined and has numeric value', async (assert) => {
    const data = {name: 0}
    const field = 'name'
    const message = 'name is required'
    const get = prop
    const args: any[] = []
    const passes = await validations.required(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | email', () => {
  test('should return error when field is defined and does not have valid email', async (assert) => {
    const data = {email: 'virk'}
    const field = 'email'
    const message = 'email must be email'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.email(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should return error when field is defined as negative boolean', async (assert) => {
    const data = {email: false}
    const field = 'email'
    const message = 'email must be email'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.email(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should return error when field is defined as 0', async (assert) => {
    const data = {email: 0}
    const field = 'email'
    const message = 'email must be email'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.email(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip email validation when email field does not exists', async (assert) => {
    const data = {}
    const field = 'email'
    const message = 'email must be email'
    const get = prop
    const args: any[] = []
    const passes = await validations.email(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when valid email is provided', async (assert) => {
    const data = {email: 'foo@bar.com'}
    const field = 'email'
    const message = 'email must be email'
    const get = prop
    const args: any[] = []
    const passes = await validations.email(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when valid email with extension is provided', async (assert) => {
    const data = {email: 'foo+baz@bar.com'}
    const field = 'email'
    const message = 'email must be email'
    const get = prop
    const args: any[] = []
    const passes = await validations.email(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | Accepted', () => {
  test('should return error when field is defined but not accepted', async (assert) => {
    const data = {terms: false}
    const field = 'terms'
    const message = 'terms must be accepted'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.accepted(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should pass validation when field is defined and accepted using true', async (assert) => {
    const data = {terms: true}
    const field = 'terms'
    const message = 'terms must be accepted'
    const get = prop
    const args: any[] = []
    const passes = await validations.accepted(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should pass validation when field is defined and accepted using string', async (assert) => {
    const data = {terms: 'okay'}
    const field = 'terms'
    const message = 'terms must be accepted'
    const get = prop
    const args: any[] = []
    const passes = await validations.accepted(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field is not present or is undefined', async (assert) => {
    const data = {}
    const field = 'terms'
    const message = 'terms must be accepted'
    const get = prop
    const args: any[] = []
    const passes = await validations.accepted(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | after', () => {
  test('throw exception when after value is not defined', async (assert) => {
    assert.plan(1)

    const data = {dob: '1980-11-20'}
    const field = 'dob'
    const message = 'dob should be after 2010'
    const get = prop
    const args: any[] = []
    try {
      await validations.after(data, field, message, args, get)
    } catch ({ message }) {
      assert.equal(message, 'after:make sure to define the after date')
    }
  })

  test('throw error when date is not after defined date', async (assert) => {
    const data = {dob: '1980-11-20'}
    const field = 'dob'
    const message = 'dob should be after 2010'
    const get = prop
    const args = ['2010-11-20']
    try {
      const passes = await validations.after(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when value is after defined date', async (assert) => {
    const data = {dob: '2011-01-01'}
    const field = 'dob'
    const message = 'dob should be after 2010'
    const get = prop
    const args = ['2010-11-20']
    const passes = await validations.after(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when dob is not defined', async (assert) => {
    const data = {}
    const field = 'dob'
    const message = 'dob should be after 2010'
    const get = prop
    const args = ['2010-11-20']
    const passes = await validations.after(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when dob is undefined', async (assert) => {
    const data = {dob: undefined}
    const field = 'dob'
    const message = 'dob should be after 2010'
    const get = prop
    const args = ['2010-11-20']
    const passes = await validations.after(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | alpha', () => {
  test('throw error when value is not alpha', async (assert) => {
    const data = {username: 'virk1234'}
    const field = 'username'
    const message = 'username must contain letters only'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.alpha(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when value is a valid alpha', async (assert) => {
    const data = {username: 'virk'}
    const field = 'username'
    const message = 'username must contain letters only'
    const get = prop
    const args: any[] = []
    const passes = await validations.alpha(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'username'
    const message = 'username must contain letters only'
    const get = prop
    const args: any[] = []
    const passes = await validations.alpha(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {username: undefined}
    const field = 'username'
    const message = 'username must contain letters only'
    const get = prop
    const args: any[] = []
    const passes = await validations.alpha(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | before', () => {
  test('throw exception when before value is missing', async (assert) => {
    assert.plan(1)

    const data = {dob: '2012-11-20'}
    const field = 'dob'
    const message = 'dob should be before 2010'
    const get = prop
    const args: any[] = []

    try {
      await validations.before(data, field, message, args, get)
    } catch ({ message }) {
      assert.equal(message, 'before:make sure to define the before date')
    }
  })

  test('throw error when date is not before defined date', async (assert) => {
    const data = {dob: '2012-11-20'}
    const field = 'dob'
    const message = 'dob should be before 2010'
    const get = prop
    const args = ['2010-11-20']
    try {
      const passes = await validations.before(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when value is before defined date', async (assert) => {
    const data = {dob: '2009-01-01'}
    const field = 'dob'
    const message = 'dob should be before 2010'
    const get = prop
    const args = ['2010-11-20']
    const passes = await validations.before(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when dob is not defined', async (assert) => {
    const data = {}
    const field = 'dob'
    const message = 'dob should be before 2010'
    const get = prop
    const args = ['2010-11-20']
    const passes = await validations.before(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when dob is undefined', async (assert) => {
    const data = {dob: undefined}
    const field = 'dob'
    const message = 'dob should be before 2010'
    const get = prop
    const args = ['2010-11-20']
    const passes = await validations.before(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | date', () => {
  test('throw error when field value is not a valid date', async (assert) => {
    const data = {dob: '10th'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.date(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when value of field is a valid date', async (assert) => {
    const data = {dob: '2015-10-20'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args: any[] = []
    const passes = await validations.date(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value of field is a valid date but with a differen date format', async (assert) => {
    const data = {dob: '10/20/2015'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args: any[] = []
    const passes = await validations.date(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args: any[] = []
    const passes = await validations.date(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {dob: undefined}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args: any[] = []
    const passes = await validations.date(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | dateFormat', () => {
  test('throw exception when date format is not defined', async (assert) => {
    assert.plan(1)

    const data = {dob: '10th'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args: any[] = []
    try {
      await validations.dateFormat(data, field, message, args, get)
    } catch ({ message }) {
      assert.equal(message, 'dateFormat:make sure to define atleast one date format')
    }
  })

  test('throw error when field value is not a valid date', async (assert) => {
    const data = {dob: '10th'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY/MM/DD']
    try {
      const passes = await validations.dateFormat(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('throw error when field value is a valid date but not according to defined format', async (assert) => {
    const data = {dob: '10-20-2015'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY/MM/DD']
    try {
      const passes = await validations.dateFormat(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when field value is a valid date according to given format', async (assert) => {
    const data = {dob: '2015/10/20'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY/MM/DD']
    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should match against multiple formats', async (assert) => {
    const data = {dob: '2015/10/20'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY-MM-DD', 'YYYY/MM/DD']
    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field is not available', async (assert) => {
    const data = {}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY/MM/DD']
    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field is undefined', async (assert) => {
    const data = {dob: undefined}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY/MM/DD']
    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('return error when time is missing from date', async (assert) => {
    assert.plan(1)

    const data = {dob: '2015/10/20'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY/MM/DD hh:mm:ss']

    try {
      await validations.dateFormat(data, field, message, args, get)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('return error when time format is different', async (assert) => {
    assert.plan(1)

    const data = {dob: '2015/10/20 23:33:34'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY/MM/DD hh:mm:ss']

    try {
      await validations.dateFormat(data, field, message, args, get)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should pass when time is in correct format', async (assert) => {
    const data = {dob: '2015/10/20 23:33:34'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY/MM/DD HH:mm:ss']

    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('ignore timezone when Z identifier is defined', async (assert) => {
    const data = {dob: '2015-10-20T23:33:34+05:30'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY-MM-DDTHH:mm:ssZ']

    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('ignore timezone when ZZ identifier is defined', async (assert) => {
    const data = {dob: '2015-10-20T23:33:34+0530'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY-MM-DDTHH:mm:ssZZ']

    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('fail when timezone is missing and Z identifier is used', async (assert) => {
    assert.plan(1)

    const data = {dob: '2015-10-20T23:33:34'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY-MM-DDTHH:mm:ssZ']

    try {
      await validations.dateFormat(data, field, message, args, get)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('fail when timezone is defined wrongly', async (assert) => {
    assert.plan(1)

    const data = {dob: '2015-10-20T23:33:34+5030'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY-MM-DDTHH:mm:ssZ']

    try {
      await validations.dateFormat(data, field, message, args, get)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('pass when Z identifier is used instead of offset', async (assert) => {
    const data = {dob: '2015-10-20T23:33:34Z'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY-MM-DDTHH:mm:ssZ']

    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('fail when Z identifier is used but with wrong timezone identifier', async (assert) => {
    assert.plan(1)

    const data = {dob: '2015-10-20T23:33:34Z'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY-MM-DDTHH:mm:ssZZ']

    try {
      await validations.dateFormat(data, field, message, args, get)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('pass when milliseconds are expected with timezone offset', async (assert) => {
    const data = {dob: '2015-10-20T23:33:34.231Z'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY-MM-DDTHH:mm:ss.SSSZ']

    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('fail when milliseconds are expected but they are incorrect', async (assert) => {
    assert.plan(1)

    const data = {dob: '2015-10-20T23:33:34.1050Z'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY-MM-DDTHH:mm:ss.SSSZ']

    try {
      await validations.dateFormat(data, field, message, args, get)
    } catch (e) {
      assert.equal(e, message)
    }
  })
})

test.group('Validations | in', () => {
  test('throw error when field value is not in defined fields', async (assert) => {
    const data = {gender: 'Foo'}
    const field = 'gender'
    const message = 'select valid gender'
    const get = prop
    const args = ['F', 'M', 'O']
    try {
      const passes = await validations.in(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when value of field is under one of the defined values', async (assert) => {
    const data = {gender: 'F'}
    const field = 'gender'
    const message = 'select valid gender'
    const get = prop
    const args = ['F', 'M', 'O']
    const passes = await validations.in(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when expected values are integer', async (assert) => {
    const data = {marks: 10}
    const field = 'marks'
    const message = 'select valid marks'
    const get = prop
    const args = [10, 20, 40]
    const passes = await validations.in(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'marks'
    const message = 'select valid marks'
    const get = prop
    const args = [10, 20, 40]
    const passes = await validations.in(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {marks: undefined}
    const field = 'marks'
    const message = 'select valid marks'
    const get = prop
    const args = [10, 20, 40]
    const passes = await validations.in(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | notIn', () => {
  test('throw error when field value is in defined fields', async (assert) => {
    const data = {username: 'admin'}
    const field = 'username'
    const message = 'select valid username'
    const get = prop
    const args = ['admin', 'super', 'root']
    try {
      const passes = await validations.notIn(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when field value is not one of the given options', async (assert) => {
    const data = {username: 'foo'}
    const field = 'username'
    const message = 'select valid username'
    const get = prop
    const args = ['admin', 'super', 'root']
    const passes = await validations.notIn(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field is undefined', async (assert) => {
    const data = {}
    const field = 'username'
    const message = 'select valid username'
    const get = prop
    const args = ['admin', 'super', 'root']
    const passes = await validations.notIn(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {username: undefined}
    const field = 'username'
    const message = 'select valid username'
    const get = prop
    const args = ['admin', 'super', 'root']
    const passes = await validations.notIn(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | requiredIf', () => {
  test('skip validation when conditional field does not exists', async (assert) => {
    const data = {}
    const field = 'password_confirm'
    const message = 'please confirm password'
    const get = prop
    const args = ['password']
    const passes = await validations.requiredIf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw error when conditional field exists and field under validation is missing', async (assert) => {
    const data = {password: 'foobar'}
    const field = 'password_confirm'
    const message = 'please confirm password'
    const get = prop
    const args = ['password']
    try {
      const passes = await validations.requiredIf(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when conditional field is null', async (assert) => {
    const data = {password: null}
    const field = 'password_confirm'
    const message = 'please confirm password'
    const get = prop
    const args = ['password']
    const passes = await validations.requiredIf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when field under validation is available', async (assert) => {
    const data = {password: 'foobar', 'password_confirm': 'foobar'}
    const field = 'password_confirm'
    const message = 'please confirm password'
    const get = prop
    const args = ['password']
    const passes = await validations.requiredIf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | requiredWithAny', () => {
  test('work fine when none of the targeted fields are present', async (assert) => {
    const data = {}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithAny(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw error when targeted fields are present but actual field is missing', async (assert) => {
    const data = {username: 'foo'}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = prop
    const args = ['username', 'email']
    try {
      const passes = await validations.requiredWithAny(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('throw error when targeted fields are present but actual field value is null', async (assert) => {
    const data = {username: 'foo', password: null}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = prop
    const args = ['username', 'email']
    try {
      const passes = await validations.requiredWithAny(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when targeted fields are present and actual field value is valid', async (assert) => {
    const data = {username: 'foo', password: 'bar'}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithAny(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | requiredWithAll', () => {
  test('work fine when none of the targeted fields are present', async (assert) => {
    const data = {}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithAll(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw error when all targeted fields are present but actual is missing', async (assert) => {
    assert.plan(1)

    const data = {username: 'foo', 'email': 'foo@bar.com'}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = prop
    const args = ['username', 'email']
    try {
      await validations.requiredWithAll(data, field, message, args, get)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('throw error when all targeted fields are present but actual field value is null', async (assert) => {
    assert.plan(1)

    const data = {username: 'foo', email: 'foo@bar.com', password: null}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = prop
    const args = ['username', 'email']
    try {
      await validations.requiredWithAll(data, field, message, args, get)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when all the targeted fields and actual field is defined', async (assert) => {
    const data = {username: 'foo', password: 'bar', 'email': 'foo@bar.com'}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithAll(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when targeted fields and actual field are missing', async (assert) => {
    const data = {username: 'foo'}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithAll(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | requiredWithoutAny', () => {
  test('work fine when all the targeted fields are present', async (assert) => {
    const data = {username: 'foo', email: 'foo@bar.com'}
    const field = 'password'
    const message = 'enter email or password'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithoutAny(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw error when targeted fields and actual field are missing', async (assert) => {
    assert.plan(1)
    const data = { username: 'foo' }
    const field = 'password'
    const message = 'enter email or password'
    const get = prop
    const args = ['username', 'email']
    try {
      await validations.requiredWithoutAny(data, field, message, args, get)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('throw error when targeted fields are missing and actual field is null', async (assert) => {
    assert.plan(1)
    const data = {username: 'foo', password: null}
    const field = 'password'
    const message = 'enter email or password'
    const get = prop
    const args = ['username', 'email']
    try {
      await validations.requiredWithoutAny(data, field, message, args, get)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when the targeted fields are missing and actual field is valid', async (assert) => {
    const data = {password: 'foobar'}
    const field = 'password'
    const message = 'enter email or password'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithoutAny(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | requiredWithoutAll', () => {
  test('work fine when all the targeted fields are present', async (assert) => {
    const data = {username: 'foo', email: 'foo@bar.com'}
    const field = 'password'
    const message = 'enter username, email or password'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithoutAll(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw error when all the targeted fields are missing and actual field is missing', async (assert) => {
    const data = {}
    const field = 'password'
    const message = 'enter username, email or password'
    const get = prop
    const args = ['username', 'email']
    try {
      const passes = await validations.requiredWithoutAll(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('throw error when all the targeted fields are missing and actual field is null', async (assert) => {
    const data = {password: null}
    const field = 'password'
    const message = 'enter username, email or password'
    const get = prop
    const args = ['username', 'email']
    try {
      const passes = await validations.requiredWithoutAll(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when all the targeted fields are missing and actual field is valid', async (assert) => {
    const data = {password: 'foobar'}
    const field = 'password'
    const message = 'enter username, email or password'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithoutAll(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when targeted fields and actual field are not present', async (assert) => {
    const data = {username: 'foo'}
    const field = 'password'
    const message = 'enter username, email or password'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithoutAll(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | same', () => {
  test('throw error when value of targeted field is not equal to defined field', async (assert) => {
    const data = {password: 'foo', 'password_confirm': 'bar'}
    const field = 'password_confirm'
    const message = 'password should match'
    const get = prop
    const args = ['password']
    try {
      const passes = await validations.same(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when target field does not exists', async (assert) => {
    const data = {'password_confirm': 'bar'}
    const field = 'password_confirm'
    const message = 'password should match'
    const get = prop
    const args = ['password']
    const passes = await validations.same(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when actual field does not exists', async (assert) => {
    const data = {}
    const field = 'password_confirm'
    const message = 'password should match'
    const get = prop
    const args = ['password']
    const passes = await validations.same(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value for both field matches', async (assert) => {
    const data = {password: 'foo', password_confirm: 'foo'}
    const field = 'password_confirm'
    const message = 'password should match'
    const get = prop
    const args = ['password']
    const passes = await validations.same(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when targeted field value exists but actual field does not exists', async (assert) => {
    const data = {password: 'foo'}
    const field = 'password_confirm'
    const message = 'password should match'
    const get = prop
    const args = ['password']
    const passes = await validations.same(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | equals', () => {
  test('throw error when value of targeted field is not equal to defined value', async (assert) => {
    const data = {title: 'foo'}
    const field = 'title'
    const message = 'title should be bar'
    const get = prop
    const args = ['bar']
    try {
      const passes = await validations.equals(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'title'
    const message = 'title should be bar'
    const get = prop
    const args = ['bar']
    const passes = await validations.equals(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {title: undefined}
    const field = 'title'
    const message = 'title should be bar'
    const get = prop
    const args = ['bar']
    const passes = await validations.equals(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value for field matches to defined value', async (assert) => {
    const data = {title: 'bar'}
    const field = 'title'
    const message = 'title should be bar'
    const get = prop
    const args = ['bar']
    const passes = await validations.equals(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when then under validation is a number', async (assert) => {
    const data = {age: 18}
    const field = 'age'
    const message = 'age should be 18'
    const get = prop
    const args = ['18']
    const passes = await validations.equals(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | notEquals', () => {
  test('throw error when value of targeted field is equal to defined value', async (assert) => {
    const data = {title: 'bar'}
    const field = 'title'
    const message = 'title should not be bar'
    const get = prop
    const args = ['bar']
    try {
      const passes = await validations.notEquals(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'title'
    const message = 'title should not be bar'
    const get = prop
    const args = ['bar']
    const passes = await validations.notEquals(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {title: undefined}
    const field = 'title'
    const message = 'title should not be bar'
    const get = prop
    const args = ['bar']
    const passes = await validations.notEquals(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value for field does not matches to defined value', async (assert) => {
    const data = {title: 'foo'}
    const field = 'title'
    const message = 'title should not be bar'
    const get = prop
    const args = ['bar']
    const passes = await validations.notEquals(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | different', () => {
  test('throw error when value of targeted field is equal to defined field', async (assert) => {
    const data = {dob: '2011-20-10', 'enrollment_date': '2011-20-10'}
    const field = 'enrollment_date'
    const message = 'enrollment date should be different from dob'
    const get = prop
    const args = ['dob']
    try {
      const passes = await validations.different(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when target field does not exists', async (assert) => {
    const data = {'enrollment_date': '2011-20-10'}
    const field = 'enrollment_date'
    const message = 'enrollment date should be different from dob'
    const get = prop
    const args = ['dob']
    const passes = await validations.different(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when actual field does not exists', async (assert) => {
    const data = {}
    const field = 'enrollment_date'
    const message = 'enrollment date should be different from dob'
    const get = prop
    const args = ['dob']
    const passes = await validations.different(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value for both fields are different', async (assert) => {
    const data = {dob: '2011-20-10', 'enrollment_date': '2011-20-20'}
    const field = 'enrollment_date'
    const message = 'enrollment date should be different from dob'
    const get = prop
    const args = ['dob']
    const passes = await validations.different(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when targeted field value exists but actual field does not exists', async (assert) => {
    const data = {dob: '2011-20-10'}
    const field = 'enrollment_date'
    const message = 'enrollment date should be different from dob'
    const get = prop
    const args = ['dob']
    const passes = await validations.different(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | range', () => {
  test('throw error when value of field is less then defined range', async (assert) => {
    const data = {age: 16}
    const field = 'age'
    const message = 'only adults less than 60 years of age are allowed'
    const get = prop
    const args = [18, 60]
    try {
      const passes = await validations.range(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('throw error when value of field is greater then defined range', async (assert) => {
    const data = {age: 61}
    const field = 'age'
    const message = 'only adults less than 60 years of age are allowed'
    const get = prop
    const args = [18, 60]
    try {
      const passes = await validations.range(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('throw error when min value is not defined', async (assert) => {
    const data = {age: 61}
    const field = 'age'
    const message = 'only adults less than 60 years of age are allowed'
    const get = prop
    const args = [null, 60]
    try {
      const passes = await validations.range(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.match(e, /min and max values are required/)
    }
  })

  // https://github.com/poppinss/indicative/issues/184 test case for min=0
  test('should not throw an error when min value is zero', async (assert) => {
    const data = {age: 20}
    const field = 'age'
    const message = 'only persons less than 60 years of age are allowed'
    const get = prop
    const args = [0, 60]
    const passes = await validations.range(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw error when max value is not defined', async (assert) => {
    const data = {age: 61}
    const field = 'age'
    const message = 'only adults less than 60 years of age are allowed'
    const get = prop
    const args = [18]
    try {
      const passes = await validations.range(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.match(e, /min and max values are required/)
    }
  })

  // https://github.com/poppinss/indicative/issues/184 test case for max=0
  test('should not throw an error when max value is zero', async (assert) => {
    const data = {temp: -5}
    const field = 'temp'
    const message = 'only negative temperature greater than -10 is allowed'
    const get = prop
    const args = [-10, 0]
    const passes = await validations.range(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'age'
    const message = 'only adults less than 60 years of age are allowed'
    const get = prop
    const args = [18, 60]
    const passes = await validations.range(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {age: undefined}
    const field = 'age'
    const message = 'only adults less than 60 years of age are allowed'
    const get = prop
    const args = [18, 60]
    const passes = await validations.range(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when field value is under defined range', async (assert) => {
    const data = {age: 20}
    const field = 'age'
    const message = 'only adults less than 60 years of age are allowed'
    const get = prop
    const args = [18, 60]
    const passes = await validations.range(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | min', () => {
  test('throw error when length of field is less than defined length', async (assert) => {
    const data = {password: 'foo'}
    const field = 'password'
    const message = 'password should be over 6 characters'
    const get = prop
    const args = [6]
    try {
      const passes = await validations.min(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('throw error when length of field as number is less than defined length', async (assert) => {
    const data = {password: 990}
    const field = 'password'
    const message = 'password should be over 6 characters'
    const get = prop
    const args = [6]
    try {
      const passes = await validations.min(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'password'
    const message = 'password should be over 6 characters'
    const get = prop
    const args = [6]
    const passes = await validations.min(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {password: undefined}
    const field = 'password'
    const message = 'password should be over 6 characters'
    const get = prop
    const args = [6]
    const passes = await validations.min(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when length of value of field is greater than defined length', async (assert) => {
    const data = {password: 'foobarbaz'}
    const field = 'password'
    const message = 'password should be over 6 characters'
    const get = prop
    const args = [6]
    const passes = await validations.min(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when length of value of field is equal to the defined length', async (assert) => {
    const data = {password: 'foobar'}
    const field = 'password'
    const message = 'password should be over 6 characters'
    const get = prop
    const args = [6]
    const passes = await validations.min(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw error when length of array is less than defined number', async (assert) => {
    const data = {options: ['yes']}
    const field = 'options'
    const message = 'minimum of 2 options are required for the poll'
    const get = prop
    const args = [2]
    try {
      const passes = await validations.min(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when length of array is equal or over than defined number', async (assert) => {
    const data = {options: ['yes', 'no']}
    const field = 'options'
    const message = 'minimum of 2 options are required for the poll'
    const get = prop
    const args = [2]
    const passes = await validations.min(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | max', () => {
  test('throw error when length of field is greater than defined length', async (assert) => {
    const data = {password: 'foobarbaz'}
    const field = 'password'
    const message = 'password should be less than 6 characters'
    const get = prop
    const args = [6]
    try {
      const passes = await validations.max(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('throw error when length of field as number is greater than defined length', async (assert) => {
    const data = {password: 1990909990}
    const field = 'password'
    const message = 'password should be less than 6 characters'
    const get = prop
    const args = [6]
    try {
      const passes = await validations.max(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'password'
    const message = 'password should be less than 6 characters'
    const get = prop
    const args = [6]
    const passes = await validations.max(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {password: undefined}
    const field = 'password'
    const message = 'password should be less than 6 characters'
    const get = prop
    const args = [6]
    const passes = await validations.max(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when length of value of field is less than defined length', async (assert) => {
    const data = {password: 'foo'}
    const field = 'password'
    const message = 'password should be less than 6 characters'
    const get = prop
    const args = [6]
    const passes = await validations.max(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when length of value of field is equal to the defined length', async (assert) => {
    const data = {password: 'foobar'}
    const field = 'password'
    const message = 'password should be less than 6 characters'
    const get = prop
    const args = [6]
    const passes = await validations.max(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw error when array length exceeds the max number', async (assert) => {
    const data = {users: ['virk', 'nikk', 'joe']}
    const field = 'users'
    const message = 'max 2 users are allowed'
    const get = prop
    const args = [2]
    try {
      const passes = await validations.max(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when array length is within the max number', async (assert) => {
    const data = {users: ['virk', 'nikk']}
    const field = 'users'
    const message = 'max 2 users are allowed'
    const get = prop
    const args = [2]
    const passes = await validations.max(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | above', () => {
  test('throw error when value of field is less than defined value', async (assert) => {
    const data = {age: 16}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = prop
    const args = [17]
    try {
      const passes = await validations.above(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('throw error when value of field is equal to the defined value', async (assert) => {
    const data = {age: 17}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = prop
    const args = [17]
    try {
      const passes = await validations.above(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = prop
    const args = [17]
    const passes = await validations.above(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {age: undefined}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = prop
    const args = [17]
    const passes = await validations.above(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value of field is greater than defined value', async (assert) => {
    const data = {age: 18}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = prop
    const args = [17]
    const passes = await validations.above(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw exception when comparison value is not defined', async (assert) => {
    assert.plan(1)

    const data = {age: 18}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = prop
    const args: any[] = []

    try {
      await validations.above(data, field, message, args, get)
    } catch ({ message }) {
      assert.equal(message, 'above:make sure to define minValue')
    }
  })

  test('pass when values are in strings and user value is over expected value', async (assert) => {
    const data = {age: '18'}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = prop
    const args = ['17']

    const passes = await validations.above(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('fail when values are in strings and user value is under expected value', async (assert) => {
    assert.plan(1)

    const data = {age: 16}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = prop
    const args = ['17']

    try {
      const passes = await validations.above(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })
})

test.group('Validations | under', () => {
  test('throw error when value of field is greater than defined value', async (assert) => {
    const data = {age: 11}
    const field = 'age'
    const message = 'age should be less than 10 years for junior idol'
    const get = prop
    const args = [10]
    try {
      const passes = await validations.under(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('throw error when value of field is equal to the defined value', async (assert) => {
    const data = {age: 10}
    const field = 'age'
    const message = 'age should be less than 10 years for junior idol'
    const get = prop
    const args = [10]
    try {
      const passes = await validations.under(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'age'
    const message = 'age should be less than 10 years for junior idol'
    const get = prop
    const args = [10]
    const passes = await validations.under(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {age: undefined}
    const field = 'age'
    const message = 'age should be less than 10 years for junior idol'
    const get = prop
    const args = [10]
    const passes = await validations.under(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value of field is less than defined value', async (assert) => {
    const data = {age: 8}
    const field = 'age'
    const message = 'age should be less than 10 years for junior idol'
    const get = prop
    const args = [10]
    const passes = await validations.under(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | includes', () => {
  test('throw error when string does not include defined substring', async (assert) => {
    const data = {dpath: 'foo/bar'}
    const field = 'dpath'
    const message = 'path should include app directory'
    const get = prop
    const args = ['app']
    try {
      const passes = await validations.includes(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'dpath'
    const message = 'path should include app directory'
    const get = prop
    const args = ['app']
    const passes = await validations.includes(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {dpath: undefined}
    const field = 'dpath'
    const message = 'path should include app directory'
    const get = prop
    const args = ['app']
    const passes = await validations.includes(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when field value includes given string', async (assert) => {
    const data = {dpath: '/app/bar'}
    const field = 'dpath'
    const message = 'path should include app directory'
    const get = prop
    const args = ['app']
    const passes = await validations.includes(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | startsWith', () => {
  test('throw error when string does not startsWith defined substring', async (assert) => {
    const data = {username: 'foo'}
    const field = 'username'
    const message = 'username should start with D'
    const get = prop
    const args = ['D']
    try {
      const passes = await validations.startsWith(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'username'
    const message = 'username should start with D'
    const get = prop
    const args = ['D']
    const passes = await validations.startsWith(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {username: undefined}
    const field = 'username'
    const message = 'username should start with D'
    const get = prop
    const args = ['D']
    const passes = await validations.startsWith(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when field value startsWith given string', async (assert) => {
    const data = {username: 'Doe'}
    const field = 'username'
    const message = 'username should start with D'
    const get = prop
    const args = ['D']
    const passes = await validations.startsWith(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | endsWith', () => {
  test('throw error when string does not endsWith defined substring', async (assert) => {
    const data = {username: 'foo'}
    const field = 'username'
    const message = 'username should end with e'
    const get = prop
    const args = ['e']
    try {
      const passes = await validations.endsWith(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'username'
    const message = 'username should end with e'
    const get = prop
    const args = ['e']
    const passes = await validations.endsWith(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {username: undefined}
    const field = 'username'
    const message = 'username should end with e'
    const get = prop
    const args = ['e']
    const passes = await validations.endsWith(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when field value endsWith given string', async (assert) => {
    const data = {username: 'Doe'}
    const field = 'username'
    const message = 'username should end with e'
    const get = prop
    const args = ['e']
    const passes = await validations.endsWith(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | regex', () => {
  test('throw error when value does not match regex', async (assert) => {
    const data = {email: 'foo'}
    const field = 'email'
    const message = 'email should match given regex'
    const get = prop
    const args = [/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0, 66})\.([a-z]{2, 6}(?:\.[a-z]{2})?)$/]
    try {
      const passes = await validations.regex(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when fields does not exists', async (assert) => {
    const data = {}
    const field = 'country'
    const message = 'country should be India with I as uppercase'
    const get = prop
    const args = ['[a-z]']
    const passes = await validations.regex(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when fields value is undefined', async (assert) => {
    const data = {country: undefined}
    const field = 'country'
    const message = 'country should be India with I as uppercase'
    const get = prop
    const args = ['[a-z]']
    const passes = await validations.regex(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when field value satisfies regex pattern', async (assert) => {
    const data = {country: 'India'}
    const field = 'country'
    const message = 'country should be India with I as uppercase'
    const get = prop
    const args = ['[a-z]', 'i']
    const passes = await validations.regex(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | alphaNumeric', () => {
  test('throw error when value is not alpha numeric', async (assert) => {
    const data = {username: 'virk@123'}
    const field = 'username'
    const message = 'username must letters and numbers only'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.alphaNumeric(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when value is a valid alpha numeric', async (assert) => {
    const data = {username: 'virk123'}
    const field = 'username'
    const message = 'username must letters and numbers only'
    const get = prop
    const args: any[] = []
    const passes = await validations.alphaNumeric(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'username'
    const message = 'username must letters and numbers only'
    const get = prop
    const args: any[] = []
    const passes = await validations.alphaNumeric(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {username: undefined}
    const field = 'username'
    const message = 'username must letters and numbers only'
    const get = prop
    const args: any[] = []
    const passes = await validations.alphaNumeric(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | array', () => {
  test('throw error when value is not a valid array', async (assert) => {
    const data = {users: 'foo'}
    const field = 'users'
    const message = 'users list must be an array'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.array(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when value is a valid array', async (assert) => {
    const data = {users: ['doe', 'foo', 'bar']}
    const field = 'users'
    const message = 'users list must be an array'
    const get = prop
    const args: any[] = []
    const passes = await validations.array(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'users'
    const message = 'users list must be an array'
    const get = prop
    const args: any[] = []
    const passes = await validations.array(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {users: undefined}
    const field = 'users'
    const message = 'users list must be an array'
    const get = prop
    const args: any[] = []
    const passes = await validations.array(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw error when value of field is an object', async (assert) => {
    const data = {users: {name: 'foo'}}
    const field = 'users'
    const message = 'users list must be an array'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.array(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })
})

test.group('Validations | subset', () => {
  test('work fine when value is a subset of given superset', async (assert) => {
    const data = { include: ['author'] }
    const field = 'include'
    const message = 'include list must be any of: [author, comments, related-articles]'
    const get = prop
    const args = ['author', 'comments', 'related-articles']
    const passes = await validations.subset(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value is a comma delimited string', async (assert) => {
    const data = { include: 'author,comments' }
    const field = 'include'
    const message = 'include list must be any of: [author, comments, related-articles]'
    const get = prop
    const args = ['author', 'comments', 'related-articles']
    const passes = await validations.subset(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw error when value is not a subset of given superset', async (assert) => {
    const data = { include: ['author', 'comments', 'invalid-relationship'] }
    const field = 'include'
    const message = 'include list must be any of: [author, comments, related-articles]'
    const get = prop
    const args = ['author', 'comments', 'related-articles']
    try {
      const passes = await validations.subset(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should throw TypeError when value is neither a string nor an array', async (assert) => {
    const data = { foo: { bar: 'baz' } }
    const field = 'foo'
    const message = 'subset:field value must be a comma delimited string or an array'
    const get = prop
    const args = ['foo', 'bar', 'baz']
    try {
      const passes = await validations.subset(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.instanceOf(e, TypeError)
      assert.equal(e.message, message)
    }
  })
})

test.group('Validations | url', () => {
  test('throw error when value is not a valid url', async (assert) => {
    const data = {github_profile: 'foo'}
    const field = 'github_profile'
    const message = 'github profile must point to a valid url '
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.url(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when value is a valid url', async (assert) => {
    const data = {github_profile: 'http://github.com/thetutlage'}
    const field = 'github_profile'
    const message = 'github profile must point to a valid url '
    const get = prop
    const args: any[] = []
    const passes = await validations.url(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'github_profile'
    const message = 'github profile must point to a valid url '
    const get = prop
    const args: any[] = []
    const passes = await validations.url(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {github_profile: undefined}
    const field = 'github_profile'
    const message = 'github profile must point to a valid url '
    const get = prop
    const args: any[] = []
    const passes = await validations.url(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | ip', () => {
  test('throw error when value is not a valid ip address', async (assert) => {
    const data = {user_ip: '909090909'}
    const field = 'user_ip'
    const message = 'invalid ip address'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.ip(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when value is a valid ip address', async (assert) => {
    const data = {user_ip: '127.0.0.1'}
    const field = 'user_ip'
    const message = 'invalid ip address'
    const get = prop
    const args: any[] = []
    const passes = await validations.ip(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'user_ip'
    const message = 'invalid ip address'
    const get = prop
    const args: any[] = []
    const passes = await validations.ip(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {user_ip: undefined}
    const field = 'user_ip'
    const message = 'invalid ip address'
    const get = prop
    const args: any[] = []
    const passes = await validations.ip(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | integer', () => {
  test('work fine when string value can be casted to a string', async (assert) => {
    const data = {marks: '10'}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = prop
    const args: any[] = []
    const passes = await validations.integer(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw error when value is a float', async (assert) => {
    const data = {marks: 10.1}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.integer(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = prop
    const args: any[] = []
    const passes = await validations.integer(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {marks: undefined}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = prop
    const args: any[] = []
    const passes = await validations.integer(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value is an integer', async (assert) => {
    const data = {marks: 10}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = prop
    const args: any[] = []
    const passes = await validations.integer(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value is an integer with zero precision', async (assert) => {
    const data = {marks: 10.0}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = prop
    const args: any[] = []
    const passes = await validations.integer(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | boolean', () => {
  test('throw error when value is not a boolean', async (assert) => {
    const data = {is_admin: 20}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.boolean(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('throw error when value is a string', async (assert) => {
    const data = {is_admin: '20'}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.boolean(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args: any[] = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {is_admin: undefined}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args: any[] = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value is a valid positive boolean', async (assert) => {
    const data = {is_admin: true}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args: any[] = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value is a valid negative boolean', async (assert) => {
    const data = {is_admin: false}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args: any[] = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value is a valid positive numeric boolean', async (assert) => {
    const data = {is_admin: 1}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args: any[] = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value is a valid negative numeric boolean', async (assert) => {
    const data = {is_admin: 0}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args: any[] = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value is a string representation of 0', async (assert) => {
    const data = {is_admin: '0'}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args: any[] = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value is a string representation of 1', async (assert) => {
    const data = {is_admin: '1'}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args: any[] = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value is a string representation of true', async (assert) => {
    const data = {is_admin: 'true'}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args: any[] = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when value is a string representation of false', async (assert) => {
    const data = {is_admin: 'false'}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args: any[] = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | object', () => {
  test('throw error when value is not a valid object', async (assert) => {
    const data = {profile: 'foo'}
    const field = 'profile'
    const message = 'profile must be an object'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.object(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when value is a valid object', async (assert) => {
    const data = {profile: {username: 'foo'}}
    const field = 'profile'
    const message = 'profile must be an object'
    const get = prop
    const args: any[] = []
    const passes = await validations.object(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'profile'
    const message = 'profile must be an object'
    const get = prop
    const args: any[] = []
    const passes = await validations.object(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {profile: undefined}
    const field = 'profile'
    const message = 'profile must be an object'
    const get = prop
    const args: any[] = []
    const passes = await validations.object(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw error when value of field is an array', async (assert) => {
    const data = {profile: ['username']}
    const field = 'profile'
    const message = 'profile must be an object'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.object(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })
})

test.group('Validations | json', () => {
  test('throw error when value is not a valid json string', async (assert) => {
    const data = {profile: 'foo'}
    const field = 'profile'
    const message = 'profile must be in json'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.json(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when value is a valid json string', async (assert) => {
    const data = {profile: JSON.stringify({name: 'foo'})}
    const field = 'profile'
    const message = 'profile must be in json'
    const get = prop
    const args: any[] = []
    const passes = await validations.json(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'profile'
    const message = 'profile must be in json'
    const get = prop
    const args: any[] = []
    const passes = await validations.json(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {profile: undefined}
    const field = 'profile'
    const message = 'profile must be in json'
    const get = prop
    const args: any[] = []
    const passes = await validations.json(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | ipv4', () => {
  test('throw error when value is not a valid ipv4 address', async (assert) => {
    const data = {user_ip: '2001:DB8:0:0:1::1'}
    const field = 'user_ip'
    const message = 'invalid ipv4 address'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.ipv4(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when value is a valid ipv4 address', async (assert) => {
    const data = {user_ip: '127.0.0.1'}
    const field = 'user_ip'
    const message = 'invalid ipv4 address'
    const get = prop
    const args: any[] = []
    const passes = await validations.ipv4(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'user_ip'
    const message = 'invalid ipv4 address'
    const get = prop
    const args: any[] = []
    const passes = await validations.ipv4(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {user_ip: undefined}
    const field = 'user_ip'
    const message = 'invalid ipv4 address'
    const get = prop
    const args: any[] = []
    const passes = await validations.ipv4(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | ipv6', () => {
  test('throw error when value is not a valid ipv6 address', async (assert) => {
    const data = {user_ip: '127.0.0.1'}
    const field = 'user_ip'
    const message = 'invalid ipv6 address'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.ipv6(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when value is a valid ipv6 address', async (assert) => {
    const data = {user_ip: '2001:DB8:0:0:1::1'}
    const field = 'user_ip'
    const message = 'invalid ipv6 address'
    const get = prop
    const args: any[] = []
    const passes = await validations.ipv6(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field does not exists', async (assert) => {
    const data = {}
    const field = 'user_ip'
    const message = 'invalid ipv6 address'
    const get = prop
    const args: any[] = []
    const passes = await validations.ipv6(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {user_ip: undefined}
    const field = 'user_ip'
    const message = 'invalid ipv6 address'
    const get = prop
    const args: any[] = []
    const passes = await validations.ipv6(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | requiredWhen', () => {
  test('skip validation when conditional field does not exists', async (assert) => {
    const data = {}
    const field = 'state'
    const message = 'state is required'
    const get = prop
    const args = ['country', 'US']
    const passes = await validations.requiredWhen(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw error when conditional field value matches and field under validation is missing', async (assert) => {
    const data = {country: 'US'}
    const field = 'state'
    const message = 'state is required'
    const get = prop
    const args = ['country', 'US']
    try {
      const passes = await validations.requiredWhen(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when value of conditional field does not match', async (assert) => {
    const data = {country: 'UK'}
    const field = 'state'
    const message = 'state is required'
    const get = prop
    const args = ['country', 'US']
    const passes = await validations.requiredWhen(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when conditional field is null', async (assert) => {
    const data = {country: null}
    const field = 'state'
    const message = 'state is required'
    const get = prop
    const args = ['country', 'US']
    const passes = await validations.requiredWhen(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when field under validation is available and conditional field value match', async (assert) => {
    const data = {country: 'US', state: 'NewYork'}
    const field = 'state'
    const message = 'state is required'
    const get = prop
    const args = ['country', 'US']
    const passes = await validations.requiredWhen(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw exception when expected value is falsy and actual value is missing', async (assert) => {
    assert.plan(1)

    const data = { source: false }
    const field = 'password'
    const message = 'password is required'
    const get = prop
    const args = ['source', 'false']
    try {
      await validations.requiredWhen(data, field, message, args, get)
    } catch (e) {
      assert.equal(e, 'password is required')
    }
  })

  test('work fine when expected value is falsy and field value exists', async (assert) => {
    assert.plan(1)

    const data = { source: false, password: 'foo' }
    const field = 'password'
    const message = 'password is required'
    const get = prop
    const args = ['source', false]
    const passes = await validations.requiredWhen(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | afterOffsetOf', () => {
  test('throw exception when offset unit is missing', async (assert) => {
    assert.plan(1)

    const data = {renewal: new Date()}
    const field = 'renewal'
    const message = 'packages are renewed after 12 months'
    const get = prop
    const args: any[] = []

    try {
      await validations.afterOffsetOf(data, field, message, args, get)
    } catch ({ message }) {
      assert.equal(message, 'afterOffsetOf:make sure to define offset unit and key')
    }
  })

  test('throw exception when offset unit is key', async (assert) => {
    assert.plan(1)

    const data = {renewal: new Date()}
    const field = 'renewal'
    const message = 'packages are renewed after 12 months'
    const get = prop
    const args = [12]

    try {
      await validations.afterOffsetOf(data, field, message, args, get)
    } catch ({ message }) {
      assert.equal(message, 'afterOffsetOf:make sure to define offset unit and key')
    }
  })

  test('throw error when date is not after defined offset', async (assert) => {
    const data = {renewal: new Date()}
    const field = 'renewal'
    const message = 'packages are renewed after 12 months'
    const get = prop
    const args = ['12', 'months']
    try {
      const passes = await validations.afterOffsetOf(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when value is after defined offset', async (assert) => {
    const data = {renewal: addMonths(new Date(), 13)}
    const field = 'renewal'
    const message = 'packages are renewed after 12 months'
    const get = prop
    const args = ['12', 'months']
    const passes = await validations.afterOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field is not defined', async (assert) => {
    const data = {}
    const field = 'renewal'
    const message = 'packages are renewed after 12 months'
    const get = prop
    const args = ['12', 'months']
    const passes = await validations.afterOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {renewal: undefined}
    const field = 'renewal'
    const message = 'packages are renewed after 12 months'
    const get = prop
    const args = ['12', 'months']
    const passes = await validations.afterOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | beforeOffsetOf', () => {
  test('throw exception when offset unit is missing', async (assert) => {
    assert.plan(1)

    const data = {subscription: new Date()}
    const field = 'subscription'
    const message = '12 months old subscriptions are upgradable'
    const get = prop
    const args: any[] = []

    try {
      await validations.beforeOffsetOf(data, field, message, args, get)
    } catch ({ message }) {
      assert.equal(message, 'beforeOffsetOf:make sure to define offset unit and key')
    }
  })

  test('throw exception when offset unit is key', async (assert) => {
    assert.plan(1)

    const data = {subscription: new Date()}
    const field = 'subscription'
    const message = '12 months old subscriptions are upgradable'
    const get = prop
    const args = ['12']

    try {
      await validations.beforeOffsetOf(data, field, message, args, get)
    } catch ({ message }) {
      assert.equal(message, 'beforeOffsetOf:make sure to define offset unit and key')
    }
  })

  test('throw error when date is not before defined offset', async (assert) => {
    const data = {subscription: new Date()}
    const field = 'subscription'
    const message = '12 months old subscriptions are upgradable'
    const get = prop
    const args = ['12', 'months']

    try {
      const passes = await validations.beforeOffsetOf(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('work fine when value is before defined offset', async (assert) => {
    const data = {subscription: subYears(new Date(), 2)}
    const field = 'subscription'
    const message = '12 months old subscriptions are upgradable'
    const get = prop
    const args = ['12', 'months']
    const passes = await validations.beforeOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field is not defined', async (assert) => {
    const data = {}
    const field = 'subscription'
    const message = '12 months old subscriptions are upgradable'
    const get = prop
    const args = ['12', 'months']
    const passes = await validations.beforeOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = {subscription: undefined}
    const field = 'subscription'
    const message = '12 months old subscriptions are upgradable'
    const get = prop
    const args = ['12', 'months']
    const passes = await validations.beforeOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | Confirmation', () => {
  test('work fine when the confirmed field is equal', async (assert) => {
    const data = { password: '1234', password_confirmation: '1234' }
    const field = 'password'
    const message = 'Password does not match!'
    const get = prop
    const args: any[] = []
    const passes = await validations.confirmed(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw error when then confirmed field isn\'t equal', async (assert) => {
    const data = { password: '1234', password_confirmation: '12345' }
    const field = 'password'
    const message = 'Password does not match!'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.confirmed(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('throw error when then confirmed field isn\'t equal', async (assert) => {
    const data = { password: '1234', password_confirmation: undefined }
    const field = 'password'
    const message = 'Password does not match!'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.confirmed(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when field value is not defined', async (assert) => {
    const data = { }
    const field = 'password'
    const message = 'Password does not match!'
    const get = prop
    const args: any[] = []
    const passes = await validations.confirmed(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { password: undefined, password_confirmation: undefined }
    const field = 'password'
    const message = 'Password does not match!'
    const get = prop
    const args: any[] = []
    const passes = await validations.confirmed(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | String', () => {
  test('work fine when the confirmed field is string', async (assert) => {
    const data = { username: 'david' }
    const field = 'username'
    const message = 'Username should be a string'
    const get = prop
    const args: any[] = []
    const passes = await validations.string(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw error when the confirmed field is a number', async (assert) => {
    const data = { username: 1234 }
    const field = 'username'
    const message = 'Username should be a string'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.string(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('throw error when the confirmed field is a boolean', async (assert) => {
    const data = { username: true }
    const field = 'username'
    const message = 'Username should be a string'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.string(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when field value is not defined', async (assert) => {
    const data = { }
    const field = 'username'
    const message = 'Username should be a string'
    const get = prop
    const args: any[] = []
    const passes = await validations.string(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { username: undefined }
    const field = 'username'
    const message = 'Username should be a string'
    const get = prop
    const args: any[] = []
    const passes = await validations.string(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | Number', () => {
  test('work fine when the field value is a number (float)', async (assert) => {
    const data = { price: 12.01 }
    const field = 'price'
    const message = 'Price should be a number'
    const get = prop
    const args: any[] = []
    const passes = await validations.number(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when the field value is a number (integer)', async (assert) => {
    const data = { age: 47 }
    const field = 'age'
    const message = 'Age should be a number'
    const get = prop
    const args: any[] = []
    const passes = await validations.number(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('work fine when string value is castable to number', async (assert) => {
    const data = { price: '10' }
    const field = 'price'
    const message = 'Price should be a number'
    const get = prop
    const args: any[] = []
    const passes = await validations.number(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw error when the field value is a string', async (assert) => {
    const data = { price: 'AnError' }
    const field = 'price'
    const message = 'Price should be a number'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.number(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('throw error when the field value is a boolean', async (assert) => {
    const data = { price: true }
    const field = 'price'
    const message = 'Price should be a number'
    const get = prop
    const args: any[] = []
    try {
      const passes = await validations.number(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('skip validation when field value is not defined', async (assert) => {
    const data = { }
    const field = 'price'
    const message = 'Price should be a number'
    const get = prop
    const args: any[] = []
    const passes = await validations.number(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('skip validation when field value is undefined', async (assert) => {
    const data = { price: undefined }
    const field = 'price'
    const message = 'Price should be a number'
    const get = prop
    const args: any[] = []
    const passes = await validations.number(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})
