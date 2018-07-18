'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import test from 'japa'
import * as validations from '../../src/validations'
import { prop } from 'pope'
import subYears from 'date-fns/sub_years'
import addMonths from 'date-fns/add_months'

test.group('Validations | required', function () {
  test('should reject promise when field is not defined', async function (assert) {
    const data = {}
    const field = 'name'
    const message = 'name is required'
    const get = prop
    const args = []
    try {
      await validations.required(data, field, message, args, get)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should reject promise when field is defined but empty', async function (assert) {
    const data = {name: ''}
    const field = 'name'
    const message = 'name is required'
    const get = prop
    const args = []
    try {
      await validations.required(data, field, message, args, get)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should resolve promise when field is defined and has value', async function (assert) {
    const data = {name: 'virk'}
    const field = 'name'
    const message = 'name is required'
    const get = prop
    const args = []
    const passes = await validations.required(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should resolve promise when field is defined and has boolean negative value', async function (assert) {
    const data = {name: false}
    const field = 'name'
    const message = 'name is required'
    const get = prop
    const args = []
    const passes = await validations.required(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should resolve promise when field is defined and has numeric value', async function (assert) {
    const data = {name: 0}
    const field = 'name'
    const message = 'name is required'
    const get = prop
    const args = []
    const passes = await validations.required(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | email', function () {
  test('should return error when field is defined and does not have valid email', async function (assert) {
    const data = {email: 'virk'}
    const field = 'email'
    const message = 'email must be email'
    const get = prop
    const args = []
    try {
      const passes = await validations.email(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should return error when field is defined as negative boolean', async function (assert) {
    const data = {email: false}
    const field = 'email'
    const message = 'email must be email'
    const get = prop
    const args = []
    try {
      const passes = await validations.email(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should return error when field is defined as 0', async function (assert) {
    const data = {email: 0}
    const field = 'email'
    const message = 'email must be email'
    const get = prop
    const args = []
    try {
      const passes = await validations.email(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should skip email validation when email field does not exists', async function (assert) {
    const data = {}
    const field = 'email'
    const message = 'email must be email'
    const get = prop
    const args = []
    const passes = await validations.email(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when valid email is provided', async function (assert) {
    const data = {email: 'foo@bar.com'}
    const field = 'email'
    const message = 'email must be email'
    const get = prop
    const args = []
    const passes = await validations.email(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when valid email with extension is provided', async function (assert) {
    const data = {email: 'foo+baz@bar.com'}
    const field = 'email'
    const message = 'email must be email'
    const get = prop
    const args = []
    const passes = await validations.email(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | Accepted', function () {
  test('should return error when field is defined but not accepted', async function (assert) {
    const data = {terms: false}
    const field = 'terms'
    const message = 'terms must be accepted'
    const get = prop
    const args = []
    try {
      const passes = await validations.accepted(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should pass validation when field is defined and accepted using true', async function (assert) {
    const data = {terms: true}
    const field = 'terms'
    const message = 'terms must be accepted'
    const get = prop
    const args = []
    const passes = await validations.accepted(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should pass validation when field is defined and accepted using string', async function (assert) {
    const data = {terms: 'okay'}
    const field = 'terms'
    const message = 'terms must be accepted'
    const get = prop
    const args = []
    const passes = await validations.accepted(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field is not present or is undefined', async function (assert) {
    const data = {}
    const field = 'terms'
    const message = 'terms must be accepted'
    const get = prop
    const args = []
    const passes = await validations.accepted(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | after', function () {
  test('throw exception when after value is not defined', async function (assert) {
    assert.plan(1)

    const data = {dob: '1980-11-20'}
    const field = 'dob'
    const message = 'dob should be after 2010'
    const get = prop
    const args = []
    try {
      await validations.after(data, field, message, args, get)
    } catch ({ message }) {
      assert.equal(message, 'after:make sure to define the after date')
    }
  })

  test('should throw an error when date is not after defined date', async function (assert) {
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

  test('should work fine when value is after defined date', async function (assert) {
    const data = {dob: '2011-01-01'}
    const field = 'dob'
    const message = 'dob should be after 2010'
    const get = prop
    const args = ['2010-11-20']
    const passes = await validations.after(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when dob is not defined', async function (assert) {
    const data = {}
    const field = 'dob'
    const message = 'dob should be after 2010'
    const get = prop
    const args = ['2010-11-20']
    const passes = await validations.after(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when dob is undefined', async function (assert) {
    const data = {dob: undefined}
    const field = 'dob'
    const message = 'dob should be after 2010'
    const get = prop
    const args = ['2010-11-20']
    const passes = await validations.after(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | alpha', function () {
  test('should throw an error when value is not alpha', async function (assert) {
    const data = {username: 'virk1234'}
    const field = 'username'
    const message = 'username must contain letters only'
    const get = prop
    const args = []
    try {
      const passes = await validations.alpha(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should work fine when value is a valid alpha', async function (assert) {
    const data = {username: 'virk'}
    const field = 'username'
    const message = 'username must contain letters only'
    const get = prop
    const args = []
    const passes = await validations.alpha(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'username'
    const message = 'username must contain letters only'
    const get = prop
    const args = []
    const passes = await validations.alpha(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {username: undefined}
    const field = 'username'
    const message = 'username must contain letters only'
    const get = prop
    const args = []
    const passes = await validations.alpha(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | before', function () {
  test('throw exception when before value is missing', async function (assert) {
    assert.plan(1)

    const data = {dob: '2012-11-20'}
    const field = 'dob'
    const message = 'dob should be before 2010'
    const get = prop
    const args = []

    try {
      await validations.before(data, field, message, args, get)
    } catch ({ message }) {
      assert.equal(message, 'before:make sure to define the before date')
    }
  })

  test('should throw an error when date is not before defined date', async function (assert) {
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

  test('should work fine when value is before defined date', async function (assert) {
    const data = {dob: '2009-01-01'}
    const field = 'dob'
    const message = 'dob should be before 2010'
    const get = prop
    const args = ['2010-11-20']
    const passes = await validations.before(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when dob is not defined', async function (assert) {
    const data = {}
    const field = 'dob'
    const message = 'dob should be before 2010'
    const get = prop
    const args = ['2010-11-20']
    const passes = await validations.before(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when dob is undefined', async function (assert) {
    const data = {dob: undefined}
    const field = 'dob'
    const message = 'dob should be before 2010'
    const get = prop
    const args = ['2010-11-20']
    const passes = await validations.before(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | date', function () {
  test('should throw an error when field value is not a valid date', async function (assert) {
    const data = {dob: '10th'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = []
    try {
      const passes = await validations.date(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should work fine when value of field is a valid date', async function (assert) {
    const data = {dob: '2015-10-20'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = []
    const passes = await validations.date(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when value of field is a valid date but with a differen date format', async function (assert) {
    const data = {dob: '10/20/2015'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = []
    const passes = await validations.date(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = []
    const passes = await validations.date(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {dob: undefined}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = []
    const passes = await validations.date(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | dateFormat', function () {
  test('throw exception when date format is not defined', async function (assert) {
    assert.plan(1)

    const data = {dob: '10th'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = []
    try {
      await validations.dateFormat(data, field, message, args, get)
    } catch ({ message }) {
      assert.equal(message, 'dateFormat:make sure to define atleast one date format')
    }
  })

  test('should throw an error when field value is not a valid date', async function (assert) {
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

  test('should throw an error when field value is a valid date but not according to defined format', async function (assert) {
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

  test('should work fine when field value is a valid date according to given format', async function (assert) {
    const data = {dob: '2015/10/20'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY/MM/DD']
    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should match against multiple formats', async function (assert) {
    const data = {dob: '2015/10/20'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY-MM-DD', 'YYYY/MM/DD']
    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field is not available', async function (assert) {
    const data = {}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY/MM/DD']
    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field is undefined', async function (assert) {
    const data = {dob: undefined}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY/MM/DD']
    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('return error when time is missing from date', async function (assert) {
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

  test('return error when time format is different', async function (assert) {
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

  test('should pass when time is in correct format', async function (assert) {
    const data = {dob: '2015/10/20 23:33:34'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY/MM/DD HH:mm:ss']

    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('ignore timezone when Z identifier is defined', async function (assert) {
    const data = {dob: '2015-10-20T23:33:34+05:30'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY-MM-DDTHH:mm:ssZ']

    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('ignore timezone when ZZ identifier is defined', async function (assert) {
    const data = {dob: '2015-10-20T23:33:34+0530'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY-MM-DDTHH:mm:ssZZ']

    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('fail when timezone is missing and Z identifier is used', async function (assert) {
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

  test('fail when timezone is defined wrongly', async function (assert) {
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

  test('pass when Z identifier is used instead of offset', async function (assert) {
    const data = {dob: '2015-10-20T23:33:34Z'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY-MM-DDTHH:mm:ssZ']

    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('fail when Z identifier is used but with wrong timezone identifier', async function (assert) {
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

  test('pass when milliseconds are expected with timezone offset', async function (assert) {
    const data = {dob: '2015-10-20T23:33:34.231Z'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = prop
    const args = ['YYYY-MM-DDTHH:mm:ss.SSSZ']

    const passes = await validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('fail when milliseconds are expected but they are incorrect', async function (assert) {
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

test.group('Validations | in', function () {
  test('should throw an error when field value is not in defined fields', async function (assert) {
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

  test('should work fine when value of field is under one of the defined values', async function (assert) {
    const data = {gender: 'F'}
    const field = 'gender'
    const message = 'select valid gender'
    const get = prop
    const args = ['F', 'M', 'O']
    const passes = await validations.in(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when expected values are integer', async function (assert) {
    const data = {marks: 10}
    const field = 'marks'
    const message = 'select valid marks'
    const get = prop
    const args = [10, 20, 40]
    const passes = await validations.in(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'marks'
    const message = 'select valid marks'
    const get = prop
    const args = [10, 20, 40]
    const passes = await validations.in(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {marks: undefined}
    const field = 'marks'
    const message = 'select valid marks'
    const get = prop
    const args = [10, 20, 40]
    const passes = await validations.in(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | notIn', function () {
  test('should throw an error when field value is in defined fields', async function (assert) {
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

  test('should work fine when field value is not one of the given options', async function (assert) {
    const data = {username: 'foo'}
    const field = 'username'
    const message = 'select valid username'
    const get = prop
    const args = ['admin', 'super', 'root']
    const passes = await validations.notIn(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field is undefined', async function (assert) {
    const data = {}
    const field = 'username'
    const message = 'select valid username'
    const get = prop
    const args = ['admin', 'super', 'root']
    const passes = await validations.notIn(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {username: undefined}
    const field = 'username'
    const message = 'select valid username'
    const get = prop
    const args = ['admin', 'super', 'root']
    const passes = await validations.notIn(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | requiredIf', function () {
  test('should skip validation when conditional field does not exists', async function (assert) {
    const data = {}
    const field = 'password_confirm'
    const message = 'please confirm password'
    const get = prop
    const args = ['password']
    const passes = await validations.requiredIf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should throw error when conditional field exists and field under validation is missing', async function (assert) {
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

  test('should skip validation when conditional field is null', async function (assert) {
    const data = {password: null}
    const field = 'password_confirm'
    const message = 'please confirm password'
    const get = prop
    const args = ['password']
    const passes = await validations.requiredIf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when field under validation is available', async function (assert) {
    const data = {password: 'foobar', 'password_confirm': 'foobar'}
    const field = 'password_confirm'
    const message = 'please confirm password'
    const get = prop
    const args = ['password']
    const passes = await validations.requiredIf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | requiredWithAny', function () {
  test('should work fine when none of the targeted fields are present', async function (assert) {
    const data = {}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithAny(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should thrown an error when any of the targeted fields are present but actual field is missing', async function (assert) {
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

  test('should thrown an error when any of the targeted fields are present but actual field is value is async null', async function (assert) {
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

  test('should work fine when any of the targeted fields are present and actual field value is valid', async function (assert) {
    const data = {username: 'foo', password: 'bar'}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithAny(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | requiredWithAll', function () {
  test('should work fine when none of the targeted fields are present', async function (assert) {
    const data = {}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithAll(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should thrown an error when all of the targeted fields are present but actual field is missing', async function (assert) {
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

  test('should thrown an error when all of the targeted fields are present but actual field is value is null', async function (assert) {
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

  test('should work fine when all of the targeted fields are present and actual field value is valid', async function (assert) {
    const data = {username: 'foo', password: 'bar', 'email': 'foo@bar.com'}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithAll(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when any of the targeted fields are missings and actual field value is missing too', async function (assert) {
    const data = {username: 'foo'}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithAll(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | requiredWithoutAny', function () {
  test('should work fine when all the targeted fields are present', async function (assert) {
    const data = {username: 'foo', email: 'foo@bar.com'}
    const field = 'password'
    const message = 'enter email or password'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithoutAny(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should thrown an error when any of the targeted fields are missing and actual field is missing', async function (assert) {
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

  test('should thrown an error when any of the targeted fields are missing and actual field is value is async null', async function (assert) {
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

  test('should work fine when all of the targeted fields are missing and actual field value is valid', async function (assert) {
    const data = {password: 'foobar'}
    const field = 'password'
    const message = 'enter email or password'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithoutAny(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | requiredWithoutAll', function () {
  test('should work fine when all the targeted fields are present', async function (assert) {
    const data = {username: 'foo', email: 'foo@bar.com'}
    const field = 'password'
    const message = 'enter username, email or password'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithoutAll(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should thrown an error when all of the targeted fields are missing and actual field is missing', async function (assert) {
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

  test('should thrown an error when all of the targeted fields are missing and actual field is value is async null', async function (assert) {
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

  test('should work fine when all of the targeted fields are missing and actual field value is valid', async function (assert) {
    const data = {password: 'foobar'}
    const field = 'password'
    const message = 'enter username, email or password'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithoutAll(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when any of the targeted fields are missing and actual field value is not preseasync nt', async function (assert) {
    const data = {username: 'foo'}
    const field = 'password'
    const message = 'enter username, email or password'
    const get = prop
    const args = ['username', 'email']
    const passes = await validations.requiredWithoutAll(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | same', function () {
  test('should thrown an error when value of targeted field is not equal to defined field', async function (assert) {
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

  test('should skip validation when target field does not exists', async function (assert) {
    const data = {'password_confirm': 'bar'}
    const field = 'password_confirm'
    const message = 'password should match'
    const get = prop
    const args = ['password']
    const passes = await validations.same(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when actual field does not exists', async function (assert) {
    const data = {}
    const field = 'password_confirm'
    const message = 'password should match'
    const get = prop
    const args = ['password']
    const passes = await validations.same(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when value for both field matches', async function (assert) {
    const data = {password: 'foo', password_confirm: 'foo'}
    const field = 'password_confirm'
    const message = 'password should match'
    const get = prop
    const args = ['password']
    const passes = await validations.same(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when targeted field value exists but actual field does not exists', async function (assert) {
    const data = {password: 'foo'}
    const field = 'password_confirm'
    const message = 'password should match'
    const get = prop
    const args = ['password']
    const passes = await validations.same(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | equals', function () {
  test('should thrown an error when value of targeted field is not equal to defined value', async function (assert) {
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

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'title'
    const message = 'title should be bar'
    const get = prop
    const args = ['bar']
    const passes = await validations.equals(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {title: undefined}
    const field = 'title'
    const message = 'title should be bar'
    const get = prop
    const args = ['bar']
    const passes = await validations.equals(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when value for field matches to defined value', async function (assert) {
    const data = {title: 'bar'}
    const field = 'title'
    const message = 'title should be bar'
    const get = prop
    const args = ['bar']
    const passes = await validations.equals(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when then under validation is a number', async function (assert) {
    const data = {age: 18}
    const field = 'age'
    const message = 'age should be 18'
    const get = prop
    const args = ['18']
    const passes = await validations.equals(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | notEquals', function () {
  test('should thrown an error when value of targeted field is equal to defined value', async function (assert) {
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

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'title'
    const message = 'title should not be bar'
    const get = prop
    const args = ['bar']
    const passes = await validations.notEquals(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {title: undefined}
    const field = 'title'
    const message = 'title should not be bar'
    const get = prop
    const args = ['bar']
    const passes = await validations.notEquals(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when value for field does not matches to defined value', async function (assert) {
    const data = {title: 'foo'}
    const field = 'title'
    const message = 'title should not be bar'
    const get = prop
    const args = ['bar']
    const passes = await validations.notEquals(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | different', function () {
  test('should thrown an error when value of targeted field is equal to defined field', async function (assert) {
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

  test('should skip validation when target field does not exists', async function (assert) {
    const data = {'enrollment_date': '2011-20-10'}
    const field = 'enrollment_date'
    const message = 'enrollment date should be different from dob'
    const get = prop
    const args = ['dob']
    const passes = await validations.different(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when actual field does not exists', async function (assert) {
    const data = {}
    const field = 'enrollment_date'
    const message = 'enrollment date should be different from dob'
    const get = prop
    const args = ['dob']
    const passes = await validations.different(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when value for both fields are different', async function (assert) {
    const data = {dob: '2011-20-10', 'enrollment_date': '2011-20-20'}
    const field = 'enrollment_date'
    const message = 'enrollment date should be different from dob'
    const get = prop
    const args = ['dob']
    const passes = await validations.different(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when targeted field value exists but actual field does not exists', async function (assert) {
    const data = {dob: '2011-20-10'}
    const field = 'enrollment_date'
    const message = 'enrollment date should be different from dob'
    const get = prop
    const args = ['dob']
    const passes = await validations.different(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | range', function () {
  test('should throw an error when value of field is less then defined range', async function (assert) {
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

  test('should throw an error when value of field is greater then defined range', async function (assert) {
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

  test('should throw an error when min value is not defined', async function (assert) {
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
  test('should not throw an error when min value is zero', async function (assert) {
    const data = {age: 20}
    const field = 'age'
    const message = 'only persons less than 60 years of age are allowed'
    const get = prop
    const args = [0, 60]
    const passes = await validations.range(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should throw an error when max value is not defined', async function (assert) {
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
  test('should not throw an error when max value is zero', async function (assert) {
    const data = {temp: -5}
    const field = 'temp'
    const message = 'only negative temperature greater than -10 is allowed'
    const get = prop
    const args = [-10, 0]
    const passes = await validations.range(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'age'
    const message = 'only adults less than 60 years of age are allowed'
    const get = prop
    const args = [18, 60]
    const passes = await validations.range(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {age: undefined}
    const field = 'age'
    const message = 'only adults less than 60 years of age are allowed'
    const get = prop
    const args = [18, 60]
    const passes = await validations.range(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when field value is under defined range', async function (assert) {
    const data = {age: 20}
    const field = 'age'
    const message = 'only adults less than 60 years of age are allowed'
    const get = prop
    const args = [18, 60]
    const passes = await validations.range(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | min', function () {
  test('should throw error when length of field is less than defined length', async function (assert) {
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

  test('should throw error when length of field as number is less than defined length', async function (assert) {
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

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'password'
    const message = 'password should be over 6 characters'
    const get = prop
    const args = [6]
    const passes = await validations.min(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {password: undefined}
    const field = 'password'
    const message = 'password should be over 6 characters'
    const get = prop
    const args = [6]
    const passes = await validations.min(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when length of value of field is greater than defined length', async function (assert) {
    const data = {password: 'foobarbaz'}
    const field = 'password'
    const message = 'password should be over 6 characters'
    const get = prop
    const args = [6]
    const passes = await validations.min(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when length of value of field is equal to the defined length', async function (assert) {
    const data = {password: 'foobar'}
    const field = 'password'
    const message = 'password should be over 6 characters'
    const get = prop
    const args = [6]
    const passes = await validations.min(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should throw error when length of array is less than defined number', async function (assert) {
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

  test('work fine when length of array is equal or over than defined number', async function (assert) {
    const data = {options: ['yes', 'no']}
    const field = 'options'
    const message = 'minimum of 2 options are required for the poll'
    const get = prop
    const args = [2]
    const passes = await validations.min(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | max', function () {
  test('should throw error when length of field is greater than defined length', async function (assert) {
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

  test('should throw error when length of field as number is greater than defined length', async function (assert) {
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

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'password'
    const message = 'password should be less than 6 characters'
    const get = prop
    const args = [6]
    const passes = await validations.max(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {password: undefined}
    const field = 'password'
    const message = 'password should be less than 6 characters'
    const get = prop
    const args = [6]
    const passes = await validations.max(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when length of value of field is less than defined length', async function (assert) {
    const data = {password: 'foo'}
    const field = 'password'
    const message = 'password should be less than 6 characters'
    const get = prop
    const args = [6]
    const passes = await validations.max(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when length of value of field is equal to the defined length', async function (assert) {
    const data = {password: 'foobar'}
    const field = 'password'
    const message = 'password should be less than 6 characters'
    const get = prop
    const args = [6]
    const passes = await validations.max(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw error when array length exceeds the max number', async function (assert) {
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

  test('work fine when array length is within the max number', async function (assert) {
    const data = {users: ['virk', 'nikk']}
    const field = 'users'
    const message = 'max 2 users are allowed'
    const get = prop
    const args = [2]
    const passes = await validations.max(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | above', function () {
  test('should throw error when value of field is less than defined value', async function (assert) {
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

  test('should throw error when value of field is equal to the defined value', async function (assert) {
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

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = prop
    const args = [17]
    const passes = await validations.above(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {age: undefined}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = prop
    const args = [17]
    const passes = await validations.above(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when value of field is greater than defined value', async function (assert) {
    const data = {age: 18}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = prop
    const args = [17]
    const passes = await validations.above(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw exception when comparison value is not defined', async function (assert) {
    assert.plan(1)

    const data = {age: 18}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = prop
    const args = []

    try {
      await validations.above(data, field, message, args, get)
    } catch ({ message }) {
      assert.equal(message, 'above:make sure to define minValue')
    }
  })

  test('pass when values are in strings and user value is over expected value', async function (assert) {
    const data = {age: '18'}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = prop
    const args = ['17']

    const passes = await validations.above(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('fail when values are in strings and user value is under expected value', async function (assert) {
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

test.group('Validations | under', function () {
  test('should throw error when value of field is greater than defined value', async function (assert) {
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

  test('should throw error when value of field is equal to the defined value', async function (assert) {
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

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'age'
    const message = 'age should be less than 10 years for junior idol'
    const get = prop
    const args = [10]
    const passes = await validations.under(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {age: undefined}
    const field = 'age'
    const message = 'age should be less than 10 years for junior idol'
    const get = prop
    const args = [10]
    const passes = await validations.under(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when value of field is less than defined value', async function (assert) {
    const data = {age: 8}
    const field = 'age'
    const message = 'age should be less than 10 years for junior idol'
    const get = prop
    const args = [10]
    const passes = await validations.under(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | includes', function () {
  test('should throw an error when string does not include defined substring', async function (assert) {
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

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'dpath'
    const message = 'path should include app directory'
    const get = prop
    const args = ['app']
    const passes = await validations.includes(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {dpath: undefined}
    const field = 'dpath'
    const message = 'path should include app directory'
    const get = prop
    const args = ['app']
    const passes = await validations.includes(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when field value includes given string', async function (assert) {
    const data = {dpath: '/app/bar'}
    const field = 'dpath'
    const message = 'path should include app directory'
    const get = prop
    const args = ['app']
    const passes = await validations.includes(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | startsWith', function () {
  test('should throw an error when string does not startsWith defined substring', async function (assert) {
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

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'username'
    const message = 'username should start with D'
    const get = prop
    const args = ['D']
    const passes = await validations.startsWith(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {username: undefined}
    const field = 'username'
    const message = 'username should start with D'
    const get = prop
    const args = ['D']
    const passes = await validations.startsWith(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when field value startsWith given string', async function (assert) {
    const data = {username: 'Doe'}
    const field = 'username'
    const message = 'username should start with D'
    const get = prop
    const args = ['D']
    const passes = await validations.startsWith(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | endsWith', function () {
  test('should throw an error when string does not endsWith defined substring', async function (assert) {
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

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'username'
    const message = 'username should end with e'
    const get = prop
    const args = ['e']
    const passes = await validations.endsWith(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {username: undefined}
    const field = 'username'
    const message = 'username should end with e'
    const get = prop
    const args = ['e']
    const passes = await validations.endsWith(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when field value endsWith given string', async function (assert) {
    const data = {username: 'Doe'}
    const field = 'username'
    const message = 'username should end with e'
    const get = prop
    const args = ['e']
    const passes = await validations.endsWith(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | regex', function () {
  test('should throw an error when value does not match regex', async function (assert) {
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

  test('should skip validation when fields does not exists', async function (assert) {
    const data = {}
    const field = 'country'
    const message = 'country should be India with I as uppercase'
    const get = prop
    const args = ['[a-z]']
    const passes = await validations.regex(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when fields value is undefined', async function (assert) {
    const data = {country: undefined}
    const field = 'country'
    const message = 'country should be India with I as uppercase'
    const get = prop
    const args = ['[a-z]']
    const passes = await validations.regex(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when field value satisfies regex pattern', async function (assert) {
    const data = {country: 'India'}
    const field = 'country'
    const message = 'country should be India with I as uppercase'
    const get = prop
    const args = ['[a-z]', 'i']
    const passes = await validations.regex(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | alphaNumeric', function () {
  test('should throw an error when value is not alpha numeric', async function (assert) {
    const data = {username: 'virk@123'}
    const field = 'username'
    const message = 'username must letters and numbers only'
    const get = prop
    const args = []
    try {
      const passes = await validations.alphaNumeric(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should work fine when value is a valid alpha numeric', async function (assert) {
    const data = {username: 'virk123'}
    const field = 'username'
    const message = 'username must letters and numbers only'
    const get = prop
    const args = []
    const passes = await validations.alphaNumeric(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'username'
    const message = 'username must letters and numbers only'
    const get = prop
    const args = []
    const passes = await validations.alphaNumeric(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {username: undefined}
    const field = 'username'
    const message = 'username must letters and numbers only'
    const get = prop
    const args = []
    const passes = await validations.alphaNumeric(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | array', function () {
  test('should throw an error when value is not a valid array', async function (assert) {
    const data = {users: 'foo'}
    const field = 'users'
    const message = 'users list must be an array'
    const get = prop
    const args = []
    try {
      const passes = await validations.array(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should work fine when value is a valid array', async function (assert) {
    const data = {users: ['doe', 'foo', 'bar']}
    const field = 'users'
    const message = 'users list must be an array'
    const get = prop
    const args = []
    const passes = await validations.array(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'users'
    const message = 'users list must be an array'
    const get = prop
    const args = []
    const passes = await validations.array(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {users: undefined}
    const field = 'users'
    const message = 'users list must be an array'
    const get = prop
    const args = []
    const passes = await validations.array(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should throw an error when value of field is an object', async function (assert) {
    const data = {users: {name: 'foo'}}
    const field = 'users'
    const message = 'users list must be an array'
    const get = prop
    const args = []
    try {
      const passes = await validations.array(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })
})

test.group('Validations | url', function () {
  test('should throw an error when value is not a valid url', async function (assert) {
    const data = {github_profile: 'foo'}
    const field = 'github_profile'
    const message = 'github profile must point to a valid url '
    const get = prop
    const args = []
    try {
      const passes = await validations.url(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should work fine when value is a valid url', async function (assert) {
    const data = {github_profile: 'http://github.com/thetutlage'}
    const field = 'github_profile'
    const message = 'github profile must point to a valid url '
    const get = prop
    const args = []
    const passes = await validations.url(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'github_profile'
    const message = 'github profile must point to a valid url '
    const get = prop
    const args = []
    const passes = await validations.url(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {github_profile: undefined}
    const field = 'github_profile'
    const message = 'github profile must point to a valid url '
    const get = prop
    const args = []
    const passes = await validations.url(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | ip', function () {
  test('should throw an error when value is not a valid ip address', async function (assert) {
    const data = {user_ip: '909090909'}
    const field = 'user_ip'
    const message = 'invalid ip address'
    const get = prop
    const args = []
    try {
      const passes = await validations.ip(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should work fine when value is a valid ip address', async function (assert) {
    const data = {user_ip: '127.0.0.1'}
    const field = 'user_ip'
    const message = 'invalid ip address'
    const get = prop
    const args = []
    const passes = await validations.ip(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'user_ip'
    const message = 'invalid ip address'
    const get = prop
    const args = []
    const passes = await validations.ip(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {user_ip: undefined}
    const field = 'user_ip'
    const message = 'invalid ip address'
    const get = prop
    const args = []
    const passes = await validations.ip(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | integer', function () {
  test('should throw an error when value is a string', async function (assert) {
    const data = {marks: '10'}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = prop
    const args = []
    try {
      const passes = await validations.integer(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should throw an error when value is a float', async function (assert) {
    const data = {marks: 10.1}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = prop
    const args = []
    try {
      const passes = await validations.integer(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = prop
    const args = []
    const passes = await validations.integer(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {marks: undefined}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = prop
    const args = []
    const passes = await validations.integer(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when value is an integer', async function (assert) {
    const data = {marks: 10}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = prop
    const args = []
    const passes = await validations.integer(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when value is an integer with zero precision', async function (assert) {
    const data = {marks: 10.0}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = prop
    const args = []
    const passes = await validations.integer(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | boolean', function () {
  test('should throw an error when value is not a boolean', async function (assert) {
    const data = {is_admin: 20}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args = []
    try {
      const passes = await validations.boolean(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should throw an error when value is a string', async function (assert) {
    const data = {is_admin: '20'}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args = []
    try {
      const passes = await validations.boolean(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {is_admin: undefined}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when value is a valid positive boolean', async function (assert) {
    const data = {is_admin: true}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when value is a valid negative boolean', async function (assert) {
    const data = {is_admin: false}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when value is a valid positive numeric boolean', async function (assert) {
    const data = {is_admin: 1}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when value is a valid negative numeric boolean', async function (assert) {
    const data = {is_admin: 0}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when value is a string representation of 0', async function (assert) {
    const data = {is_admin: '0'}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when value is a string representation of 1', async function (assert) {
    const data = {is_admin: '1'}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when value is a string representation of true', async function (assert) {
    const data = {is_admin: 'true'}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when value is a string representation of false', async function (assert) {
    const data = {is_admin: 'false'}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = prop
    const args = []
    const passes = await validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | object', function () {
  test('should throw an error when value is not a valid object', async function (assert) {
    const data = {profile: 'foo'}
    const field = 'profile'
    const message = 'profile must be an object'
    const get = prop
    const args = []
    try {
      const passes = await validations.object(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should work fine when value is a valid object', async function (assert) {
    const data = {profile: {username: 'foo'}}
    const field = 'profile'
    const message = 'profile must be an object'
    const get = prop
    const args = []
    const passes = await validations.object(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'profile'
    const message = 'profile must be an object'
    const get = prop
    const args = []
    const passes = await validations.object(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {profile: undefined}
    const field = 'profile'
    const message = 'profile must be an object'
    const get = prop
    const args = []
    const passes = await validations.object(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should throw an error when value of field is an array', async function (assert) {
    const data = {profile: ['username']}
    const field = 'profile'
    const message = 'profile must be an object'
    const get = prop
    const args = []
    try {
      const passes = await validations.object(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })
})

test.group('Validations | json', function () {
  test('should throw an error when value is not a valid json string', async function (assert) {
    const data = {profile: 'foo'}
    const field = 'profile'
    const message = 'profile must be in json'
    const get = prop
    const args = []
    try {
      const passes = await validations.json(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should work fine when value is a valid json string', async function (assert) {
    const data = {profile: JSON.stringify({name: 'foo'})}
    const field = 'profile'
    const message = 'profile must be in json'
    const get = prop
    const args = []
    const passes = await validations.json(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'profile'
    const message = 'profile must be in json'
    const get = prop
    const args = []
    const passes = await validations.json(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {profile: undefined}
    const field = 'profile'
    const message = 'profile must be in json'
    const get = prop
    const args = []
    const passes = await validations.json(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | ipv4', function () {
  test('should throw an error when value is not a valid ipv4 address', async function (assert) {
    const data = {user_ip: '2001:DB8:0:0:1::1'}
    const field = 'user_ip'
    const message = 'invalid ipv4 address'
    const get = prop
    const args = []
    try {
      const passes = await validations.ipv4(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should work fine when value is a valid ipv4 address', async function (assert) {
    const data = {user_ip: '127.0.0.1'}
    const field = 'user_ip'
    const message = 'invalid ipv4 address'
    const get = prop
    const args = []
    const passes = await validations.ipv4(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'user_ip'
    const message = 'invalid ipv4 address'
    const get = prop
    const args = []
    const passes = await validations.ipv4(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {user_ip: undefined}
    const field = 'user_ip'
    const message = 'invalid ipv4 address'
    const get = prop
    const args = []
    const passes = await validations.ipv4(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | ipv6', function () {
  test('should throw an error when value is not a valid ipv6 address', async function (assert) {
    const data = {user_ip: '127.0.0.1'}
    const field = 'user_ip'
    const message = 'invalid ipv6 address'
    const get = prop
    const args = []
    try {
      const passes = await validations.ipv6(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should work fine when value is a valid ipv6 address', async function (assert) {
    const data = {user_ip: '2001:DB8:0:0:1::1'}
    const field = 'user_ip'
    const message = 'invalid ipv6 address'
    const get = prop
    const args = []
    const passes = await validations.ipv6(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'user_ip'
    const message = 'invalid ipv6 address'
    const get = prop
    const args = []
    const passes = await validations.ipv6(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {user_ip: undefined}
    const field = 'user_ip'
    const message = 'invalid ipv6 address'
    const get = prop
    const args = []
    const passes = await validations.ipv6(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | requiredWhen', function () {
  test('should skip validation when conditional field does not exists', async function (assert) {
    const data = {}
    const field = 'state'
    const message = 'state is required'
    const get = prop
    const args = ['country', 'US']
    const passes = await validations.requiredWhen(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should throw error when conditional field value matches and field under validation is missing', async function (assert) {
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

  test('should skip validation when value of conditional field does not match', async function (assert) {
    const data = {country: 'UK'}
    const field = 'state'
    const message = 'state is required'
    const get = prop
    const args = ['country', 'US']
    const passes = await validations.requiredWhen(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when conditional field is null', async function (assert) {
    const data = {country: null}
    const field = 'state'
    const message = 'state is required'
    const get = prop
    const args = ['country', 'US']
    const passes = await validations.requiredWhen(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when field under validation is available and conditional field value match', async function (assert) {
    const data = {country: 'US', state: 'NewYork'}
    const field = 'state'
    const message = 'state is required'
    const get = prop
    const args = ['country', 'US']
    const passes = await validations.requiredWhen(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('throw exception when expected value is falsy and actual value is missing', async function (assert) {
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

  test('work fine when expected value is falsy and field value exists', async function (assert) {
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

test.group('Validations | afterOffsetOf', function () {
  test('throw exception when offset unit is missing', async function (assert) {
    assert.plan(1)

    const data = {renewal: new Date()}
    const field = 'renewal'
    const message = 'packages are renewed after 12 months'
    const get = prop
    const args = []

    try {
      await validations.afterOffsetOf(data, field, message, args, get)
    } catch ({ message }) {
      assert.equal(message, 'afterOffsetOf:make sure to define offset unit and key')
    }
  })

  test('throw exception when offset unit is key', async function (assert) {
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

  test('should throw an error when date is not after defined offset', async function (assert) {
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

  test('should work fine when value is after defined offset', async function (assert) {
    const data = {renewal: addMonths(new Date(), 13)}
    const field = 'renewal'
    const message = 'packages are renewed after 12 months'
    const get = prop
    const args = ['12', 'months']
    const passes = await validations.afterOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field is not defined', async function (assert) {
    const data = {}
    const field = 'renewal'
    const message = 'packages are renewed after 12 months'
    const get = prop
    const args = ['12', 'months']
    const passes = await validations.afterOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {renewal: undefined}
    const field = 'renewal'
    const message = 'packages are renewed after 12 months'
    const get = prop
    const args = ['12', 'months']
    const passes = await validations.afterOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | beforeOffsetOf', function () {
  test('throw exception when offset unit is missing', async function (assert) {
    assert.plan(1)

    const data = {subscription: new Date()}
    const field = 'subscription'
    const message = '12 months old subscriptions are upgradable'
    const get = prop
    const args = []

    try {
      await validations.beforeOffsetOf(data, field, message, args, get)
    } catch ({ message }) {
      assert.equal(message, 'beforeOffsetOf:make sure to define offset unit and key')
    }
  })

  test('throw exception when offset unit is key', async function (assert) {
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

  test('should throw an error when date is not before defined offset', async function (assert) {
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

  test('should work fine when value is before defined offset', async function (assert) {
    const data = {subscription: subYears(new Date(), 2)}
    const field = 'subscription'
    const message = '12 months old subscriptions are upgradable'
    const get = prop
    const args = ['12', 'months']
    const passes = await validations.beforeOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field is not defined', async function (assert) {
    const data = {}
    const field = 'subscription'
    const message = '12 months old subscriptions are upgradable'
    const get = prop
    const args = ['12', 'months']
    const passes = await validations.beforeOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = {subscription: undefined}
    const field = 'subscription'
    const message = '12 months old subscriptions are upgradable'
    const get = prop
    const args = ['12', 'months']
    const passes = await validations.beforeOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | Confirmation', function () {
  test('should work fine when the confirmed field is equal', async function (assert) {
    const data = { password: '1234', password_confirmation: '1234' }
    const field = 'password'
    const message = 'Password does not match!'
    const get = prop
    const args = []
    const passes = await validations.confirmed(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test("should throw an error when then confirmed field isn't equal", async function (assert) {
    const data = { password: '1234', password_confirmation: '12345' }
    const field = 'password'
    const message = 'Password does not match!'
    const get = prop
    const args = []
    try {
      const passes = await validations.confirmed(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test("should throw an error when then confirmed field isn't equal", async function (assert) {
    const data = { password: '1234', password_confirmation: undefined }
    const field = 'password'
    const message = 'Password does not match!'
    const get = prop
    const args = []
    try {
      const passes = await validations.confirmed(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should skip validation when field value is not defined', async function (assert) {
    const data = { }
    const field = 'password'
    const message = 'Password does not match!'
    const get = prop
    const args = []
    const passes = await validations.confirmed(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = { password: undefined, password_confirmation: undefined }
    const field = 'password'
    const message = 'Password does not match!'
    const get = prop
    const args = []
    const passes = await validations.confirmed(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | String', function () {
  test('should work fine when the confirmed field is string', async function (assert) {
    const data = { username: 'david' }
    const field = 'username'
    const message = 'Username should be a string'
    const get = prop
    const args = []
    const passes = await validations.string(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should throw an error when the confirmed field is a number', async function (assert) {
    const data = { username: 1234 }
    const field = 'username'
    const message = 'Username should be a string'
    const get = prop
    const args = []
    try {
      const passes = await validations.string(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should throw an error when the confirmed field is a boolean', async function (assert) {
    const data = { username: true }
    const field = 'username'
    const message = 'Username should be a string'
    const get = prop
    const args = []
    try {
      const passes = await validations.string(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should skip validation when field value is not defined', async function (assert) {
    const data = { }
    const field = 'username'
    const message = 'Username should be a string'
    const get = prop
    const args = []
    const passes = await validations.string(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = { username: undefined }
    const field = 'username'
    const message = 'Username should be a string'
    const get = prop
    const args = []
    const passes = await validations.string(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | Number', function () {
  test('should work fine when the confirmed field is a number (float)', async function (assert) {
    const data = { price: 12.01 }
    const field = 'price'
    const message = 'Price should be a number'
    const get = prop
    const args = []
    const passes = await validations.number(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when the confirmed field is a number (integer)', async function (assert) {
    const data = { age: 47 }
    const field = 'age'
    const message = 'Age should be a number'
    const get = prop
    const args = []
    const passes = await validations.number(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should throw an error when the confirmed field is a string', async function (assert) {
    const data = { price: 'AnError' }
    const field = 'price'
    const message = 'Price should be a number'
    const get = prop
    const args = []
    try {
      const passes = await validations.number(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should throw an error when the confirmed field is a boolean', async function (assert) {
    const data = { price: true }
    const field = 'price'
    const message = 'Price should be a number'
    const get = prop
    const args = []
    try {
      const passes = await validations.number(data, field, message, args, get)
      assert.notExists(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  test('should skip validation when field value is not defined', async function (assert) {
    const data = { }
    const field = 'price'
    const message = 'Price should be a number'
    const get = prop
    const args = []
    const passes = await validations.number(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should skip validation when field value is undefined', async function (assert) {
    const data = { price: undefined }
    const field = 'price'
    const message = 'Price should be a number'
    const get = prop
    const args = []
    const passes = await validations.number(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})
