'use strict'

/**
 * indicative
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const Validator = require('../src/Validator')
const chai = require('chai')
const expect = chai.expect

require('co-mocha')

describe('Validator', function() {

  //////////////////
  // test suite 1 //
  //////////////////
  it('should validate an object of rules', function * () {
    const rules = {
      username: 'required'
    }

    const body = {
    }

    try{
      const passed = yield Validator.validate(rules, body)
      expect(passed).not.to.exist()
    }catch(e){
      expect(e).to.be.an('array')
      expect(e[0].field).to.equal('username')
      expect(e[0].validation).to.equal('required')
    }
  })

  //////////////////
  // test suite 2 //
  //////////////////
  it('should validate multiple rules on same field', function * () {
    const rules = {
      username: 'alpha|alphaNumeric'
    }

    const body = {
      username: 'aman@33$'
    }

    try{
      const passed = yield Validator.validateAll(rules, body)
      expect(passed).not.to.exist()
    }catch(e){
      expect(e).to.be.an('array')
      expect(e[0].field).to.equal('username')
      expect(e[0].validation).to.equal('alpha')
      expect(e[1].field).to.equal('username')
      expect(e[1].validation).to.equal('alphaNumeric')
    }
  })

  //////////////////
  // test suite 3 //
  //////////////////
  it('should run all validations defined under rules object', function * () {
    const rules = {
      age: 'required',
      phone: 'required'
    }

    const body = {
    }

    try{
      const passed = yield Validator.validateAll(rules, body)
      expect(passed).not.to.exist()
    }catch(e){
      expect(e).to.be.an('array')
      expect(e[0].field).to.equal('age')
      expect(e[0].validation).to.equal('required')
      expect(e[1].field).to.equal('phone')
      expect(e[1].validation).to.equal('required')
    }
  })

  //////////////////
  // test suite 4 //
  //////////////////
  it('should return custom messages instead of default messages', function * () {
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

    try{
      const passed = yield Validator.validateAll(rules, body, messages)
      expect(passed).not.to.exist()
    }catch(e){
      expect(e).to.be.an('array')
      expect(e[0].message).to.equal(messages['age.required'])
      expect(e[1].message).to.equal(messages['phone.required']())
    }
  })

  //////////////////
  // test suite 5 //
  //////////////////
  it('should return original data when validation passes', function * () {
    const rules = {
      age: 'required',
      phone: 'required'
    }

    const body = {
      age: 22,
      phone: 9192910200
    }

    const validated = yield Validator.validateAll(rules, body)
    expect(validated).to.equal(body)
  })

  //////////////////
  // test suite 6 //
  //////////////////
  it('should return original data when validation passes using validate method', function * () {
    const rules = {
      age: 'required',
      phone: 'required'
    }

    const body = {
      age: 22,
      phone: 9192910200
    }

    const validated = yield Validator.validate(rules, body)
    expect(validated).to.equal(body)
  })

  //////////////////
  // test suite 7 //
  //////////////////
  it('should return errors thrown within validation cycle', function * () {
    const rules = {
      age: 'foo',
      phone: 'required'
    }

    const body = {
      age: 22,
      phone: 9192910200
    }

    try{
      const validated = yield Validator.validate(rules, body)
      expect(validated).not.to.exist()
    }catch (e){
      expect(e).to.match(/foo is not defined as a rule/i)
    }
  })

  //////////////////
  // test suite 8 //
  //////////////////
  it('should be able to add it\'s own rules to validation store', function * () {
    const phone = function (data, field, message, args, get) {
      return new Promise(function (resolve, reject) {
        reject(message)
      })
    }
    Validator.extend('phone',phone,'Enter valid phone number')

    const rules = {
      contact_no: 'phone'
    }
    const body = {}

    try{
      const validated = yield Validator.validate(rules, body)
      expect(validated).not.to.exist()
    }catch (e){
      expect(e).to.be.an('array')
      expect(e[0].validation).to.equal('phone')
    }
  })

  //////////////////
  // test suite 9 //
  //////////////////
  it('should return original data when validation passes using validateAll method', function * () {
    const rules = {
      age: 'required|integer',
      phone: 'required'
    }

    const body = {
      age: 22,
      phone: 9192910200
    }

    const validated = yield Validator.validateAll(rules, body)
    expect(validated).to.equal(body)
  })

  ///////////////////
  // test suite 10 //
  ///////////////////
  it('should validate not multiple rules when using validate method', function * () {
    const rules = {
      username: 'alpha|alphaNumeric'
    }

    const body = {
      username: 'aman@33$'
    }

    try{
      const passed = yield Validator.validate(rules, body)
      expect(passed).not.to.exist()
    }catch(e){
      expect(e).to.be.an('array')
      expect(e[0].field).to.equal('username')
      expect(e[0].validation).to.equal('alpha')
      expect(e[1]).to.equal(undefined)
    }
  })

  ///////////////////
  // test suite 11 //
  ///////////////////
  it('should throw errors when valid function is not passed to extend method', function * () {
    const fn = function () {
      return Validator.extend('phone','','')
    }
    expect(fn).to.throw(/Invalid arguments/)
  })

  ///////////////////
  // test suite 12 //
  ///////////////////
  it('should extend raw validator', function () {
    const presence = function (hash, item) {
      return hash[item]
    }
    Validator.is.extend('presence',presence)
    const isPresent = Validator.is.presence({foo:'bar'},'foo')
    expect(isPresent).to.equal('bar')
  })

  ///////////////////
  // test suite 13 //
  ///////////////////
  it('should throw error when function is not passed to is.extend', function () {
    const fn = function () {
      return Validator.is.extend('presence','presence')
    }
    expect(fn).to.throw(/Invalid arguments/)
  })

  ///////////////////
  // test suite 14 //
  ///////////////////
  it('should be able to define multiple rules as an array instead of | symbol', function * () {
    const rules = {
      username: ['alpha','alphaNumeric']
    }

    const body = {
      username: 'virk@33$'
    }

    try{
      const passed = yield Validator.validateAll(rules, body)
      expect(passed).not.to.exist()
    }catch(e){
      expect(e).to.be.an('array')
      expect(e[0].field).to.equal('username')
      expect(e[0].validation).to.equal('alpha')
      expect(e[1].field).to.equal('username')
      expect(e[1].validation).to.equal('alphaNumeric')
    }
  })

  ///////////////////
  // test suite 15 //
  ///////////////////
  it('should run all validations on multiple fields using validateAll', function * () {
    const rules = {
      username: 'required',
      email: 'required'
    }

    const body = {
    }

    try{
      const passed = yield Validator.validateAll(rules, body)
      expect(passed).not.to.exist()
    }catch(e){
      expect(e).to.be.an('array')
      expect(e[0].field).to.equal('username')
      expect(e[0].validation).to.equal('required')
      expect(e[1].field).to.equal('email')
      expect(e[1].validation).to.equal('required')
    }
  })

  ///////////////////
  // test suite 16 //
  ///////////////////
  it('should make use of snake case validations', function * () {
    const rules = {
      username: 'alpha_numeric'
    }

    const body = {
      username: 'virk@33$'
    }

    try{
      const passed = yield Validator.validate(rules, body)
      expect(passed).not.to.exist()
    }catch(e){
      expect(e).to.be.an('array')
      expect(e[0].field).to.equal('username')
      expect(e[0].validation).to.equal('alpha_numeric')
    }
  })

  ///////////////////
  // test suite 17 //
  ///////////////////
  it('should be able to define custom messages for snake case rules', function * () {
    const rules = {
      username: 'alpha_numeric'
    }

    const body = {
      username: 'virk@33$'
    }

    const messages = {
      'alpha_numeric': 'special chars not allowed'
    }

    try{
      const passed = yield Validator.validate(rules, body, messages)
      expect(passed).not.to.exist()
    }catch(e){
      expect(e).to.be.an('array')
      expect(e[0].field).to.equal('username')
      expect(e[0].validation).to.equal('alpha_numeric')
      expect(e[0].message).to.equal(messages['alpha_numeric'])
    }
  })

});
