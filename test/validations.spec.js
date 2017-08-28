'use strict'

/**
 * indicative
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const test = require('japa')
const Validations = require('../src/Validations')
const _ = require('lodash')
const addMonths = require('date-fns/add_months')
const subYears = require('date-fns/sub_years')

test.group('Validations | required', function () {
  // ////////////////
  // test suite 1 //
  // ////////////////
  test('should reject promise when field is not defined', async function (assert) {
    const data = {}
    const field = 'name'
    const message = 'name is required'
    const get = _.get
    const args = []
    try {
      await Validations.required(data, field, message, args, get)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // ////////////////
  // test suite 2 //
  // ////////////////
  test('should reject promise when field is defined but empty', async function (assert) {
    const data = {name: ''}
    const field = 'name'
    const message = 'name is required'
    const get = _.get
    const args = []
    try {
      await Validations.required(data, field, message, args, get)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // ////////////////
  // test suite 3 //
  // ////////////////
  test('should resolve promise when field is defined and has value', async function (assert) {
    const data = {name: 'virk'}
    const field = 'name'
    const message = 'name is required'
    const get = _.get
    const args = []
    const passes = await Validations.required(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // ////////////////
  // test suite 4 //
  // ////////////////
  test('should resolve promise when field is defined and has boolean negative value', async function (assert) {
    const data = {name: false}
    const field = 'name'
    const message = 'name is required'
    const get = _.get
    const args = []
    const passes = await Validations.required(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // ////////////////
  // test suite 5 //
  // ////////////////
  test('should resolve promise when field is defined and has numeric value', async function (assert) {
    const data = {name: 0}
    const field = 'name'
    const message = 'name is required'
    const get = _.get
    const args = []
    const passes = await Validations.required(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | email', function () {
  // ////////////////
  // test suite 6 //
  // ////////////////
  test('should return error when field is defined and does not have valid email', async function (assert) {
    const data = {email: 'virk'}
    const field = 'email'
    const message = 'email must be email'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.email(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // ////////////////
  // test suite 7 //
  // ////////////////
  test('should return error when field is defined as negative boolean', async function (assert) {
    const data = {email: false}
    const field = 'email'
    const message = 'email must be email'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.email(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // ////////////////
  // test suite 8 //
  // ////////////////
  test('should return error when field is defined as 0', async function (assert) {
    const data = {email: 0}
    const field = 'email'
    const message = 'email must be email'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.email(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // ////////////////
  // test suite 9 //
  // ////////////////
  test('should skip email validation when email field does not exists', async function (assert) {
    const data = {}
    const field = 'email'
    const message = 'email must be email'
    const get = _.get
    const args = []
    const passes = await Validations.email(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // ////////////////////////
  // test suite add later //
  // ////////////////////////
  test('should work fine when valid email is provided', async function (assert) {
    const data = {email: 'foo@bar.com'}
    const field = 'email'
    const message = 'email must be email'
    const get = _.get
    const args = []
    const passes = await Validations.email(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  test('should work fine when valid email with extension is provided', async function (assert) {
    const data = {email: 'foo+baz@bar.com'}
    const field = 'email'
    const message = 'email must be email'
    const get = _.get
    const args = []
    const passes = await Validations.email(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | Accepted', function () {
  // /////////////////
  // test suite 10 //
  // /////////////////
  test('should return error when field is defined but not accepted', async function (assert) {
    const data = {terms: false}
    const field = 'terms'
    const message = 'terms must be accepted'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.accepted(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 11 //
  // /////////////////
  test('should pass validation when field is defined and accepted using true', async function (assert) {
    const data = {terms: true}
    const field = 'terms'
    const message = 'terms must be accepted'
    const get = _.get
    const args = []
    const passes = await Validations.accepted(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 12 //
  // /////////////////
  test('should pass validation when field is defined and accepted using string', async function (assert) {
    const data = {terms: 'okay'}
    const field = 'terms'
    const message = 'terms must be accepted'
    const get = _.get
    const args = []
    const passes = await Validations.accepted(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 14 //
  // /////////////////
  test('should skip validation when field is not present or is undefined', async function (assert) {
    const data = {}
    const field = 'terms'
    const message = 'terms must be accepted'
    const get = _.get
    const args = []
    const passes = await Validations.accepted(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | after', function () {
  // /////////////////
  // test suite 15 //
  // /////////////////
  test('should throw an error when date is not after defined date', async function (assert) {
    const data = {dob: '1980-11-20'}
    const field = 'dob'
    const message = 'dob should be after 2010'
    const get = _.get
    const args = ['2010-11-20']
    try {
      const passes = await Validations.after(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 17 //
  // /////////////////
  test('should work fine when value is after defined date', async function (assert) {
    const data = {dob: '2011-01-01'}
    const field = 'dob'
    const message = 'dob should be after 2010'
    const get = _.get
    const args = ['2010-11-20']
    const passes = await Validations.after(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 18 //
  // /////////////////
  test('should skip validation when dob is not defined', async function (assert) {
    const data = {}
    const field = 'dob'
    const message = 'dob should be after 2010'
    const get = _.get
    const args = ['2010-11-20']
    const passes = await Validations.after(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 19 //
  // /////////////////
  test('should skip validation when dob is undefined', async function (assert) {
    const data = {dob: undefined}
    const field = 'dob'
    const message = 'dob should be after 2010'
    const get = _.get
    const args = ['2010-11-20']
    const passes = await Validations.after(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | alpha', function () {
  // /////////////////
  // test suite 20 //
  // /////////////////
  test('should throw an error when value is not alpha', async function (assert) {
    const data = {username: 'virk1234'}
    const field = 'username'
    const message = 'username must contain letters only'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.alpha(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 22 //
  // /////////////////
  test('should work fine when value is a valid alpha', async function (assert) {
    const data = {username: 'virk'}
    const field = 'username'
    const message = 'username must contain letters only'
    const get = _.get
    const args = []
    const passes = await Validations.alpha(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 23 //
  // /////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'username'
    const message = 'username must contain letters only'
    const get = _.get
    const args = []
    const passes = await Validations.alpha(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 24 //
  // /////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {username: undefined}
    const field = 'username'
    const message = 'username must contain letters only'
    const get = _.get
    const args = []
    const passes = await Validations.alpha(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | before', function () {
  // /////////////////
  // test suite 25 //
  // /////////////////
  test('should throw an error when date is not before defined date', async function (assert) {
    const data = {dob: '2012-11-20'}
    const field = 'dob'
    const message = 'dob should be before 2010'
    const get = _.get
    const args = ['2010-11-20']
    try {
      const passes = await Validations.before(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 27 //
  // /////////////////
  test('should work fine when value is before defined date', async function (assert) {
    const data = {dob: '2009-01-01'}
    const field = 'dob'
    const message = 'dob should be before 2010'
    const get = _.get
    const args = ['2010-11-20']
    const passes = await Validations.before(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 28 //
  // /////////////////
  test('should skip validation when dob is not defined', async function (assert) {
    const data = {}
    const field = 'dob'
    const message = 'dob should be before 2010'
    const get = _.get
    const args = ['2010-11-20']
    const passes = await Validations.before(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 29 //
  // /////////////////
  test('should skip validation when dob is undefined', async function (assert) {
    const data = {dob: undefined}
    const field = 'dob'
    const message = 'dob should be before 2010'
    const get = _.get
    const args = ['2010-11-20']
    const passes = await Validations.before(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | date', function () {
  // /////////////////
  // test suite 30 //
  // /////////////////
  test('should throw an error when field value is not a valid date', async function (assert) {
    const data = {dob: '10th'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.date(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 32 //
  // /////////////////
  test('should work fine when value of field is a valid date', async function (assert) {
    const data = {dob: '2015-10-20'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = _.get
    const args = []
    const passes = await Validations.date(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 33 //
  // /////////////////
  test('should work fine when value of field is a valid date but with a differen date format', async function (assert) {
    const data = {dob: '10/20/2015'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = _.get
    const args = []
    const passes = await Validations.date(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 34 //
  // /////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = _.get
    const args = []
    const passes = await Validations.date(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 35 //
  // /////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {dob: undefined}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = _.get
    const args = []
    const passes = await Validations.date(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | dateFormat', function () {
  // /////////////////
  // test suite 36 //
  // /////////////////
  test('should throw an error when field value is not a valid date', async function (assert) {
    const data = {dob: '10th'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = _.get
    const args = ['YYYY/MM/DD']
    try {
      const passes = await Validations.dateFormat(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 37 //
  // /////////////////
  test('should throw an error when field value is a valid date but not according to defined format', async function (assert) {
    const data = {dob: '10-20-2015'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = _.get
    const args = ['YYYY/MM/DD']
    try {
      const passes = await Validations.dateFormat(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 39 //
  // /////////////////
  test('should work fine when field value is a valid date according to given format', async function (assert) {
    const data = {dob: '2015/10/20'}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = _.get
    const args = ['YYYY/MM/DD']
    const passes = await Validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 40 //
  // /////////////////
  test('should skip validation when field is not available', async function (assert) {
    const data = {}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = _.get
    const args = ['YYYY/MM/DD']
    const passes = await Validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 41 //
  // /////////////////
  test('should skip validation when field is undefined', async function (assert) {
    const data = {dob: undefined}
    const field = 'dob'
    const message = 'dob should be a valid date'
    const get = _.get
    const args = ['YYYY/MM/DD']
    const passes = await Validations.dateFormat(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | in', function () {
  // /////////////////
  // test suite 42 //
  // /////////////////
  test('should throw an error when field value is not in defined fields', async function (assert) {
    const data = {gender: 'Foo'}
    const field = 'gender'
    const message = 'select valid gender'
    const get = _.get
    const args = ['F', 'M', 'O']
    try {
      const passes = await Validations.in(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 44 //
  // /////////////////
  test('should work fine when value of field is under one of the defined values', async function (assert) {
    const data = {gender: 'F'}
    const field = 'gender'
    const message = 'select valid gender'
    const get = _.get
    const args = ['F', 'M', 'O']
    const passes = await Validations.in(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 45 //
  // /////////////////
  test('should work fine when expected values are integer', async function (assert) {
    const data = {marks: 10}
    const field = 'marks'
    const message = 'select valid marks'
    const get = _.get
    const args = [10, 20, 40]
    const passes = await Validations.in(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 46 //
  // /////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'marks'
    const message = 'select valid marks'
    const get = _.get
    const args = [10, 20, 40]
    const passes = await Validations.in(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 47 //
  // /////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {marks: undefined}
    const field = 'marks'
    const message = 'select valid marks'
    const get = _.get
    const args = [10, 20, 40]
    const passes = await Validations.in(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | notIn', function () {
  // /////////////////
  // test suite 48 //
  // /////////////////
  test('should throw an error when field value is in defined fields', async function (assert) {
    const data = {username: 'admin'}
    const field = 'username'
    const message = 'select valid username'
    const get = _.get
    const args = ['admin', 'super', 'root']
    try {
      const passes = await Validations.notIn(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 49 //
  // /////////////////
  test('should work fine when field value is not one of the given options', async function (assert) {
    const data = {username: 'foo'}
    const field = 'username'
    const message = 'select valid username'
    const get = _.get
    const args = ['admin', 'super', 'root']
    const passes = await Validations.notIn(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 50 //
  // /////////////////
  test('should skip validation when field is undefined', async function (assert) {
    const data = {}
    const field = 'username'
    const message = 'select valid username'
    const get = _.get
    const args = ['admin', 'super', 'root']
    const passes = await Validations.notIn(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 51 //
  // /////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {username: undefined}
    const field = 'username'
    const message = 'select valid username'
    const get = _.get
    const args = ['admin', 'super', 'root']
    const passes = await Validations.notIn(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | requiredIf', function () {
  // /////////////////
  // test suite 52 //
  // /////////////////
  test('should skip validation when conditional field does not exists', async function (assert) {
    const data = {}
    const field = 'password_confirm'
    const message = 'please confirm password'
    const get = _.get
    const args = ['password']
    const passes = await Validations.requiredIf(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 53 //
  // /////////////////
  test('should throw error when conditional field exists and field under validation is missing', async function (assert) {
    const data = {password: 'foobar'}
    const field = 'password_confirm'
    const message = 'please confirm password'
    const get = _.get
    const args = ['password']
    try {
      const passes = await Validations.requiredIf(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 54 //
  // /////////////////
  test('should skip validation when conditional field is null', async function (assert) {
    const data = {password: null}
    const field = 'password_confirm'
    const message = 'please confirm password'
    const get = _.get
    const args = ['password']
    const passes = await Validations.requiredIf(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 55 //
  // /////////////////
  test('should work fine when field under validation is available', async function (assert) {
    const data = {password: 'foobar', 'password_confirm': 'foobar'}
    const field = 'password_confirm'
    const message = 'please confirm password'
    const get = _.get
    const args = ['password']
    const passes = await Validations.requiredIf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | requiredWithAny', function () {
  // /////////////////
  // test suite 56 //
  // /////////////////
  test('should work fine when none of the targeted fields are present', async function (assert) {
    const data = {}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = _.get
    const args = ['username', 'email']
    const passes = await Validations.requiredWithAny(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 57 //
  // /////////////////
  test('should thrown an error when any of the targeted fields are present but actual field is missing', async function (assert) {
    const data = {username: 'foo'}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = _.get
    const args = ['username', 'email']
    try {
      const passes = await Validations.requiredWithAny(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 58 //
  // /////////////////
  test('should thrown an error when any of the targeted fields are present but actual field is value is async null', async function (assert) {
    const data = {username: 'foo', password: null}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = _.get
    const args = ['username', 'email']
    try {
      const passes = await Validations.requiredWithAny(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 59 //
  // /////////////////
  test('should work fine when any of the targeted fields are present and actual field value is valid', async function (assert) {
    const data = {username: 'foo', password: 'bar'}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = _.get
    const args = ['username', 'email']
    const passes = await Validations.requiredWithAny(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | requiredWithAll', function () {
  // /////////////////
  // test suite 60 //
  // /////////////////
  test('should work fine when none of the targeted fields are present', async function (assert) {
    const data = {}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = _.get
    const args = ['username', 'email']
    const passes = await Validations.requiredWithAll(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 61 //
  // /////////////////
  test('should thrown an error when all of the targeted fields are present but actual field is missing', async function (assert) {
    const data = {username: 'foo', 'email': 'foo@bar.com'}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = _.get
    const args = ['username', 'email']
    try {
      const passes = await Validations.requiredWithAll(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 62 //
  // /////////////////
  test('should thrown an error when all of the targeted fields are present but actual field is value is async null', async function (assert) {
    const data = {username: 'foo', email: 'foo@bar.com', password: null}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = _.get
    const args = ['username', 'email']
    try {
      const passes = await Validations.requiredWithAll(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 63 //
  // /////////////////
  test('should work fine when all of the targeted fields are present and actual field value is valid', async function (assert) {
    const data = {username: 'foo', password: 'bar', 'email': 'foo@bar.com'}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = _.get
    const args = ['username', 'email']
    const passes = await Validations.requiredWithAll(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 64 //
  // /////////////////
  test('should work fine when any of the targeted fields are missings and actual field value is missing async too', async function (assert) {
    const data = {username: 'foo'}
    const field = 'password'
    const message = 'password is required after username or email'
    const get = _.get
    const args = ['username', 'email']
    const passes = await Validations.requiredWithAll(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | requiredWithoutAny', function () {
  // /////////////////
  // test suite 65 //
  // /////////////////
  test('should work fine when all the targeted fields are present', async function (assert) {
    const data = {username: 'foo', email: 'foo@bar.com'}
    const field = 'password'
    const message = 'enter email or password'
    const get = _.get
    const args = ['username', 'email']
    const passes = await Validations.requiredWithoutAny(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 66 //
  // /////////////////
  test('should thrown an error when any of the targeted fields are missing and actual field is missing', async function (assert) {
    const data = {username: 'foo'}
    const field = 'password'
    const message = 'enter email or password'
    const get = _.get
    const args = ['username', 'email']
    try {
      const passes = await Validations.requiredWithoutAny(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 67 //
  // /////////////////
  test('should thrown an error when any of the targeted fields are missing and actual field is value is async null', async function (assert) {
    const data = {username: 'foo', password: null}
    const field = 'password'
    const message = 'enter email or password'
    const get = _.get
    const args = ['username', 'email']
    try {
      const passes = await Validations.requiredWithoutAny(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 68 //
  // /////////////////
  test('should work fine when all of the targeted fields are missing and actual field value is valid', async function (assert) {
    const data = {password: 'foobar'}
    const field = 'password'
    const message = 'enter email or password'
    const get = _.get
    const args = ['username', 'email']
    const passes = await Validations.requiredWithoutAny(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | requiredWithoutAll', function () {
  // /////////////////
  // test suite 69 //
  // /////////////////
  test('should work fine when all the targeted fields are present', async function (assert) {
    const data = {username: 'foo', email: 'foo@bar.com'}
    const field = 'password'
    const message = 'enter username, email or password'
    const get = _.get
    const args = ['username', 'email']
    const passes = await Validations.requiredWithoutAll(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 70 //
  // /////////////////
  test('should thrown an error when all of the targeted fields are missing and actual field is missing', async function (assert) {
    const data = {}
    const field = 'password'
    const message = 'enter username, email or password'
    const get = _.get
    const args = ['username', 'email']
    try {
      const passes = await Validations.requiredWithoutAll(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 71 //
  // /////////////////
  test('should thrown an error when all of the targeted fields are missing and actual field is value is async null', async function (assert) {
    const data = {password: null}
    const field = 'password'
    const message = 'enter username, email or password'
    const get = _.get
    const args = ['username', 'email']
    try {
      const passes = await Validations.requiredWithoutAll(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 72 //
  // /////////////////
  test('should work fine when all of the targeted fields are missing and actual field value is valid', async function (assert) {
    const data = {password: 'foobar'}
    const field = 'password'
    const message = 'enter username, email or password'
    const get = _.get
    const args = ['username', 'email']
    const passes = await Validations.requiredWithoutAll(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 73 //
  // /////////////////
  test('should work fine when any of the targeted fields are missing and actual field value is not preseasync nt', async function (assert) {
    const data = {username: 'foo'}
    const field = 'password'
    const message = 'enter username, email or password'
    const get = _.get
    const args = ['username', 'email']
    const passes = await Validations.requiredWithoutAll(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | same', function () {
  // /////////////////
  // test suite 74 //
  // /////////////////
  test('should thrown an error when value of targeted field is not equal to defined field', async function (assert) {
    const data = {password: 'foo', 'password_confirm': 'bar'}
    const field = 'password_confirm'
    const message = 'password should match'
    const get = _.get
    const args = ['password']
    try {
      const passes = await Validations.same(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 75 //
  // /////////////////
  test('should skip validation when target field does not exists', async function (assert) {
    const data = {'password_confirm': 'bar'}
    const field = 'password_confirm'
    const message = 'password should match'
    const get = _.get
    const args = ['password']
    const passes = await Validations.same(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 76 //
  // /////////////////
  test('should skip validation when actual field does not exists', async function (assert) {
    const data = {}
    const field = 'password_confirm'
    const message = 'password should match'
    const get = _.get
    const args = ['password']
    const passes = await Validations.same(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 77 //
  // /////////////////
  test('should work fine when value for both field matches', async function (assert) {
    const data = {password: 'foo', password_confirm: 'foo'}
    const field = 'password_confirm'
    const message = 'password should match'
    const get = _.get
    const args = ['password']
    const passes = await Validations.same(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 78 //
  // /////////////////
  test('should skip validation when targeted field value exists but actual field does not exists', async function (assert) {
    const data = {password: 'foo'}
    const field = 'password_confirm'
    const message = 'password should match'
    const get = _.get
    const args = ['password']
    const passes = await Validations.same(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | equals', function () {
  // /////////////////
  // test suite 79 //
  // /////////////////
  test('should thrown an error when value of targeted field is not equal to defined value', async function (assert) {
    const data = {title: 'foo'}
    const field = 'title'
    const message = 'title should be bar'
    const get = _.get
    const args = ['bar']
    try {
      const passes = await Validations.equals(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 80 //
  // /////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'title'
    const message = 'title should be bar'
    const get = _.get
    const args = ['bar']
    const passes = await Validations.equals(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 81 //
  // /////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {title: undefined}
    const field = 'title'
    const message = 'title should be bar'
    const get = _.get
    const args = ['bar']
    const passes = await Validations.equals(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 82 //
  // /////////////////
  test('should work fine when value for field matches to defined value', async function (assert) {
    const data = {title: 'bar'}
    const field = 'title'
    const message = 'title should be bar'
    const get = _.get
    const args = ['bar']
    const passes = await Validations.equals(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 82 //
  // /////////////////
  test('should work fine when then under validation is a number', async function (assert) {
    const data = {age: 18}
    const field = 'age'
    const message = 'age should be 18'
    const get = _.get
    const args = ['18']
    const passes = await Validations.equals(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | notEquals', function () {
  // /////////////////
  // test suite 83 //
  // /////////////////
  test('should thrown an error when value of targeted field is equal to defined value', async function (assert) {
    const data = {title: 'bar'}
    const field = 'title'
    const message = 'title should not be bar'
    const get = _.get
    const args = ['bar']
    try {
      const passes = await Validations.notEquals(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 84 //
  // /////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'title'
    const message = 'title should not be bar'
    const get = _.get
    const args = ['bar']
    const passes = await Validations.notEquals(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 85 //
  // /////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {title: undefined}
    const field = 'title'
    const message = 'title should not be bar'
    const get = _.get
    const args = ['bar']
    const passes = await Validations.notEquals(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 86 //
  // /////////////////
  test('should work fine when value for field does not matches to defined value', async function (assert) {
    const data = {title: 'foo'}
    const field = 'title'
    const message = 'title should not be bar'
    const get = _.get
    const args = ['bar']
    const passes = await Validations.notEquals(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | different', function () {
  // /////////////////
  // test suite 87 //
  // /////////////////
  test('should thrown an error when value of targeted field is equal to defined field', async function (assert) {
    const data = {dob: '2011-20-10', 'enrollment_date': '2011-20-10'}
    const field = 'enrollment_date'
    const message = 'enrollment date should be different from dob'
    const get = _.get
    const args = ['dob']
    try {
      const passes = await Validations.different(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 88 //
  // /////////////////
  test('should skip validation when target field does not exists', async function (assert) {
    const data = {'enrollment_date': '2011-20-10'}
    const field = 'enrollment_date'
    const message = 'enrollment date should be different from dob'
    const get = _.get
    const args = ['dob']
    const passes = await Validations.different(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 89 //
  // /////////////////
  test('should skip validation when actual field does not exists', async function (assert) {
    const data = {}
    const field = 'enrollment_date'
    const message = 'enrollment date should be different from dob'
    const get = _.get
    const args = ['dob']
    const passes = await Validations.different(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 90 //
  // /////////////////
  test('should work fine when value for both fields are different', async function (assert) {
    const data = {dob: '2011-20-10', 'enrollment_date': '2011-20-20'}
    const field = 'enrollment_date'
    const message = 'enrollment date should be different from dob'
    const get = _.get
    const args = ['dob']
    const passes = await Validations.different(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 91 //
  // /////////////////
  test('should skip validation when targeted field value exists but actual field does not exists', async function (assert) {
    const data = {dob: '2011-20-10'}
    const field = 'enrollment_date'
    const message = 'enrollment date should be different from dob'
    const get = _.get
    const args = ['dob']
    const passes = await Validations.different(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | range', function () {
  // /////////////////
  // test suite 92 //
  // /////////////////
  test('should throw an error when value of field is less then defined range', async function (assert) {
    const data = {age: 16}
    const field = 'age'
    const message = 'only adults less than 60 years of age are allowed'
    const get = _.get
    const args = [18, 60]
    try {
      const passes = await Validations.range(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 93 //
  // /////////////////
  test('should throw an error when value of field is greater then defined range', async function (assert) {
    const data = {age: 61}
    const field = 'age'
    const message = 'only adults less than 60 years of age are allowed'
    const get = _.get
    const args = [18, 60]
    try {
      const passes = await Validations.range(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 94 //
  // /////////////////
  test('should throw an error when min value is not defined', async function (assert) {
    const data = {age: 61}
    const field = 'age'
    const message = 'only adults less than 60 years of age are allowed'
    const get = _.get
    const args = [null, 60]
    try {
      const passes = await Validations.range(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.match(e, /min and max values are required/)
    }
  })

  // /////////////////
  // test suite 95 //
  // /////////////////
  test('should throw an error when max value is not defined', async function (assert) {
    const data = {age: 61}
    const field = 'age'
    const message = 'only adults less than 60 years of age are allowed'
    const get = _.get
    const args = [18]
    try {
      const passes = await Validations.range(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.match(e, /min and max values are required/)
    }
  })

  // /////////////////
  // test suite 96 //
  // /////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'age'
    const message = 'only adults less than 60 years of age are allowed'
    const get = _.get
    const args = [18, 60]
    const passes = await Validations.range(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 97 //
  // /////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {age: undefined}
    const field = 'age'
    const message = 'only adults less than 60 years of age are allowed'
    const get = _.get
    const args = [18, 60]
    const passes = await Validations.range(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 98 //
  // /////////////////
  test('should work fine when field value is under defined range', async function (assert) {
    const data = {age: 20}
    const field = 'age'
    const message = 'only adults less than 60 years of age are allowed'
    const get = _.get
    const args = [18, 60]
    const passes = await Validations.range(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | min', function () {
  // /////////////////
  // test suite 99 //
  // /////////////////
  test('should throw error when length of field is less than defined length', async function (assert) {
    const data = {password: 'foo'}
    const field = 'password'
    const message = 'password should be over 6 characters'
    const get = _.get
    const args = [6]
    try {
      const passes = await Validations.min(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 100 //
  // //////////////////
  test('should throw error when length of field as number is less than defined length', async function (assert) {
    const data = {password: 990}
    const field = 'password'
    const message = 'password should be over 6 characters'
    const get = _.get
    const args = [6]
    try {
      const passes = await Validations.min(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 101 //
  // //////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'password'
    const message = 'password should be over 6 characters'
    const get = _.get
    const args = [6]
    const passes = await Validations.min(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 102 //
  // //////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {password: undefined}
    const field = 'password'
    const message = 'password should be over 6 characters'
    const get = _.get
    const args = [6]
    const passes = await Validations.min(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 103 //
  // //////////////////
  test('should work fine when length of value of field is greater than defined length', async function (assert) {
    const data = {password: 'foobarbaz'}
    const field = 'password'
    const message = 'password should be over 6 characters'
    const get = _.get
    const args = [6]
    const passes = await Validations.min(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // //////////////////
  // test suite 104 //
  // //////////////////
  test('should work fine when length of value of field is equal to the defined length', async function (assert) {
    const data = {password: 'foobar'}
    const field = 'password'
    const message = 'password should be over 6 characters'
    const get = _.get
    const args = [6]
    const passes = await Validations.min(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | max', function () {
  // //////////////////
  // test suite 105 //
  // //////////////////
  test('should throw error when length of field is greater than defined length', async function (assert) {
    const data = {password: 'foobarbaz'}
    const field = 'password'
    const message = 'password should be less than 6 characters'
    const get = _.get
    const args = [6]
    try {
      const passes = await Validations.max(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 106 //
  // /////////////////
  test('should throw error when length of field as number is greater than defined length', async function (assert) {
    const data = {password: 1990909990}
    const field = 'password'
    const message = 'password should be less than 6 characters'
    const get = _.get
    const args = [6]
    try {
      const passes = await Validations.max(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 107 //
  // /////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'password'
    const message = 'password should be less than 6 characters'
    const get = _.get
    const args = [6]
    const passes = await Validations.max(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 108 //
  // /////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {password: undefined}
    const field = 'password'
    const message = 'password should be less than 6 characters'
    const get = _.get
    const args = [6]
    const passes = await Validations.max(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 109 //
  // /////////////////
  test('should work fine when length of value of field is less than defined length', async function (assert) {
    const data = {password: 'foo'}
    const field = 'password'
    const message = 'password should be less than 6 characters'
    const get = _.get
    const args = [6]
    const passes = await Validations.max(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 110 //
  // /////////////////
  test('should work fine when length of value of field is equal to the defined length', async function (assert) {
    const data = {password: 'foobar'}
    const field = 'password'
    const message = 'password should be less than 6 characters'
    const get = _.get
    const args = [6]
    const passes = await Validations.max(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | above', function () {
  // //////////////////
  // test suite 111 //
  // //////////////////
  test('should throw error when value of field is less than defined value', async function (assert) {
    const data = {age: 16}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = _.get
    const args = [17]
    try {
      const passes = await Validations.above(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 112 //
  // //////////////////
  test('should throw error when value of field is equal to the defined value', async function (assert) {
    const data = {age: 17}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = _.get
    const args = [17]
    try {
      const passes = await Validations.above(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 113 //
  // //////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = _.get
    const args = [17]
    const passes = await Validations.above(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 114 //
  // //////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {age: undefined}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = _.get
    const args = [17]
    const passes = await Validations.above(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 115 //
  // //////////////////
  test('should work fine when value of field is greater than defined value', async function (assert) {
    const data = {age: 18}
    const field = 'age'
    const message = 'age should be over 17 years'
    const get = _.get
    const args = [17]
    const passes = await Validations.above(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | under', function () {
  // //////////////////
  // test suite 116 //
  // //////////////////
  test('should throw error when value of field is greater than defined value', async function (assert) {
    const data = {age: 11}
    const field = 'age'
    const message = 'age should be less than 10 years for junior idol'
    const get = _.get
    const args = [10]
    try {
      const passes = await Validations.under(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 117 //
  // //////////////////
  test('should throw error when value of field is equal to the defined value', async function (assert) {
    const data = {age: 10}
    const field = 'age'
    const message = 'age should be less than 10 years for junior idol'
    const get = _.get
    const args = [10]
    try {
      const passes = await Validations.under(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 118 //
  // //////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'age'
    const message = 'age should be less than 10 years for junior idol'
    const get = _.get
    const args = [10]
    const passes = await Validations.under(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 119 //
  // //////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {age: undefined}
    const field = 'age'
    const message = 'age should be less than 10 years for junior idol'
    const get = _.get
    const args = [10]
    const passes = await Validations.under(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 120 //
  // //////////////////
  test('should work fine when value of field is less than defined value', async function (assert) {
    const data = {age: 8}
    const field = 'age'
    const message = 'age should be less than 10 years for junior idol'
    const get = _.get
    const args = [10]
    const passes = await Validations.under(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | includes', function () {
  // //////////////////
  // test suite 121 //
  // //////////////////
  test('should throw an error when string does not include defined substring', async function (assert) {
    const data = {dpath: 'foo/bar'}
    const field = 'dpath'
    const message = 'path should include app directory'
    const get = _.get
    const args = ['app']
    try {
      const passes = await Validations.includes(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 122 //
  // //////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'dpath'
    const message = 'path should include app directory'
    const get = _.get
    const args = ['app']
    const passes = await Validations.includes(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 123 //
  // //////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {dpath: undefined}
    const field = 'dpath'
    const message = 'path should include app directory'
    const get = _.get
    const args = ['app']
    const passes = await Validations.includes(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 124 //
  // //////////////////
  test('should work fine when field value includes given string', async function (assert) {
    const data = {dpath: '/app/bar'}
    const field = 'dpath'
    const message = 'path should include app directory'
    const get = _.get
    const args = ['app']
    const passes = await Validations.includes(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | startsWith', function () {
  // //////////////////
  // test suite 125 //
  // //////////////////
  test('should throw an error when string does not startsWith defined substring', async function (assert) {
    const data = {username: 'foo'}
    const field = 'username'
    const message = 'username should start with D'
    const get = _.get
    const args = ['D']
    try {
      const passes = await Validations.startsWith(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 126 //
  // //////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'username'
    const message = 'username should start with D'
    const get = _.get
    const args = ['D']
    const passes = await Validations.startsWith(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 127 //
  // //////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {username: undefined}
    const field = 'username'
    const message = 'username should start with D'
    const get = _.get
    const args = ['D']
    const passes = await Validations.startsWith(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 128 //
  // //////////////////
  test('should work fine when field value startsWith given string', async function (assert) {
    const data = {username: 'Doe'}
    const field = 'username'
    const message = 'username should start with D'
    const get = _.get
    const args = ['D']
    const passes = await Validations.startsWith(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | endsWith', function () {
  // //////////////////
  // test suite 129 //
  // //////////////////
  test('should throw an error when string does not endsWith defined substring', async function (assert) {
    const data = {username: 'foo'}
    const field = 'username'
    const message = 'username should end with e'
    const get = _.get
    const args = ['e']
    try {
      const passes = await Validations.endsWith(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 130 //
  // //////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'username'
    const message = 'username should end with e'
    const get = _.get
    const args = ['e']
    const passes = await Validations.endsWith(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 131 //
  // //////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {username: undefined}
    const field = 'username'
    const message = 'username should end with e'
    const get = _.get
    const args = ['e']
    const passes = await Validations.endsWith(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 132 //
  // //////////////////
  test('should work fine when field value endsWith given string', async function (assert) {
    const data = {username: 'Doe'}
    const field = 'username'
    const message = 'username should end with e'
    const get = _.get
    const args = ['e']
    const passes = await Validations.endsWith(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | regex', function () {
  // //////////////////
  // test suite 133 //
  // //////////////////
  test('should throw an error when value does not match regex', async function (assert) {
    const data = {email: 'foo'}
    const field = 'email'
    const message = 'email should match given regex'
    const get = _.get
    const args = [/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0, 66})\.([a-z]{2, 6}(?:\.[a-z]{2})?)$/]
    try {
      const passes = await Validations.regex(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 134 //
  // //////////////////
  test('should skip validation when fields does not exists', async function (assert) {
    const data = {}
    const field = 'country'
    const message = 'country should be India with I as uppercase'
    const get = _.get
    const args = ['[a-z]']
    const passes = await Validations.regex(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 135 //
  // //////////////////
  test('should skip validation when fields value is undefined', async function (assert) {
    const data = {country: undefined}
    const field = 'country'
    const message = 'country should be India with I as uppercase'
    const get = _.get
    const args = ['[a-z]']
    const passes = await Validations.regex(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 136 //
  // //////////////////
  test('should work fine when field value satisfies regex pattern', async function (assert) {
    const data = {country: 'India'}
    const field = 'country'
    const message = 'country should be India with I as uppercase'
    const get = _.get
    const args = ['[a-z]', 'i']
    const passes = await Validations.regex(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | alphaNumeric', function () {
  // //////////////////
  // test suite 137 //
  // //////////////////
  test('should throw an error when value is not alpha numeric', async function (assert) {
    const data = {username: 'virk@123'}
    const field = 'username'
    const message = 'username must letters and numbers only'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.alphaNumeric(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 139 //
  // //////////////////
  test('should work fine when value is a valid alpha numeric', async function (assert) {
    const data = {username: 'virk123'}
    const field = 'username'
    const message = 'username must letters and numbers only'
    const get = _.get
    const args = []
    const passes = await Validations.alphaNumeric(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // //////////////////
  // test suite 140 //
  // //////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'username'
    const message = 'username must letters and numbers only'
    const get = _.get
    const args = []
    const passes = await Validations.alphaNumeric(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 141 //
  // //////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {username: undefined}
    const field = 'username'
    const message = 'username must letters and numbers only'
    const get = _.get
    const args = []
    const passes = await Validations.alphaNumeric(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | array', function () {
  // //////////////////
  // test suite 142 //
  // //////////////////
  test('should throw an error when value is not a valid array', async function (assert) {
    const data = {users: 'foo'}
    const field = 'users'
    const message = 'users list must be an array'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.array(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 143 //
  // //////////////////
  test('should work fine when value is a valid array', async function (assert) {
    const data = {users: ['doe', 'foo', 'bar']}
    const field = 'users'
    const message = 'users list must be an array'
    const get = _.get
    const args = []
    const passes = await Validations.array(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // //////////////////
  // test suite 144 //
  // //////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'users'
    const message = 'users list must be an array'
    const get = _.get
    const args = []
    const passes = await Validations.array(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 145 //
  // //////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {users: undefined}
    const field = 'users'
    const message = 'users list must be an array'
    const get = _.get
    const args = []
    const passes = await Validations.array(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 146 //
  // //////////////////
  test('should throw an error when value of field is an object', async function (assert) {
    const data = {users: {name: 'foo'}}
    const field = 'users'
    const message = 'users list must be an array'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.array(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })
})

test.group('Validations | url', function () {
  // //////////////////
  // test suite 147 //
  // //////////////////
  test('should throw an error when value is not a valid url', async function (assert) {
    const data = {github_profile: 'foo'}
    const field = 'github_profile'
    const message = 'github profile must point to a valid url '
    const get = _.get
    const args = []
    try {
      const passes = await Validations.url(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 148 //
  // //////////////////
  test('should work fine when value is a valid url', async function (assert) {
    const data = {github_profile: 'http://github.com/thetutlage'}
    const field = 'github_profile'
    const message = 'github profile must point to a valid url '
    const get = _.get
    const args = []
    const passes = await Validations.url(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // //////////////////
  // test suite 149 //
  // //////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'github_profile'
    const message = 'github profile must point to a valid url '
    const get = _.get
    const args = []
    const passes = await Validations.url(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 150 //
  // //////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {github_profile: undefined}
    const field = 'github_profile'
    const message = 'github profile must point to a valid url '
    const get = _.get
    const args = []
    const passes = await Validations.url(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | ip', function () {
  // //////////////////
  // test suite 151 //
  // //////////////////
  test('should throw an error when value is not a valid ip address', async function (assert) {
    const data = {user_ip: '909090909'}
    const field = 'user_ip'
    const message = 'invalid ip address'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.ip(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 152 //
  // //////////////////
  test('should work fine when value is a valid ip address', async function (assert) {
    const data = {user_ip: '127.0.0.1'}
    const field = 'user_ip'
    const message = 'invalid ip address'
    const get = _.get
    const args = []
    const passes = await Validations.ip(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // //////////////////
  // test suite 153 //
  // //////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'user_ip'
    const message = 'invalid ip address'
    const get = _.get
    const args = []
    const passes = await Validations.ip(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 154 //
  // //////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {user_ip: undefined}
    const field = 'user_ip'
    const message = 'invalid ip address'
    const get = _.get
    const args = []
    const passes = await Validations.ip(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | integer', function () {
  // //////////////////
  // test suite 155 //
  // //////////////////
  test('should throw an error when value is a string', async function (assert) {
    const data = {marks: '10'}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.integer(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 156 //
  // //////////////////
  test('should throw an error when value is a float', async function (assert) {
    const data = {marks: 10.1}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.integer(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 157 //
  // //////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = _.get
    const args = []
    const passes = await Validations.integer(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 158 //
  // //////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {marks: undefined}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = _.get
    const args = []
    const passes = await Validations.integer(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 159 //
  // //////////////////
  test('should work fine when value is an integer', async function (assert) {
    const data = {marks: 10}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = _.get
    const args = []
    const passes = await Validations.integer(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // //////////////////
  // test suite 160 //
  // //////////////////
  test('should work fine when value is an integer with zero precision', async function (assert) {
    const data = {marks: 10.0}
    const field = 'marks'
    const message = 'marks should be an integer'
    const get = _.get
    const args = []
    const passes = await Validations.integer(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | boolean', function () {
  // //////////////////
  // test suite 161 //
  // //////////////////
  test('should throw an error when value is not a boolean', async function (assert) {
    const data = {is_admin: 20}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.boolean(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 162 //
  // //////////////////
  test('should throw an error when value is a string', async function (assert) {
    const data = {is_admin: '20'}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.boolean(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 163 //
  // //////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = _.get
    const args = []
    const passes = await Validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 164 //
  // //////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {is_admin: undefined}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = _.get
    const args = []
    const passes = await Validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 165 //
  // //////////////////
  test('should work fine when value is a valid positive boolean', async function (assert) {
    const data = {is_admin: true}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = _.get
    const args = []
    const passes = await Validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // //////////////////
  // test suite 166 //
  // //////////////////
  test('should work fine when value is a valid negative boolean', async function (assert) {
    const data = {is_admin: false}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = _.get
    const args = []
    const passes = await Validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // //////////////////
  // test suite 167 //
  // //////////////////
  test('should work fine when value is a valid positive numeric boolean', async function (assert) {
    const data = {is_admin: 1}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = _.get
    const args = []
    const passes = await Validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // //////////////////
  // test suite 168 //
  // //////////////////
  test('should work fine when value is a valid negative numeric boolean', async function (assert) {
    const data = {is_admin: 0}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = _.get
    const args = []
    const passes = await Validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // //////////////////
  // test suite 169 //
  // //////////////////
  test('should work fine when value is a string representation of 0', async function (assert) {
    const data = {is_admin: '0'}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = _.get
    const args = []
    const passes = await Validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // //////////////////
  // test suite 170 //
  // //////////////////
  test('should work fine when value is a string representation of 1', async function (assert) {
    const data = {is_admin: '1'}
    const field = 'is_admin'
    const message = 'admin identifier should be boolean indicator'
    const get = _.get
    const args = []
    const passes = await Validations.boolean(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | object', function () {
  // //////////////////
  // test suite 171 //
  // //////////////////
  test('should throw an error when value is not a valid object', async function (assert) {
    const data = {profile: 'foo'}
    const field = 'profile'
    const message = 'profile must be an object'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.object(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 172 //
  // //////////////////
  test('should work fine when value is a valid object', async function (assert) {
    const data = {profile: {username: 'foo'}}
    const field = 'profile'
    const message = 'profile must be an object'
    const get = _.get
    const args = []
    const passes = await Validations.object(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // //////////////////
  // test suite 173 //
  // //////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'profile'
    const message = 'profile must be an object'
    const get = _.get
    const args = []
    const passes = await Validations.object(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 174 //
  // //////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {profile: undefined}
    const field = 'profile'
    const message = 'profile must be an object'
    const get = _.get
    const args = []
    const passes = await Validations.object(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 175 //
  // //////////////////
  test('should throw an error when value of field is an array', async function (assert) {
    const data = {profile: ['username']}
    const field = 'profile'
    const message = 'profile must be an object'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.object(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })
})

test.group('Validations | json', function () {
  // //////////////////
  // test suite 176 //
  // //////////////////
  test('should throw an error when value is not a valid json string', async function (assert) {
    const data = {profile: 'foo'}
    const field = 'profile'
    const message = 'profile must be in json'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.json(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 177 //
  // //////////////////
  test('should work fine when value is a valid json string', async function (assert) {
    const data = {profile: JSON.stringify({name: 'foo'})}
    const field = 'profile'
    const message = 'profile must be in json'
    const get = _.get
    const args = []
    const passes = await Validations.json(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // //////////////////
  // test suite 178 //
  // //////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'profile'
    const message = 'profile must be in json'
    const get = _.get
    const args = []
    const passes = await Validations.json(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 179 //
  // //////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {profile: undefined}
    const field = 'profile'
    const message = 'profile must be in json'
    const get = _.get
    const args = []
    const passes = await Validations.json(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | ipv4', function () {
  // //////////////////
  // test suite 180 //
  // //////////////////
  test('should throw an error when value is not a valid ipv4 address', async function (assert) {
    const data = {user_ip: '2001:DB8:0:0:1::1'}
    const field = 'user_ip'
    const message = 'invalid ipv4 address'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.ipv4(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 181 //
  // //////////////////
  test('should work fine when value is a valid ipv4 address', async function (assert) {
    const data = {user_ip: '127.0.0.1'}
    const field = 'user_ip'
    const message = 'invalid ipv4 address'
    const get = _.get
    const args = []
    const passes = await Validations.ipv4(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // //////////////////
  // test suite 182 //
  // //////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'user_ip'
    const message = 'invalid ipv4 address'
    const get = _.get
    const args = []
    const passes = await Validations.ipv4(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 183 //
  // //////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {user_ip: undefined}
    const field = 'user_ip'
    const message = 'invalid ipv4 address'
    const get = _.get
    const args = []
    const passes = await Validations.ipv4(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | ipv6', function () {
  // //////////////////
  // test suite 184 //
  // //////////////////
  test('should throw an error when value is not a valid ipv6 address', async function (assert) {
    const data = {user_ip: '127.0.0.1'}
    const field = 'user_ip'
    const message = 'invalid ipv6 address'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.ipv6(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 185 //
  // //////////////////
  test('should work fine when value is a valid ipv6 address', async function (assert) {
    const data = {user_ip: '2001:DB8:0:0:1::1'}
    const field = 'user_ip'
    const message = 'invalid ipv6 address'
    const get = _.get
    const args = []
    const passes = await Validations.ipv6(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // //////////////////
  // test suite 186 //
  // //////////////////
  test('should skip validation when field does not exists', async function (assert) {
    const data = {}
    const field = 'user_ip'
    const message = 'invalid ipv6 address'
    const get = _.get
    const args = []
    const passes = await Validations.ipv6(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 187 //
  // //////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {user_ip: undefined}
    const field = 'user_ip'
    const message = 'invalid ipv6 address'
    const get = _.get
    const args = []
    const passes = await Validations.ipv6(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | requiredWhen', function () {
  // //////////////////
  // test suite 188 //
  // //////////////////
  test('should skip validation when conditional field does not exists', async function (assert) {
    const data = {}
    const field = 'state'
    const message = 'state is required'
    const get = _.get
    const args = ['country', 'US']
    const passes = await Validations.requiredWhen(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 189 //
  // //////////////////
  test('should throw error when conditional field value matches and field under validation is missing', async function (assert) {
    const data = {country: 'US'}
    const field = 'state'
    const message = 'state is required'
    const get = _.get
    const args = ['country', 'US']
    try {
      const passes = await Validations.requiredWhen(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // //////////////////
  // test suite 189 //
  // //////////////////
  test('should skip validation when of value of conditional field does not match', async function (assert) {
    const data = {country: 'UK'}
    const field = 'state'
    const message = 'state is required'
    const get = _.get
    const args = ['country', 'US']
    const passes = await Validations.requiredWhen(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 190 //
  // //////////////////
  test('should skip validation when conditional field is null', async function (assert) {
    const data = {country: null}
    const field = 'state'
    const message = 'state is required'
    const get = _.get
    const args = ['country', 'US']
    const passes = await Validations.requiredWhen(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 191 //
  // //////////////////
  test('should work fine when field under validation is available and conditional field value match', async function (assert) {
    const data = {country: 'US', state: 'NewYork'}
    const field = 'state'
    const message = 'state is required'
    const get = _.get
    const args = ['country', 'US']
    const passes = await Validations.requiredWhen(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })
})

test.group('Validations | afterOffsetOf', function () {
  // //////////////////
  // test suite 192 //
  // //////////////////
  test('should throw an error when date is not after defined offset', async function (assert) {
    const data = {renewal: new Date()}
    const field = 'renewal'
    const message = 'packages are renewed after 12 months'
    const get = _.get
    const args = ['12', 'months']
    try {
      const passes = await Validations.afterOffsetOf(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // ///////////////////
  // test suite 193 ///
  // ///////////////////
  test('should work fine when value is after defined offset', async function (assert) {
    const data = {renewal: addMonths(new global.Date, 13)}
    const field = 'renewal'
    const message = 'packages are renewed after 12 months'
    const get = _.get
    const args = ['12', 'months']
    const passes = await Validations.afterOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // //////////////////
  // test suite 194 //
  // //////////////////
  test('should skip validation when field is not defined', async function (assert) {
    const data = {}
    const field = 'renewal'
    const message = 'packages are renewed after 12 months'
    const get = _.get
    const args = ['12', 'months']
    const passes = await Validations.afterOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // //////////////////
  // test suite 195 //
  // //////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {renewal: undefined}
    const field = 'renewal'
    const message = 'packages are renewed after 12 months'
    const get = _.get
    const args = ['12', 'months']
    const passes = await Validations.afterOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | beforeOffsetOf', function () {
  // //////////////////
  // test suite 196 //
  // //////////////////
  test('should throw an error when date is not before defined offset', async function (assert) {
    const data = {subscription: new Date()}
    const field = 'subscription'
    const message = '12 months old subscriptions are upgradable'
    const get = _.get
    const args = ['12', 'months']
    try {
      const passes = await Validations.beforeOffsetOf(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // ///////////////////
  // test suite 197 ///
  // ///////////////////
  test('should work fine when value is before defined offset', async function (assert) {
    const data = {subscription: subYears(new global.Date(), 2)}
    const field = 'subscription'
    const message = '12 months old subscriptions are upgradable'
    const get = _.get
    const args = ['12', 'months']
    const passes = await Validations.beforeOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // //////////////////
  // test suite 198 //
  // //////////////////
  test('should skip validation when field is not defined', async function (assert) {
    const data = {}
    const field = 'subscription'
    const message = '12 months old subscriptions are upgradable'
    const get = _.get
    const args = ['12', 'months']
    const passes = await Validations.beforeOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 199 //
  // /////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = {subscription: undefined}
    const field = 'subscription'
    const message = '12 months old subscriptions are upgradable'
    const get = _.get
    const args = ['12', 'months']
    const passes = await Validations.beforeOffsetOf(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | Confirmation', function () {
  // /////////////////
  // test suite 200 //
  // /////////////////
  test('should work fine when the confirmed field is equal', async function (assert) {
    const data = { password: '1234', password_confirmation: '1234' }
    const field = 'password'
    const message = 'Password does not match!'
    const get = _.get
    const args = []
    const passes = await Validations.confirmed(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 201 //
  // /////////////////
  test("should throw an error when then confirmed field isn't equal", async function (assert) {
    const data = { password: '1234', password_confirmation: '12345' }
    const field = 'password'
    const message = 'Password does not match!'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.confirmed(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 202 //
  // /////////////////
  test("should throw an error when then confirmed field isn't equal", async function (assert) {
    const data = { password: '1234', password_confirmation: undefined }
    const field = 'password'
    const message = 'Password does not match!'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.confirmed(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 203 //
  // /////////////////
  test('should skip validation when field value is not defined', async function (assert) {
    const data = { }
    const field = 'password'
    const message = 'Password does not match!'
    const get = _.get
    const args = []
    const passes = await Validations.confirmed(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 204 //
  // /////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = { password: undefined, password_confirmation: undefined }
    const field = 'password'
    const message = 'Password does not match!'
    const get = _.get
    const args = []
    const passes = await Validations.confirmed(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})

test.group('Validations | String', function () {
  // /////////////////
  // test suite 205 //
  // /////////////////
  test('should work fine when the confirmed field is string', async function (assert) {
    const data = { username: 'david' }
    const field = 'username'
    const message = 'Username should be a string'
    const get = _.get
    const args = []
    const passes = await Validations.string(data, field, message, args, get)
    assert.equal(passes, 'validation passed')
  })

  // /////////////////
  // test suite 206 //
  // /////////////////
  test('should throw an error when the confirmed field is a number', async function (assert) {
    const data = { username: 1234 }
    const field = 'username'
    const message = 'Username should be a string'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.string(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 207 //
  // /////////////////
  test('should throw an error when the confirmed field is a boolean', async function (assert) {
    const data = { username: true }
    const field = 'username'
    const message = 'Username should be a string'
    const get = _.get
    const args = []
    try {
      const passes = await Validations.string(data, field, message, args, get)
      assert.notExist(passes)
    } catch (e) {
      assert.equal(e, message)
    }
  })

  // /////////////////
  // test suite 208 //
  // /////////////////
  test('should skip validation when field value is not defined', async function (assert) {
    const data = { }
    const field = 'username'
    const message = 'Username should be a string'
    const get = _.get
    const args = []
    const passes = await Validations.string(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })

  // /////////////////
  // test suite 209 //
  // /////////////////
  test('should skip validation when field value is undefined', async function (assert) {
    const data = { username: undefined }
    const field = 'username'
    const message = 'Username should be a string'
    const get = _.get
    const args = []
    const passes = await Validations.string(data, field, message, args, get)
    assert.equal(passes, 'validation skipped')
  })
})
