'use strict'

/**
 * indicative
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const Parser = require('../src/Parser')
const chai   = require('chai')
const expect = chai.expect

describe('Parser', function() {

  //////////////////
  // test suite 1 //
  //////////////////
  it('should parse a rule and convert it into an object', function () {

    const rules = {
      name: 'required',
    }

    const parsedRules = {
      name : {
        rules: {
          required: {
            args: []
          }
        }
      },
    }
    const parsed = {name:Parser.parse(rules.name)}
    expect(parsed).deep.equal(parsedRules)
  })

  //////////////////
  // test suite 2 //
  //////////////////
  it('should parse multiple rules and convert them into an object', function () {
    const rules = {
      email: 'email|required'
    }
    const parsedRules = {
      email : {
        rules: {
          email: {
            args: []
          },
          required: {
            args: []
          }
        }
      }
    }
    const parsed = {email:Parser.parse(rules.email)}
    expect(parsed).deep.equal(parsedRules)
  })

  //////////////////
  // test suite 3 //
  //////////////////
  it('should not split rules already defined as array', function () {
    const rules = {
      email: ['email','required']
    }
    const parsedRules = {
      'email' : {
        rules: {
          email: {
            args: []
          },
          required: {
            args: []
          }
        }
      }
    }
    const parsed = {email:Parser.parse(rules.email)}
    expect(parsed).deep.equal(parsedRules)
  })

  //////////////////
  // test suite 4 //
  //////////////////
  it('should extract values defined next to rules', function () {
    const rules = {
      password: 'required|max:4'
    }
    const parsedRules = {
      password: {
        rules: {
          required: {
            args: []
          },
          max: {
            args: ['4']
          }
        },
      }
    }
    const parsed = {password:Parser.parse(rules.password)}
    expect(parsed).deep.equal(parsedRules)
  })

  //////////////////
  // test suite 4 //
  //////////////////
  it('should extract multiple values defined next to rules', function () {
    const rules = {
      password: 'required|between:4,10'
    }
    const parsedRules = {
      password: {
        rules: {
          required: {
            args: []
          },
          between: {
            args: ['4','10']
          }
        },
      }
    }
    const parsed = {password:Parser.parse(rules.password)}
    expect(parsed).deep.equal(parsedRules)
  })

  //////////////////
  // test suite 5 //
  //////////////////
  it('should convert snake case values to camelcase', function () {
    const rule = 'alpha_numeric'
    const convertedRule = Parser.toCamelCase(rule)
    expect(convertedRule).to.equal('alphaNumeric')
  })

  //////////////////
  // test suite 6 //
  //////////////////
  it('should convert multiple snake case values to camelcase', function () {
    const rule = 'before_offset_of'
    const convertedRule = Parser.toCamelCase(rule)
    expect(convertedRule).to.equal('beforeOffsetOf')
  })

})
