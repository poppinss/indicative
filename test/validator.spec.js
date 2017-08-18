'use strict'

/**
 * indicative
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const test = require('japa')
const Validator = require('../src/Validator')
const Rule = require('../src/Rule')

test.group('Validator', function () {
  // ////////////////
  // test suite 1 //
  // ////////////////
  test('should validate an object of rules', async function (assert) {
    const rules = {
      username: 'required'
    }

    const body = {
    }

    try {
      const passed = await Validator.validate(body, rules)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].field, 'username')
      assert.equal(e[0].validation, 'required')
    }
  })

  // ////////////////
  // test suite 2 //
  // ////////////////
  test('should validate multiple rules on same field', async function (assert) {
    const rules = {
      username: 'alpha|alphaNumeric'
    }

    const body = {
      username: 'aman@33$'
    }

    try {
      const passed = await Validator.validateAll(body, rules)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].field, 'username')
      assert.equal(e[0].validation, 'alpha')
      assert.equal(e[1].field, 'username')
      assert.equal(e[1].validation, 'alphaNumeric')
    }
  })

  // ////////////////
  // test suite 3 //
  // ////////////////
  test('should run all validations defined under rules object', async function (assert) {
    const rules = {
      age: 'required',
      phone: 'required'
    }

    const body = {
    }

    try {
      const passed = await Validator.validateAll(body, rules)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].field, 'age')
      assert.equal(e[0].validation, 'required')
      assert.equal(e[1].field, 'phone')
      assert.equal(e[1].validation, 'required')
    }
  })

  // ////////////////
  // test suite 4 //
  // ////////////////
  test('should return custom messages instead of default messages', async function (assert) {
    const rules = {
      age: 'required',
      phone: 'required'
    }

    const body = {
    }

    const messages = {
      'age.required': 'Age is required',
      'phone.required': function () {
        return 'Phone number is required for validations'
      }
    }

    try {
      const passed = await Validator.validateAll(body, rules, messages)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].message, messages['age.required'])
      assert.equal(e[1].message, messages['phone.required']())
    }
  })

  // ////////////////
  // test suite 5 //
  // ////////////////
  test('should return original data when validation passes', async function (assert) {
    const rules = {
      age: 'required',
      phone: 'required'
    }

    const body = {
      age: 22,
      phone: 9192910200
    }

    const validated = await Validator.validate(body, rules)
    assert.equal(validated, body)
  })

  // ////////////////
  // test suite 6 //
  // ////////////////
  test('should return original data when validation passes using validate method', async function (assert) {
    const rules = {
      age: 'required',
      phone: 'required'
    }

    const body = {
      age: 22,
      phone: 9192910200
    }

    const validated = await Validator.validate(body, rules)
    assert.equal(validated, body)
  })

  // ////////////////
  // test suite 7 //
  // ////////////////
  test('should return errors thrown within validation cycle', async function (assert) {
    const rules = {
      age: 'foo',
      phone: 'required'
    }

    const body = {
      age: 22,
      phone: 9192910200
    }

    try {
      const validated = await Validator.validate(body, rules)
      assert.notExist(validated)
    } catch (e) {
      assert.match(e, /foo is not defined as a validation/i)
    }
  })

  // ////////////////
  // test suite 8 //
  // ////////////////
  test('should be able to add it\'s own rules to validation store', async function (assert) {
    const phone = function (data, field, message, args, get) {
      return new Promise(function (resolve, reject) {
        reject(message)
      })
    }
    Validator.extend('phone', phone, 'Enter valid phone number')

    const rules = {
      contact_no: 'phone'
    }
    const body = {}

    try {
      const validated = await Validator.validate(body, rules)
      assert.notExist(validated)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].validation, 'phone')
      assert.equal(e[0].message, 'Enter valid phone number')
    }
  })

  // ////////////////
  // test suite 9 //
  // ////////////////
  test('should return original data when validation passes using validateAll method', async function (assert) {
    const rules = {
      age: 'required|integer',
      phone: 'required'
    }

    const body = {
      age: 22,
      phone: 9192910200
    }

    const validated = await Validator.validateAll(body, rules)
    assert.equal(validated, body)
  })

  // /////////////////
  // test suite 10 //
  // /////////////////
  test('should validate not multiple rules when using validate method', async function (assert) {
    const rules = {
      username: 'alpha|alphaNumeric'
    }

    const body = {
      username: 'aman@33$'
    }

    try {
      const passed = await Validator.validate(body, rules)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].field, 'username')
      assert.equal(e[0].validation, 'alpha')
      assert.equal(e[1], undefined)
    }
  })

  // /////////////////
  // test suite 11 //
  // /////////////////
  test('should throw errors when valid function is not passed to extend method', async function (assert) {
    const fn = function () {
      return Validator.extend('phone', '', '')
    }
    assert.throws(fn, /Invalid arguments/)
  })

  // /////////////////
  // test suite 12 //
  // /////////////////
  test('should extend raw validator', function (assert) {
    const presence = function (hash, item) {
      return hash[item]
    }
    Validator.is.extend('presence', presence)
    const isPresent = Validator.is.presence({foo: 'bar'}, 'foo')
    assert.equal(isPresent, 'bar')
  })

  // /////////////////
  // test suite 13 //
  // /////////////////
  test('should throw error when function is not passed to is.extend', function (assert) {
    const fn = function () {
      return Validator.is.extend('presence', 'presence')
    }
    assert.throws(fn, /Invalid arguments/)
  })

  // /////////////////
  // test suite 14 //
  // /////////////////
  test('should be able to define multiple rules as an array instead of | symbol', async function (assert) {
    const rules = {
      username: [Rule('alpha'), Rule('alphaNumeric')]
    }

    const body = {
      username: 'virk@33$'
    }

    try {
      const passed = await Validator.validateAll(body, rules)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].field, 'username')
      assert.equal(e[0].validation, 'alpha')
      assert.equal(e[1].field, 'username')
      assert.equal(e[1].validation, 'alphaNumeric')
    }
  })

  test('should be able to define regex as an array', async function (assert) {
    const rules = {
      name: [Rule('regex', /[a-zA-z]+$/)]
    }

    const body = {
      name: 'virk@33$'
    }

    try {
      const passed = await Validator.validate(body, rules)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].field, 'name')
      assert.equal(e[0].validation, 'regex')
    }
  })

  // /////////////////
  // test suite 16 //
  // /////////////////
  test('should run all validations on multiple fields using validateAll', async function (assert) {
    const rules = {
      username: 'required',
      email: 'required'
    }

    const body = {
    }

    try {
      const passed = await Validator.validateAll(body, rules)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].field, 'username')
      assert.equal(e[0].validation, 'required')
      assert.equal(e[1].field, 'email')
      assert.equal(e[1].validation, 'required')
    }
  })

  // /////////////////
  // test suite 17 //
  // /////////////////
  test('should make use of snake case validations', async function (assert) {
    const rules = {
      username: 'alpha_numeric'
    }

    const body = {
      username: 'virk@33$'
    }

    try {
      const passed = await Validator.validate(body, rules)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].field, 'username')
      assert.equal(e[0].validation, 'alpha_numeric')
    }
  })

  // /////////////////
  // test suite 18 //
  // /////////////////
  test('should be able to define custom messages for snake case rules', async function (assert) {
    const rules = {
      username: 'alpha_numeric'
    }

    const body = {
      username: 'virk@33$'
    }

    const messages = {
      'alpha_numeric': 'special chars not allowed'
    }

    try {
      const passed = await Validator.validate(body, rules, messages)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].field, 'username')
      assert.equal(e[0].validation, 'alpha_numeric')
      assert.equal(e[0].message, messages['alpha_numeric'])
    }
  })

  // /////////////////
  // test suite 19 //
  // /////////////////

  test('should fail validation when empty string is passed for any rule with strict mode on', async function (assert) {
    Validator.setMode('strict')

    const rules = {
      select: 'array'
    }

    const body = {
      select: ''
    }

    try {
      const passed = await Validator.validate(body, rules)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].field, 'select')
      assert.equal(e[0].validation, 'array')
    }
  })

  // /////////////////
  // test suite 20 //
  // /////////////////

  test('should not fail validation when empty string is passed for any rule in normal mode', async function (assert) {
    Validator.setMode('normal')

    const rules = {
      select: 'array'
    }

    const body = {
      select: ''
    }

    const passed = await Validator.validate(body, rules)
    assert.isObject(passed)
    assert.property(passed, 'select')
  })

  // /////////////////
  // test suite 21 //
  // /////////////////
  test('should be able to validate nested objects using array expression', async function (assert) {
    const rules = {
      'person.*.firstname': 'required'
    }
    const data = {
      person: [{
        firstname: null
      }]
    }

    try {
      const passed = await Validator.validate(data, rules)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].field, 'person.0.firstname')
      assert.equal(e[0].validation, 'required')
    }
  })

  // /////////////////
  // test suite 22 //
  // /////////////////
  test('should be able to validate multiple nested objects using array expression', async function (assert) {
    const rules = {
      'person.*.firstname': 'required'
    }
    const data = {
      person: [
        {
          firstname: 'virk'
        },
        {
          firstname: null
        }
      ]
    }

    try {
      const passed = await Validator.validate(data, rules)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].field, 'person.1.firstname')
      assert.equal(e[0].validation, 'required')
    }
  })

  // /////////////////
  // test suite 23 //
  // /////////////////
  test('should be able to validate flat arrays using array expression', async function (assert) {
    const rules = {
      'email.*': 'email'
    }
    const data = {
      email: ['virkm']
    }

    try {
      const passed = await Validator.validate(data, rules)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].field, 'email.0')
      assert.equal(e[0].validation, 'email')
    }
  })

  // /////////////////
  // test suite 24 //
  // /////////////////
  test('should be able to validate multiple values inside flat arrays using array expression', async function (assert) {
    const rules = {
      'email.*': 'email'
    }
    const data = {
      email: ['foo@bar.com', 'barnseek']
    }

    try {
      const passed = await Validator.validate(data, rules)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].field, 'email.1')
      assert.equal(e[0].validation, 'email')
    }
  })

  // /////////////////
  // test suite 25 //
  // /////////////////
  test('should throw an error when value is not an array', async function (assert) {
    const rules = {
      people: 'array',
      'people.*.email': 'required|email'
    }

    const data = {
      people: ''
    }

    try {
      Validator.setMode('strict')
      const passed = await Validator.validate(data, rules)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e.length, 1)
      assert.equal(e[0].field, 'people')
      assert.equal(e[0].validation, 'array')
    }
  })

  // /////////////////
  // test suite 26 //
  // /////////////////
  test('should throw an error when value is an array but childs does not exists', async function (assert) {
    const rules = {
      people: 'array',
      'people.*.email': 'required|email'
    }

    const data = {
      people: [{}]
    }

    try {
      const passed = await Validator.validate(data, rules)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e.length, 1)
      assert.equal(e[0].field, 'people.0.email')
      assert.equal(e[0].validation, 'required')
    }
  })

  // /////////////////
  // test suite 27 //
  // /////////////////
  test('should throw an error when value is an array but childs are not valid', async function (assert) {
    const rules = {
      people: 'array',
      'people.*.email': 'required|email'
    }

    const data = {
      people: [{email: 'foo'}]
    }

    try {
      const passed = await Validator.validate(data, rules)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e.length, 1)
      assert.equal(e[0].field, 'people.0.email')
      assert.equal(e[0].validation, 'email')
    }
  })

  // /////////////////
  // test suite 28 //
  // /////////////////
  test('should throw an error when value is an array but one of the multiple childs is not valid', async function (assert) {
    const rules = {
      people: 'array',
      'people.*.email': 'required|email'
    }

    const data = {
      people: [{email: 'foo@bar.com'}, {email: 'snee'}]
    }

    try {
      const passed = await Validator.validate(data, rules)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e.length, 1)
      assert.equal(e[0].field, 'people.1.email')
      assert.equal(e[0].validation, 'email')
    }
  })

  // /////////////////
  // test suite 29 //
  // /////////////////
  test('should be able to define custom messages for array expressions', async function (assert) {
    const rules = {
      people: 'array',
      'people.*.email': 'required|email'
    }

    const data = {
      people: [{email: 'foo@bar.com'}, {email: 'snee'}]
    }

    const messages = {
      'people.*.email.email': 'Enter valid email address'
    }

    try {
      const passed = await Validator.validate(data, rules, messages)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e.length, 1)
      assert.equal(e[0].field, 'people.1.email')
      assert.equal(e[0].validation, 'email')
      assert.equal(e[0].message, 'Enter valid email address')
    }
  })

  // /////////////////
  // test suite 30 //
  // /////////////////
  test('should be able to define messages for flat array expression', async function (assert) {
    const rules = {
      'email.*': 'email'
    }
    const data = {
      email: ['virkm']
    }
    const messages = {
      'email.*.email': 'Email address is not valid'
    }

    try {
      const passed = await Validator.validate(data, rules, messages)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].field, 'email.0')
      assert.equal(e[0].validation, 'email')
      assert.equal(e[0].message, 'Email address is not valid')
    }
  })

  // /////////////////
  // test suite 31 //
  // /////////////////
  test('should be able to define messages and make use of dynamic attributes', async function (assert) {
    const rules = {
      'email.*': 'email'
    }
    const data = {
      email: ['virkm']
    }
    const messages = {
      'email.*.email': '{{field}} is not a valid email'
    }

    try {
      const passed = await Validator.validate(data, rules, messages)
      assert.notExist(passed)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].field, 'email.0')
      assert.equal(e[0].validation, 'email')
      assert.equal(e[0].message, 'email.0 is not a valid email')
    }
  })

  // /////////////////
  // test suite 32 //
  // /////////////////
  test('should not mutate the actual data set', async function (assert) {
    const rules = {
    }

    const data = {
      username: ''
    }

    const passed = await Validator.validate(data, rules)
    assert.deepEqual(passed, data)
  })

  // /////////////////
  // test suite 33 //
  // /////////////////
  test('should not mutate actual data set in strict mode', async function (assert) {
    const rules = {
      email: 'required'
    }

    const data = {
      username: '',
      email: 'foo@bar.com'
    }

    Validator.setMode('strict')
    const passed = await Validator.validate(data, rules)
    assert.deepEqual(passed, data)
  })

  test('should skip the string validation when value is null', async function (assert) {
    const rules = {
      description: 'string'
    }

    const data = {
      description: null
    }

    Validator.setMode('normal')
    const passed = await Validator.validate(data, rules)
    assert.deepEqual(passed, data)
  })

  test('should be able to add it\'s own validation messages to validation store', async function (assert) {
    const phone = function (data, field, message, args, get) {
      return new Promise(function (resolve, reject) {
        reject(message)
      })
    }
    Validator.extend('isPhone', phone, 'Enter valid phone number')

    const rules = {
      contact_no: 'is_phone'
    }
    const body = {}

    try {
      const validated = await Validator.validate(body, rules)
      assert.notExist(validated)
    } catch (e) {
      assert.isArray(e)
      assert.equal(e[0].validation, 'is_phone')
      assert.equal(e[0].message, 'Enter valid phone number')
    }
  })

  test('define date format rule', async function (assert) {
    const rules = {
      date: [Rule('date_format', 'HH:mm:ss')]
    }

    const body = {
      date: '12:22:22'
    }

    const passed = await Validator.validateAll(body, rules)
    assert.deepEqual(passed, body)
  })
})
