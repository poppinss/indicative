'use strict'

/**
 * indicative
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const Messages = require('../src/Messages')
const chai = require('chai')
const expect = chai.expect

describe('Messages', function () {
  // ////////////////
  // test suite 1 //
  // ////////////////
  it('should return default message when custom messages are not defined', function () {
    const message = Messages.make({}, 'email', 'required')
    expect(message).to.equal('required validation failed on email')
  })

  // ////////////////
  // test suite 2 //
  // ////////////////
  it('should return message defined for rule', function () {
    const message = Messages.make({required: 'this is required'}, 'email', 'required')
    expect(message).to.equal('this is required')
  })

  // ////////////////
  // test suite 3 //
  // ////////////////
  it('should return message defined on field for rule', function () {
    const message = Messages.make({required: 'this is required', 'email.required': 'email is required'}, 'email', 'required')
    expect(message).to.equal('email is required')
  })

  // ////////////////
  // test suite 4 //
  // ////////////////
  it('should construct valid error message from dynamic placholders', function () {
    const message = Messages.make(
      {
        'email.required': '{{field}} is required'
      },
      'email',
      'required',
      'foo',
      []
    )
    expect(message).to.equal('email is required')
  })

  // ////////////////
  // test suite 5 //
  // ////////////////
  it('should be able to use rule values as argument', function () {
    const message = Messages.make(
      {
        'between': '{{field}} should be over {{argument.0}} and under {{argument.1}}'
      },
      'age',
      'between',
      [18, 40]
    )
    expect(message).to.equal('age should be over 18 and under 40')
  })

  // ////////////////
  // test suite 6 //
  // ////////////////
  it('should be able make message out of getter function', function () {
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
    expect(message).to.equal('age should be over 18 and under 40')
  })

  // ////////////////
  // test suite 7 //
  // ////////////////
  it('should be able to set message for a given rule using set method', function () {
    Messages.set('required', 'I need you')
    const message = Messages.make({}, 'username', 'required', [])
    expect(message).to.equal('I need you')
  })
})
