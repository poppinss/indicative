'use strict'

/**
 * indicative
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const test = require('japa')
const Messages = require('../src/Messages')

test.group('Messages', function () {
  // ////////////////
  // test suite 1 //
  // ////////////////
  test('should return default message when custom messages are not defined', function (assert) {
    const message = Messages.make({}, 'email', 'required')
    assert.equal(message, 'required validation failed on email')
  })

  // ////////////////
  // test suite 2 //
  // ////////////////
  test('should return message defined for rule', function (assert) {
    const message = Messages.make({required: 'this is required'}, 'email', 'required')
    assert.equal(message, 'this is required')
  })

  // ////////////////
  // test suite 3 //
  // ////////////////
  test('should return message defined on field for rule', function (assert) {
    const message = Messages.make({required: 'this is required', 'email.required': 'email is required'}, 'email', 'required')
    assert.equal(message, 'email is required')
  })

  // ////////////////
  // test suite 4 //
  // ////////////////
  test('should construct valid error message from dynamic placholders', function (assert) {
    const message = Messages.make(
      {
        'email.required': '{{field}} is required'
      },
      'email',
      'required',
      'foo',
      []
    )
    assert.equal(message, 'email is required')
  })

  // ////////////////
  // test suite 5 //
  // ////////////////
  test('should be able to use rule values as argument', function (assert) {
    const message = Messages.make(
      {
        'between': '{{field}} should be over {{argument.0}} and under {{argument.1}}'
      },
      'age',
      'between',
      [18, 40]
    )
    assert.equal(message, 'age should be over 18 and under 40')
  })

  // ////////////////
  // test suite 6 //
  // ////////////////
  test('should be able make message out of getter function', function (assert) {
    const message = Messages.make(
      {
        'between': function (field, validation, args) {
          return field + ' should be over ' + args[0] + ' and under ' + args[1]
        }
      },
      'age',
      'between',
      [18, 40]
    )
    assert.equal(message, 'age should be over 18 and under 40')
  })

  // ////////////////
  // test suite 7 //
  // ////////////////
  test('should be able to set message for a given rule using set method', function (assert) {
    Messages.set('required', 'I need you')
    const message = Messages.make({}, 'username', 'required', [])
    assert.equal(message, 'I need you')
  })
})
