'use strict'

/**
 * indicative
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const test = require('japa')
const Parser = require('../src/Parser')

test.group('Parser', function () {
  // ////////////////
  // test suite 1 //
  // ////////////////
  test('should parse a rule and convert it into an object', function (assert) {
    const rules = {
      name: 'required'
    }

    const parsedRules = {
      name: [{
        name: 'required',
        args: []
      }]
    }
    const parsed = {name: Parser.parse(rules.name)}
    assert.deepEqual(parsed, parsedRules)
  })

  // ////////////////
  // test suite 2 //
  // ////////////////
  test('should parse multiple rules and convert them into an object', function (assert) {
    const rules = {
      email: 'email|required'
    }
    const parsedRules = {
      email: [
        {
          name: 'email',
          args: []
        },
        {
          name: 'required',
          args: []
        }
      ]
    }
    const parsed = {email: Parser.parse(rules.email)}
    assert.deepEqual(parsed, parsedRules)
  })

  // ////////////////
  // test suite 3 //
  // ////////////////
  test('should not split rules already defined as array', function (assert) {
    const rules = {
      email: ['email', 'required']
    }
    const parsedRules = {
      email: [
        {
          name: 'email',
          args: []
        },
        {
          name: 'required',
          args: []
        }
      ]
    }
    const parsed = {email: Parser.parse(rules.email)}
    assert.deepEqual(parsed, parsedRules)
  })

  // ////////////////
  // test suite 4 //
  // ////////////////
  test('should extract values defined next to rules', function (assert) {
    const rules = {
      password: 'required|max:4'
    }
    const parsedRules = {
      password: [
        {
          name: 'required',
          args: []
        },
        {
          name: 'max',
          args: ['4']
        }
      ]
    }
    const parsed = {password: Parser.parse(rules.password)}
    assert.deepEqual(parsed, parsedRules)
  })

  // ////////////////
  // test suite 4 //
  // ////////////////
  test('should extract multiple values defined next to rules', function (assert) {
    const rules = {
      password: 'required|between:4,10'
    }
    const parsedRules = {
      password: [
        {
          name: 'required',
          args: []
        },
        {
          name: 'between',
          args: ['4', '10']
        }
      ]
    }
    const parsed = {password: Parser.parse(rules.password)}
    assert.deepEqual(parsed, parsedRules)
  })
})
