'use strict'

/**
 * indicative
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const Validations = require('../src/Validations')
const dotProp = require('dot-prop')
const chai = require('chai')
const moment = require('moment')
const expect = chai.expect

require('co-mocha')

describe('Validations', function() {
  context('required', function () {

    //////////////////
    // test suite 1 //
    //////////////////
    it('should reject promise when field is not defined', function * () {
      const data = {}
      const field = 'name'
      const message = 'name is required'
      const get = dotProp.get
      const args = []
      try{
        yield Validations.required(data, field, message, args, get)
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    //////////////////
    // test suite 2 //
    //////////////////
    it('should reject promise when field is defined but empty', function * () {
      const data = {name : ''}
      const field = 'name'
      const message = 'name is required'
      const get = dotProp.get
      const args = []
      try{
        yield Validations.required(data, field, message, args, get)
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    //////////////////
    // test suite 3 //
    //////////////////
    it('should resolve promise when field is defined and has value', function * () {
      const data = {name : 'virk'}
      const field = 'name'
      const message = 'name is required'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.required(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    //////////////////
    // test suite 4 //
    //////////////////
    it('should resolve promise when field is defined and has boolean negative value', function * () {
      const data = {name : false}
      const field = 'name'
      const message = 'name is required'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.required(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    //////////////////
    // test suite 5 //
    //////////////////
    it('should resolve promise when field is defined and has numeric value', function * () {
      const data = {name : 0}
      const field = 'name'
      const message = 'name is required'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.required(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })
  })
  context('email', function () {

    //////////////////
    // test suite 6 //
    //////////////////
    it('should return error when field is defined and does not have valid email', function * () {
      const data = {email : 'virk'}
      const field = 'email'
      const message = 'email must be email'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.email(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    //////////////////
    // test suite 7 //
    //////////////////
    it('should return error when field is defined as negative boolean', function * () {
      const data = {email : false}
      const field = 'email'
      const message = 'email must be email'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.email(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    //////////////////
    // test suite 8 //
    //////////////////
    it('should return error when field is defined as 0', function * () {
      const data = {email : 0}
      const field = 'email'
      const message = 'email must be email'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.email(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    //////////////////
    // test suite 9 //
    //////////////////
    it('should skip email validation when email field does not exists', function * () {
      const data = {}
      const field = 'email'
      const message = 'email must be email'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.email(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    //////////////////////////
    // test suite add later //
    //////////////////////////
    it('should work fine when valid email is provided', function * () {
      const data = {email:'foo@bar.com'}
      const field = 'email'
      const message = 'email must be email'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.email(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    it('should work fine when valid email with extension is provided', function * () {
      const data = {email:'foo+baz@bar.com'}
      const field = 'email'
      const message = 'email must be email'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.email(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

  })

  context('Accepted', function () {

    ///////////////////
    // test suite 10 //
    ///////////////////
    it('should return error when field is defined but not accepted', function * () {
      const data = {terms:false}
      const field = 'terms'
      const message = 'terms must be accepted'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.accepted(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 11 //
    ///////////////////
    it('should pass validation when field is defined and accepted using true', function * () {
      const data = {terms:true}
      const field = 'terms'
      const message = 'terms must be accepted'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.accepted(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ///////////////////
    // test suite 12 //
    ///////////////////
    it('should pass validation when field is defined and accepted using string', function * () {
      const data = {terms:'okay'}
      const field = 'terms'
      const message = 'terms must be accepted'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.accepted(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ///////////////////
    // test suite 13 //
    ///////////////////
    it('should throw error when field is defined and contains null as value', function * () {
      const data = {terms:null}
      const field = 'terms'
      const message = 'terms must be accepted'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.accepted(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 14 //
    ///////////////////
    it('should skip validation when field is not present or is undefined', function * () {
      const data = {}
      const field = 'terms'
      const message = 'terms must be accepted'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.accepted(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })
  context('after', function () {

    ///////////////////
    // test suite 15 //
    ///////////////////
    it('should throw an error when date is not after defined date', function * () {
      const data = {dob:'1980-11-20'}
      const field = 'dob'
      const message = 'dob should be after 2010'
      const get = dotProp.get
      const args = ['2010-11-20']
      try{
        const passes = yield Validations.after(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 16 //
    ///////////////////
    it('should throw an error when date is null', function * () {
      const data = {dob:null}
      const field = 'dob'
      const message = 'dob should be after 2010'
      const get = dotProp.get
      const args = ['2010-11-20']
      try{
        const passes = yield Validations.after(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 17 //
    ///////////////////
    it('should work fine when value is after defined date', function * () {
      const data = {dob:'2011-01-01'}
      const field = 'dob'
      const message = 'dob should be after 2010'
      const get = dotProp.get
      const args = ['2010-11-20']
      const passes = yield Validations.after(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ///////////////////
    // test suite 18 //
    ///////////////////
    it('should skip validation when dob is not defined', function * () {
      const data = {}
      const field = 'dob'
      const message = 'dob should be after 2010'
      const get = dotProp.get
      const args = ['2010-11-20']
      const passes = yield Validations.after(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 19 //
    ///////////////////
    it('should skip validation when dob is undefined', function * () {
      const data = {dob:undefined}
      const field = 'dob'
      const message = 'dob should be after 2010'
      const get = dotProp.get
      const args = ['2010-11-20']
      const passes = yield Validations.after(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })

  context('alpha', function () {

    ///////////////////
    // test suite 20 //
    ///////////////////
    it('should throw an error when value is not alpha', function * () {
      const data = {username: 'virk1234'}
      const field = 'username'
      const message = 'username must contain letters only'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.alpha(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 21 //
    ///////////////////
    it('should throw an error when value is null', function * () {
      const data = {username: null}
      const field = 'username'
      const message = 'username must contain letters only'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.alpha(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 22 //
    ///////////////////
    it('should work fine when value is a valid alpha', function * () {
      const data = {username: 'virk'}
      const field = 'username'
      const message = 'username must contain letters only'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.alpha(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ///////////////////
    // test suite 23 //
    ///////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'username'
      const message = 'username must contain letters only'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.alpha(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 24 //
    ///////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {username:undefined}
      const field = 'username'
      const message = 'username must contain letters only'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.alpha(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

  })

  context('before', function () {

    ///////////////////
    // test suite 25 //
    ///////////////////
    it('should throw an error when date is not before defined date', function * () {
      const data = {dob:'2012-11-20'}
      const field = 'dob'
      const message = 'dob should be before 2010'
      const get = dotProp.get
      const args = ['2010-11-20']
      try{
        const passes = yield Validations.before(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 26 //
    ///////////////////
    it('should throw an error when date is null', function * () {
      const data = {dob:null}
      const field = 'dob'
      const message = 'dob should be before 2010'
      const get = dotProp.get
      const args = ['2010-11-20']
      try{
        const passes = yield Validations.before(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 27 //
    ///////////////////
    it('should work fine when value is before defined date', function * () {
      const data = {dob:'2009-01-01'}
      const field = 'dob'
      const message = 'dob should be before 2010'
      const get = dotProp.get
      const args = ['2010-11-20']
      const passes = yield Validations.before(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ///////////////////
    // test suite 28 //
    ///////////////////
    it('should skip validation when dob is not defined', function * () {
      const data = {}
      const field = 'dob'
      const message = 'dob should be before 2010'
      const get = dotProp.get
      const args = ['2010-11-20']
      const passes = yield Validations.before(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 29 //
    ///////////////////
    it('should skip validation when dob is undefined', function * () {
      const data = {dob:undefined}
      const field = 'dob'
      const message = 'dob should be before 2010'
      const get = dotProp.get
      const args = ['2010-11-20']
      const passes = yield Validations.before(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })

  context('date', function () {

    ///////////////////
    // test suite 30 //
    ///////////////////
    it('should throw an error when field value is not a valid date', function * () {
      const data = {dob:'10th'}
      const field = 'dob'
      const message = 'dob should be a valid date'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.date(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 31 //
    ///////////////////
    it('should throw an error when field value is null', function * () {
      const data = {dob:null}
      const field = 'dob'
      const message = 'dob should be a valid date'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.date(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 32 //
    ///////////////////
    it('should work fine when value of field is a valid date', function * () {
      const data = {dob:'2015-10-20'}
      const field = 'dob'
      const message = 'dob should be a valid date'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.date(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ///////////////////
    // test suite 33 //
    ///////////////////
    it('should work fine when value of field is a valid date but with a differen date format', function * () {
      const data = {dob:'10/20/2015'}
      const field = 'dob'
      const message = 'dob should be a valid date'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.date(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ///////////////////
    // test suite 34 //
    ///////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'dob'
      const message = 'dob should be a valid date'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.date(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 35 //
    ///////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {dob:undefined}
      const field = 'dob'
      const message = 'dob should be a valid date'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.date(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })

  context('dateFormat', function () {

    ///////////////////
    // test suite 36 //
    ///////////////////
    it('should throw an error when field value is not a valid date', function * () {
      const data = {dob:'10th'}
      const field = 'dob'
      const message = 'dob should be a valid date'
      const get = dotProp.get
      const args = ['YYYY/MM/DD']
      try{
        const passes = yield Validations.dateFormat(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 37 //
    ///////////////////
    it('should throw an error when field value is a valid date but not according to defined format', function * () {
      const data = {dob:'10-20-2015'}
      const field = 'dob'
      const message = 'dob should be a valid date'
      const get = dotProp.get
      const args = ['YYYY/MM/DD']
      try{
        const passes = yield Validations.dateFormat(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 38 //
    ///////////////////
    it('should throw an error when field value is null', function * () {
      const data = {dob:null}
      const field = 'dob'
      const message = 'dob should be a valid date'
      const get = dotProp.get
      const args = ['YYYY/MM/DD']
      try{
        const passes = yield Validations.dateFormat(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 39 //
    ///////////////////
    it('should work fine when field value is a valid date according to given format', function * () {
      const data = {dob:'2015/10/20'}
      const field = 'dob'
      const message = 'dob should be a valid date'
      const get = dotProp.get
      const args = ['YYYY/MM/DD']
      const passes = yield Validations.dateFormat(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ///////////////////
    // test suite 40 //
    ///////////////////
    it('should skip validation when field is not available', function * () {
      const data = {}
      const field = 'dob'
      const message = 'dob should be a valid date'
      const get = dotProp.get
      const args = ['YYYY/MM/DD']
      const passes = yield Validations.dateFormat(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 41 //
    ///////////////////
    it('should skip validation when field is undefined', function * () {
      const data = {dob:undefined}
      const field = 'dob'
      const message = 'dob should be a valid date'
      const get = dotProp.get
      const args = ['YYYY/MM/DD']
      const passes = yield Validations.dateFormat(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })

  context('in', function () {

    ///////////////////
    // test suite 42 //
    ///////////////////
    it('should throw an error when field value is not in defined fields', function * () {
      const data = {gender:'Foo'}
      const field = 'gender'
      const message = 'select valid gender'
      const get = dotProp.get
      const args = ['F','M','O']
      try{
        const passes = yield Validations.in(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 43 //
    ///////////////////
    it('should throw an error when field value is null', function * () {
      const data = {gender:null}
      const field = 'gender'
      const message = 'select valid gender'
      const get = dotProp.get
      const args = ['F','M','O']
      try{
        const passes = yield Validations.in(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 44 //
    ///////////////////
    it('should work fine when value of field is under one of the defined values', function * () {
      const data = {gender:'F'}
      const field = 'gender'
      const message = 'select valid gender'
      const get = dotProp.get
      const args = ['F','M','O']
      const passes = yield Validations.in(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ///////////////////
    // test suite 45 //
    ///////////////////
    it('should work fine when expected values are integer', function * () {
      const data = {marks:10}
      const field = 'marks'
      const message = 'select valid marks'
      const get = dotProp.get
      const args = [10,20,40]
      const passes = yield Validations.in(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ///////////////////
    // test suite 46 //
    ///////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'marks'
      const message = 'select valid marks'
      const get = dotProp.get
      const args = [10,20,40]
      const passes = yield Validations.in(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 47 //
    ///////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {marks:undefined}
      const field = 'marks'
      const message = 'select valid marks'
      const get = dotProp.get
      const args = [10,20,40]
      const passes = yield Validations.in(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })

  context('notIn', function () {

    ///////////////////
    // test suite 48 //
    ///////////////////
    it('should throw an error when field value is in defined fields', function * () {
      const data = {username:'admin'}
      const field = 'username'
      const message = 'select valid username'
      const get = dotProp.get
      const args = ['admin','super','root']
      try{
        const passes = yield Validations.notIn(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 49 //
    ///////////////////
    it('should work fine when field value is not one of the given options', function * () {
      const data = {username:'foo'}
      const field = 'username'
      const message = 'select valid username'
      const get = dotProp.get
      const args = ['admin','super','root']
      const passes = yield Validations.notIn(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ///////////////////
    // test suite 50 //
    ///////////////////
    it('should skip validation when field is undefined', function * () {
      const data = {}
      const field = 'username'
      const message = 'select valid username'
      const get = dotProp.get
      const args = ['admin','super','root']
      const passes = yield Validations.notIn(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 51 //
    ///////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {username:undefined}
      const field = 'username'
      const message = 'select valid username'
      const get = dotProp.get
      const args = ['admin','super','root']
      const passes = yield Validations.notIn(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })

  context('requiredIf', function () {

    ///////////////////
    // test suite 52 //
    ///////////////////
    it('should skip validation when conditional field does not exists', function * () {
      const data = {}
      const field = 'password_confirm'
      const message = 'please confirm password'
      const get = dotProp.get
      const args = ['password']
      const passes = yield Validations.requiredIf(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 53 //
    ///////////////////
    it('should throw error when conditional field exists and field under validation is missing', function * () {
      const data = {password:'foobar'}
      const field = 'password_confirm'
      const message = 'please confirm password'
      const get = dotProp.get
      const args = ['password']
      try{
        const passes = yield Validations.requiredIf(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 54 //
    ///////////////////
    it('should skip validation when conditional field is null', function * () {
      const data = {password:null}
      const field = 'password_confirm'
      const message = 'please confirm password'
      const get = dotProp.get
      const args = ['password']
      const passes = yield Validations.requiredIf(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 55 //
    ///////////////////
    it('should work fine when field under validation is available', function * () {
      const data = {password:'foobar','password_confirm':'foobar'}
      const field = 'password_confirm'
      const message = 'please confirm password'
      const get = dotProp.get
      const args = ['password']
      const passes = yield Validations.requiredIf(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })
  })

  context('requiredWithAny', function () {

    ///////////////////
    // test suite 56 //
    ///////////////////
    it('should work fine when none of the targeted fields are present', function * () {
      const data = {}
      const field = 'password'
      const message = 'password is required after username or email'
      const get = dotProp.get
      const args = ['username','email']
      const passes = yield Validations.requiredWithAny(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 57 //
    ///////////////////
    it('should thrown an error when any of the targeted fields are present but actual field is missing', function * () {
      const data = {username:'foo'}
      const field = 'password'
      const message = 'password is required after username or email'
      const get = dotProp.get
      const args = ['username','email']
      try{
        const passes = yield Validations.requiredWithAny(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 58 //
    ///////////////////
    it('should thrown an error when any of the targeted fields are present but actual field is value is null', function * () {
      const data = {username:'foo',password:null}
      const field = 'password'
      const message = 'password is required after username or email'
      const get = dotProp.get
      const args = ['username','email']
      try{
        const passes = yield Validations.requiredWithAny(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 59 //
    ///////////////////
    it('should work fine when any of the targeted fields are present and actual field value is valid', function * () {
      const data = {username:'foo',password:'bar'}
      const field = 'password'
      const message = 'password is required after username or email'
      const get = dotProp.get
      const args = ['username','email']
      const passes = yield Validations.requiredWithAny(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })
  })

  context('requiredWithAll', function () {

    ///////////////////
    // test suite 60 //
    ///////////////////
    it('should work fine when none of the targeted fields are present', function * () {
      const data = {}
      const field = 'password'
      const message = 'password is required after username or email'
      const get = dotProp.get
      const args = ['username','email']
      const passes = yield Validations.requiredWithAll(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 61 //
    ///////////////////
    it('should thrown an error when all of the targeted fields are present but actual field is missing', function * () {
      const data = {username:'foo','email':'foo@bar.com'}
      const field = 'password'
      const message = 'password is required after username or email'
      const get = dotProp.get
      const args = ['username','email']
      try{
        const passes = yield Validations.requiredWithAll(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 62 //
    ///////////////////
    it('should thrown an error when all of the targeted fields are present but actual field is value is null', function * () {
      const data = {username:'foo',email:'foo@bar.com',password:null}
      const field = 'password'
      const message = 'password is required after username or email'
      const get = dotProp.get
      const args = ['username','email']
      try{
        const passes = yield Validations.requiredWithAll(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 63 //
    ///////////////////
    it('should work fine when all of the targeted fields are present and actual field value is valid', function * () {
      const data = {username:'foo',password:'bar','email':'foo@bar.com'}
      const field = 'password'
      const message = 'password is required after username or email'
      const get = dotProp.get
      const args = ['username','email']
      const passes = yield Validations.requiredWithAll(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ///////////////////
    // test suite 64 //
    ///////////////////
    it('should work fine when any of the targeted fields are missings and actual field value is missing too', function * () {
      const data = {username:'foo'}
      const field = 'password'
      const message = 'password is required after username or email'
      const get = dotProp.get
      const args = ['username','email']
      const passes = yield Validations.requiredWithAll(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })

  context('requiredWithoutAny', function () {

    ///////////////////
    // test suite 65 //
    ///////////////////
    it('should work fine when all the targeted fields are present', function * () {
      const data = {username:'foo',email:'foo@bar.com'}
      const field = 'password'
      const message = 'enter email or password'
      const get = dotProp.get
      const args = ['username','email']
      const passes = yield Validations.requiredWithoutAny(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 66 //
    ///////////////////
    it('should thrown an error when any of the targeted fields are missing and actual field is missing', function * () {
      const data = {username:'foo'}
      const field = 'password'
      const message = 'enter email or password'
      const get = dotProp.get
      const args = ['username','email']
      try{
        const passes = yield Validations.requiredWithoutAny(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 67 //
    ///////////////////
    it('should thrown an error when any of the targeted fields are missing and actual field is value is null', function * () {
      const data = {username:'foo',password:null}
      const field = 'password'
      const message = 'enter email or password'
      const get = dotProp.get
      const args = ['username','email']
      try{
        const passes = yield Validations.requiredWithoutAny(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 68 //
    ///////////////////
    it('should work fine when all of the targeted fields are missing and actual field value is valid', function * () {
      const data = {password:'foobar'}
      const field = 'password'
      const message = 'enter email or password'
      const get = dotProp.get
      const args = ['username','email']
      const passes = yield Validations.requiredWithoutAny(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })
  })

  context('requiredWithoutAll', function () {

    ///////////////////
    // test suite 69 //
    ///////////////////
    it('should work fine when all the targeted fields are present', function * () {
      const data = {username:'foo',email:'foo@bar.com'}
      const field = 'password'
      const message = 'enter username,email or password'
      const get = dotProp.get
      const args = ['username','email']
      const passes = yield Validations.requiredWithoutAll(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 70 //
    ///////////////////
    it('should thrown an error when all of the targeted fields are missing and actual field is missing', function * () {
      const data = {}
      const field = 'password'
      const message = 'enter username,email or password'
      const get = dotProp.get
      const args = ['username','email']
      try{
        const passes = yield Validations.requiredWithoutAll(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 71 //
    ///////////////////
    it('should thrown an error when all of the targeted fields are missing and actual field is value is null', function * () {
      const data = {password:null}
      const field = 'password'
      const message = 'enter username,email or password'
      const get = dotProp.get
      const args = ['username','email']
      try{
        const passes = yield Validations.requiredWithoutAll(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 72 //
    ///////////////////
    it('should work fine when all of the targeted fields are missing and actual field value is valid', function * () {
      const data = {password:'foobar'}
      const field = 'password'
      const message = 'enter username,email or password'
      const get = dotProp.get
      const args = ['username','email']
      const passes = yield Validations.requiredWithoutAll(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ///////////////////
    // test suite 73 //
    ///////////////////
    it('should work fine when any of the targeted fields are missing and actual field value is not present', function * () {
      const data = {username:'foo'}
      const field = 'password'
      const message = 'enter username,email or password'
      const get = dotProp.get
      const args = ['username','email']
      const passes = yield Validations.requiredWithoutAll(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })

  context('same', function () {

    ///////////////////
    // test suite 74 //
    ///////////////////
    it('should thrown an error when value of targeted field is not equal to defined field', function * () {
      const data = {password:'foo','password_confirm':'bar'}
      const field = 'password_confirm'
      const message = 'password should match'
      const get = dotProp.get
      const args = ['password']
      try{
        const passes = yield Validations.same(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 75 //
    ///////////////////
    it('should skip validation when target field does not exists', function * () {
      const data = {'password_confirm':'bar'}
      const field = 'password_confirm'
      const message = 'password should match'
      const get = dotProp.get
      const args = ['password']
      const passes = yield Validations.same(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 76 //
    ///////////////////
    it('should skip validation when actual field does not exists', function * () {
      const data = {}
      const field = 'password_confirm'
      const message = 'password should match'
      const get = dotProp.get
      const args = ['password']
      const passes = yield Validations.same(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 77 //
    ///////////////////
    it('should work fine when value for both field matches', function * () {
      const data = {password:'foo',password_confirm:'foo'}
      const field = 'password_confirm'
      const message = 'password should match'
      const get = dotProp.get
      const args = ['password']
      const passes = yield Validations.same(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ///////////////////
    // test suite 78 //
    ///////////////////
    it('should skip validation when targeted field value exists but actual field does not exists', function * () {
      const data = {password:'foo'}
      const field = 'password_confirm'
      const message = 'password should match'
      const get = dotProp.get
      const args = ['password']
      const passes = yield Validations.same(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })

  context('equals', function () {

    ///////////////////
    // test suite 79 //
    ///////////////////
    it('should thrown an error when value of targeted field is not equal to defined value', function * () {
      const data = {title:'foo'}
      const field = 'title'
      const message = 'title should be bar'
      const get = dotProp.get
      const args = ['bar']
      try{
        const passes = yield Validations.equals(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 80 //
    ///////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'title'
      const message = 'title should be bar'
      const get = dotProp.get
      const args = ['bar']
      const passes = yield Validations.equals(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 81 //
    ///////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {title:undefined}
      const field = 'title'
      const message = 'title should be bar'
      const get = dotProp.get
      const args = ['bar']
      const passes = yield Validations.equals(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 82 //
    ///////////////////
    it('should work fine when value for field matches to defined value', function * () {
      const data = {title:'bar'}
      const field = 'title'
      const message = 'title should be bar'
      const get = dotProp.get
      const args = ['bar']
      const passes = yield Validations.equals(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })
  })

  context('notEquals', function () {

    ///////////////////
    // test suite 83 //
    ///////////////////
    it('should thrown an error when value of targeted field is equal to defined value', function * () {
      const data = {title:'bar'}
      const field = 'title'
      const message = 'title should not be bar'
      const get = dotProp.get
      const args = ['bar']
      try{
        const passes = yield Validations.notEquals(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 84 //
    ///////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'title'
      const message = 'title should not be bar'
      const get = dotProp.get
      const args = ['bar']
      const passes = yield Validations.notEquals(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 85 //
    ///////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {title:undefined}
      const field = 'title'
      const message = 'title should not be bar'
      const get = dotProp.get
      const args = ['bar']
      const passes = yield Validations.notEquals(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 86 //
    ///////////////////
    it('should work fine when value for field does not matches to defined value', function * () {
      const data = {title:'foo'}
      const field = 'title'
      const message = 'title should not be bar'
      const get = dotProp.get
      const args = ['bar']
      const passes = yield Validations.notEquals(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })
  })

  context('different', function () {

    ///////////////////
    // test suite 87 //
    ///////////////////
    it('should thrown an error when value of targeted field is equal to defined field', function * () {
      const data = {dob:'2011-20-10','enrollment_date':'2011-20-10'}
      const field = 'enrollment_date'
      const message = 'enrollment date should be different from dob'
      const get = dotProp.get
      const args = ['dob']
      try{
        const passes = yield Validations.different(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 88 //
    ///////////////////
    it('should skip validation when target field does not exists', function * () {
      const data = {'enrollment_date':'2011-20-10'}
      const field = 'enrollment_date'
      const message = 'enrollment date should be different from dob'
      const get = dotProp.get
      const args = ['dob']
      const passes = yield Validations.different(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 89 //
    ///////////////////
    it('should skip validation when actual field does not exists', function * () {
      const data = {}
      const field = 'enrollment_date'
      const message = 'enrollment date should be different from dob'
      const get = dotProp.get
      const args = ['dob']
      const passes = yield Validations.different(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 90 //
    ///////////////////
    it('should work fine when value for both fields are different', function * () {
      const data = {dob:'2011-20-10','enrollment_date':'2011-20-20'}
      const field = 'enrollment_date'
      const message = 'enrollment date should be different from dob'
      const get = dotProp.get
      const args = ['dob']
      const passes = yield Validations.different(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ///////////////////
    // test suite 91 //
    ///////////////////
    it('should skip validation when targeted field value exists but actual field does not exists', function * () {
      const data = {dob:'2011-20-10'}
      const field = 'enrollment_date'
      const message = 'enrollment date should be different from dob'
      const get = dotProp.get
      const args = ['dob']
      const passes = yield Validations.different(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })

  context('range', function () {

    ///////////////////
    // test suite 92 //
    ///////////////////
    it('should throw an error when value of field is less then defined range', function * () {
      const data = {age:16}
      const field = 'age'
      const message = 'only adults less than 60 years of age are allowed'
      const get = dotProp.get
      const args = [18,60]
      try{
        const passes = yield Validations.range(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 93 //
    ///////////////////
    it('should throw an error when value of field is greater then defined range', function * () {
      const data = {age:61}
      const field = 'age'
      const message = 'only adults less than 60 years of age are allowed'
      const get = dotProp.get
      const args = [18,60]
      try{
        const passes = yield Validations.range(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 94 //
    ///////////////////
    it('should throw an error when min value is not defined', function * () {
      const data = {age:61}
      const field = 'age'
      const message = 'only adults less than 60 years of age are allowed'
      const get = dotProp.get
      const args = [null,60]
      try{
        const passes = yield Validations.range(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.match(/min and max values are required/)
      }
    })

    ///////////////////
    // test suite 95 //
    ///////////////////
    it('should throw an error when max value is not defined', function * () {
      const data = {age:61}
      const field = 'age'
      const message = 'only adults less than 60 years of age are allowed'
      const get = dotProp.get
      const args = [18]
      try{
        const passes = yield Validations.range(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.match(/min and max values are required/)
      }
    })

    ///////////////////
    // test suite 96 //
    ///////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'age'
      const message = 'only adults less than 60 years of age are allowed'
      const get = dotProp.get
      const args = [18,60]
      const passes = yield Validations.range(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 97 //
    ///////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {age:undefined}
      const field = 'age'
      const message = 'only adults less than 60 years of age are allowed'
      const get = dotProp.get
      const args = [18,60]
      const passes = yield Validations.range(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 98 //
    ///////////////////
    it('should work fine when field value is under defined range', function * () {
      const data = {age:20}
      const field = 'age'
      const message = 'only adults less than 60 years of age are allowed'
      const get = dotProp.get
      const args = [18,60]
      const passes = yield Validations.range(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })
  })

  context('min', function () {

    ///////////////////
    // test suite 99 //
    ///////////////////
    it('should throw error when length of field is less than defined length', function * () {
      const data = {password:'foo'}
      const field = 'password'
      const message = 'password should be over 6 characters'
      const get = dotProp.get
      const args = [6]
      try{
        const passes = yield Validations.min(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 100 //
    ////////////////////
    it('should throw error when length of field as number is less than defined length', function * () {
      const data = {password:990}
      const field = 'password'
      const message = 'password should be over 6 characters'
      const get = dotProp.get
      const args = [6]
      try{
        const passes = yield Validations.min(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 101 //
    ////////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'password'
      const message = 'password should be over 6 characters'
      const get = dotProp.get
      const args = [6]
      const passes = yield Validations.min(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 102 //
    ////////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {password:undefined}
      const field = 'password'
      const message = 'password should be over 6 characters'
      const get = dotProp.get
      const args = [6]
      const passes = yield Validations.min(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 103 //
    ////////////////////
    it('should work fine when length of value of field is greater than defined length', function * () {
      const data = {password:'foobarbaz'}
      const field = 'password'
      const message = 'password should be over 6 characters'
      const get = dotProp.get
      const args = [6]
      const passes = yield Validations.min(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ////////////////////
    // test suite 104 //
    ////////////////////
    it('should work fine when length of value of field is equal to the defined length', function * () {
      const data = {password:'foobar'}
      const field = 'password'
      const message = 'password should be over 6 characters'
      const get = dotProp.get
      const args = [6]
      const passes = yield Validations.min(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })
  })

  context('max', function () {

    ////////////////////
    // test suite 105 //
    ////////////////////
    it('should throw error when length of field is greater than defined length', function * () {
      const data = {password:'foobarbaz'}
      const field = 'password'
      const message = 'password should be less than 6 characters'
      const get = dotProp.get
      const args = [6]
      try{
        const passes = yield Validations.max(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 106 //
    ///////////////////
    it('should throw error when length of field as number is greater than defined length', function * () {
      const data = {password:1990909990}
      const field = 'password'
      const message = 'password should be less than 6 characters'
      const get = dotProp.get
      const args = [6]
      try{
        const passes = yield Validations.max(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ///////////////////
    // test suite 107 //
    ///////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'password'
      const message = 'password should be less than 6 characters'
      const get = dotProp.get
      const args = [6]
      const passes = yield Validations.max(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 108 //
    ///////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {password:undefined}
      const field = 'password'
      const message = 'password should be less than 6 characters'
      const get = dotProp.get
      const args = [6]
      const passes = yield Validations.max(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 109 //
    ///////////////////
    it('should work fine when length of value of field is less than defined length', function * () {
      const data = {password:'foo'}
      const field = 'password'
      const message = 'password should be less than 6 characters'
      const get = dotProp.get
      const args = [6]
      const passes = yield Validations.max(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ///////////////////
    // test suite 110 //
    ///////////////////
    it('should work fine when length of value of field is equal to the defined length', function * () {
      const data = {password:'foobar'}
      const field = 'password'
      const message = 'password should be less than 6 characters'
      const get = dotProp.get
      const args = [6]
      const passes = yield Validations.max(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })
  })

  context('above', function () {

    ////////////////////
    // test suite 111 //
    ////////////////////
    it('should throw error when value of field is less than defined value', function * () {
      const data = {age:16}
      const field = 'age'
      const message = 'age should be over 17 years'
      const get = dotProp.get
      const args = [17]
      try{
        const passes = yield Validations.above(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 112 //
    ////////////////////
    it('should throw error when value of field is equal to the defined value', function * () {
      const data = {age:17}
      const field = 'age'
      const message = 'age should be over 17 years'
      const get = dotProp.get
      const args = [17]
      try{
        const passes = yield Validations.above(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 113 //
    ////////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'age'
      const message = 'age should be over 17 years'
      const get = dotProp.get
      const args = [17]
      const passes = yield Validations.above(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 114 //
    ////////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {age:undefined}
      const field = 'age'
      const message = 'age should be over 17 years'
      const get = dotProp.get
      const args = [17]
      const passes = yield Validations.above(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 115 //
    ////////////////////
    it('should work fine when value of field is greater than defined value', function * () {
      const data = {age:18}
      const field = 'age'
      const message = 'age should be over 17 years'
      const get = dotProp.get
      const args = [17]
      const passes = yield Validations.above(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })
  })

  context('under', function () {

    ////////////////////
    // test suite 116 //
    ////////////////////
    it('should throw error when value of field is greater than defined value', function * () {
      const data = {age:11}
      const field = 'age'
      const message = 'age should be less than 10 years for junior idol'
      const get = dotProp.get
      const args = [10]
      try{
        const passes = yield Validations.under(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 117 //
    ////////////////////
    it('should throw error when value of field is equal to the defined value', function * () {
      const data = {age:10}
      const field = 'age'
      const message = 'age should be less than 10 years for junior idol'
      const get = dotProp.get
      const args = [10]
      try{
        const passes = yield Validations.under(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 118 //
    ////////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'age'
      const message = 'age should be less than 10 years for junior idol'
      const get = dotProp.get
      const args = [10]
      const passes = yield Validations.under(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 119 //
    ////////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {age:undefined}
      const field = 'age'
      const message = 'age should be less than 10 years for junior idol'
      const get = dotProp.get
      const args = [10]
      const passes = yield Validations.under(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 120 //
    ////////////////////
    it('should work fine when value of field is less than defined value', function * () {
      const data = {age:8}
      const field = 'age'
      const message = 'age should be less than 10 years for junior idol'
      const get = dotProp.get
      const args = [10]
      const passes = yield Validations.under(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })
  })

  context('includes', function () {
    ////////////////////
    // test suite 121 //
    ////////////////////
    it('should throw an error when string does not include defined substring', function * () {
      const data = {dpath:'foo/bar'}
      const field = 'dpath'
      const message = 'path should include app directory'
      const get = dotProp.get
      const args = ['app']
      try{
        const passes = yield Validations.includes(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 122 //
    ////////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'dpath'
      const message = 'path should include app directory'
      const get = dotProp.get
      const args = ['app']
      const passes = yield Validations.includes(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 123 //
    ////////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {dpath:undefined}
      const field = 'dpath'
      const message = 'path should include app directory'
      const get = dotProp.get
      const args = ['app']
      const passes = yield Validations.includes(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 124 //
    ////////////////////
    it('should work fine when field value includes given string', function * () {
      const data = {dpath:'/app/bar'}
      const field = 'dpath'
      const message = 'path should include app directory'
      const get = dotProp.get
      const args = ['app']
      const passes = yield Validations.includes(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })
  })


  context('startsWith', function () {
    ////////////////////
    // test suite 125 //
    ////////////////////
    it('should throw an error when string does not startsWith defined substring', function * () {
      const data = {username:'foo'}
      const field = 'username'
      const message = 'username should start with D'
      const get = dotProp.get
      const args = ['D']
      try{
        const passes = yield Validations.startsWith(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 126 //
    ////////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'username'
      const message = 'username should start with D'
      const get = dotProp.get
      const args = ['D']
      const passes = yield Validations.startsWith(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 127 //
    ////////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {username:undefined}
      const field = 'username'
      const message = 'username should start with D'
      const get = dotProp.get
      const args = ['D']
      const passes = yield Validations.startsWith(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 128 //
    ////////////////////
    it('should work fine when field value startsWith given string', function * () {
      const data = {username:'Doe'}
      const field = 'username'
      const message = 'username should start with D'
      const get = dotProp.get
      const args = ['D']
      const passes = yield Validations.startsWith(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })
  })


  context('endsWith', function () {
    ////////////////////
    // test suite 129 //
    ////////////////////
    it('should throw an error when string does not endsWith defined substring', function * () {
      const data = {username:'foo'}
      const field = 'username'
      const message = 'username should end with e'
      const get = dotProp.get
      const args = ['e']
      try{
        const passes = yield Validations.endsWith(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 130 //
    ////////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'username'
      const message = 'username should end with e'
      const get = dotProp.get
      const args = ['e']
      const passes = yield Validations.endsWith(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 131 //
    ////////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {username:undefined}
      const field = 'username'
      const message = 'username should end with e'
      const get = dotProp.get
      const args = ['e']
      const passes = yield Validations.endsWith(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 132 //
    ////////////////////
    it('should work fine when field value endsWith given string', function * () {
      const data = {username:'Doe'}
      const field = 'username'
      const message = 'username should end with e'
      const get = dotProp.get
      const args = ['e']
      const passes = yield Validations.endsWith(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })
  })

  context('regex', function () {

    ////////////////////
    // test suite 133 //
    ////////////////////
    it('should throw an error when value does not match regex', function * () {
      const data = {email:'foo'}
      const field = 'email'
      const message = 'email should match given regex'
      const get = dotProp.get
      const args = ['^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$']
      try{
        const passes = yield Validations.regex(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 134 //
    ////////////////////
    it('should skip validation when fields does not exists', function * () {
      const data = {}
      const field = 'country'
      const message = 'country should be India with I as uppercase'
      const get = dotProp.get
      const args = ['[a-z]']
      const passes = yield Validations.regex(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 135 //
    ////////////////////
    it('should skip validation when fields value is undefined', function * () {
      const data = {country:undefined}
      const field = 'country'
      const message = 'country should be India with I as uppercase'
      const get = dotProp.get
      const args = ['[a-z]']
      const passes = yield Validations.regex(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 136 //
    ////////////////////
    it('should work fine when field value satisfies regex pattern', function * () {
      const data = {country:'India'}
      const field = 'country'
      const message = 'country should be India with I as uppercase'
      const get = dotProp.get
      const args = ['[a-z]','i']
      const passes = yield Validations.regex(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })
  })

  context('alphaNumeric', function () {

    ////////////////////
    // test suite 137 //
    ////////////////////
    it('should throw an error when value is not alpha numeric', function * () {
      const data = {username: 'virk@123'}
      const field = 'username'
      const message = 'username must letters and numbers only'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.alphaNumeric(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 138 //
    ////////////////////
    it('should throw an error when value is null', function * () {
      const data = {username: null}
      const field = 'username'
      const message = 'username must letters and numbers only'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.alphaNumeric(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 139 //
    ////////////////////
    it('should work fine when value is a valid alpha numeric', function * () {
      const data = {username: 'virk123'}
      const field = 'username'
      const message = 'username must letters and numbers only'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.alphaNumeric(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ////////////////////
    // test suite 140 //
    ////////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'username'
      const message = 'username must letters and numbers only'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.alphaNumeric(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 141 //
    ////////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {username:undefined}
      const field = 'username'
      const message = 'username must letters and numbers only'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.alphaNumeric(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })


  context('array', function () {

    ////////////////////
    // test suite 142 //
    ////////////////////
    it('should throw an error when value is not a valid array', function * () {
      const data = {users: 'foo'}
      const field = 'users'
      const message = 'users list must be an array'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.array(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 143 //
    ////////////////////
    it('should work fine when value is a valid array', function * () {
      const data = {users: ['doe','foo','bar']}
      const field = 'users'
      const message = 'users list must be an array'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.array(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ////////////////////
    // test suite 144 //
    ////////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'users'
      const message = 'users list must be an array'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.array(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 145 //
    ////////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {users:undefined}
      const field = 'users'
      const message = 'users list must be an array'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.array(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 146 //
    ////////////////////
    it('should throw an error when value of field is an object', function * () {
      const data = {users:{name:'foo'}}
      const field = 'users'
      const message = 'users list must be an array'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.array(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })
  })

  context('url', function () {

    ////////////////////
    // test suite 147 //
    ////////////////////
    it('should throw an error when value is not a valid url', function * () {
      const data = {github_profile: 'foo'}
      const field = 'github_profile'
      const message = 'github profile must point to a valid url '
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.url(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 148 //
    ////////////////////
    it('should work fine when value is a valid url', function * () {
      const data = {github_profile: 'http://github.com/thetutlage'}
      const field = 'github_profile'
      const message = 'github profile must point to a valid url '
      const get = dotProp.get
      const args = []
      const passes = yield Validations.url(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ////////////////////
    // test suite 149 //
    ////////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'github_profile'
      const message = 'github profile must point to a valid url '
      const get = dotProp.get
      const args = []
      const passes = yield Validations.url(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 150 //
    ////////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {github_profile:undefined}
      const field = 'github_profile'
      const message = 'github profile must point to a valid url '
      const get = dotProp.get
      const args = []
      const passes = yield Validations.url(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })

  context('ip', function () {

    ////////////////////
    // test suite 151 //
    ////////////////////
    it('should throw an error when value is not a valid ip address', function * () {
      const data = {user_ip: '909090909'}
      const field = 'user_ip'
      const message = 'invalid ip address'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.ip(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 152 //
    ////////////////////
    it('should work fine when value is a valid ip address', function * () {
      const data = {user_ip: '127.0.0.1'}
      const field = 'user_ip'
      const message = 'invalid ip address'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.ip(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ////////////////////
    // test suite 153 //
    ////////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'user_ip'
      const message = 'invalid ip address'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.ip(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 154 //
    ////////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {user_ip:undefined}
      const field = 'user_ip'
      const message = 'invalid ip address'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.ip(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })

  context('integer', function () {

    ////////////////////
    // test suite 155 //
    ////////////////////
    it('should throw an error when value is a string', function * () {
      const data = {marks: '10'}
      const field = 'marks'
      const message = 'marks should be an integer'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.integer(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 156 //
    ////////////////////
    it('should throw an error when value is a float', function * () {
      const data = {marks: 10.1}
      const field = 'marks'
      const message = 'marks should be an integer'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.integer(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 157 //
    ////////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'marks'
      const message = 'marks should be an integer'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.integer(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 158 //
    ////////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {marks:undefined}
      const field = 'marks'
      const message = 'marks should be an integer'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.integer(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 159 //
    ////////////////////
    it('should work fine when value is an integer', function * () {
      const data = {marks:10}
      const field = 'marks'
      const message = 'marks should be an integer'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.integer(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ////////////////////
    // test suite 160 //
    ////////////////////
    it('should work fine when value is an integer with zero precision', function * () {
      const data = {marks:10.0}
      const field = 'marks'
      const message = 'marks should be an integer'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.integer(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

  })

  context('boolean', function () {

    ////////////////////
    // test suite 161 //
    ////////////////////
    it('should throw an error when value is not a boolean', function * () {
      const data = {is_admin: 20}
      const field = 'is_admin'
      const message = 'admin identifier should be boolean indicator'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.boolean(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 162 //
    ////////////////////
    it('should throw an error when value is a string', function * () {
      const data = {is_admin: "20"}
      const field = 'is_admin'
      const message = 'admin identifier should be boolean indicator'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.boolean(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 163 //
    ////////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'is_admin'
      const message = 'admin identifier should be boolean indicator'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.boolean(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 164 //
    ////////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {is_admin:undefined}
      const field = 'is_admin'
      const message = 'admin identifier should be boolean indicator'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.boolean(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 165 //
    ////////////////////
    it('should work fine when value is a valid positive boolean', function * () {
      const data = {is_admin:true}
      const field = 'is_admin'
      const message = 'admin identifier should be boolean indicator'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.boolean(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ////////////////////
    // test suite 166 //
    ////////////////////
    it('should work fine when value is a valid negative boolean', function * () {
      const data = {is_admin:false}
      const field = 'is_admin'
      const message = 'admin identifier should be boolean indicator'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.boolean(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ////////////////////
    // test suite 167 //
    ////////////////////
    it('should work fine when value is a valid positive numeric boolean', function * () {
      const data = {is_admin:1}
      const field = 'is_admin'
      const message = 'admin identifier should be boolean indicator'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.boolean(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ////////////////////
    // test suite 168 //
    ////////////////////
    it('should work fine when value is a valid negative numeric boolean', function * () {
      const data = {is_admin:0}
      const field = 'is_admin'
      const message = 'admin identifier should be boolean indicator'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.boolean(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ////////////////////
    // test suite 169 //
    ////////////////////
    it('should work fine when value is a string representation of 0', function * () {
      const data = {is_admin:"0"}
      const field = 'is_admin'
      const message = 'admin identifier should be boolean indicator'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.boolean(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ////////////////////
    // test suite 170 //
    ////////////////////
    it('should work fine when value is a string representation of 1', function * () {
      const data = {is_admin:"1"}
      const field = 'is_admin'
      const message = 'admin identifier should be boolean indicator'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.boolean(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })
  })

  context('object', function () {

    ////////////////////
    // test suite 171 //
    ////////////////////
    it('should throw an error when value is not a valid object', function * () {
      const data = {profile: 'foo'}
      const field = 'profile'
      const message = 'profile must be an object'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.object(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 172 //
    ////////////////////
    it('should work fine when value is a valid object', function * () {
      const data = {profile:{username:'foo'}}
      const field = 'profile'
      const message = 'profile must be an object'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.object(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ////////////////////
    // test suite 173 //
    ////////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'profile'
      const message = 'profile must be an object'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.object(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 174 //
    ////////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {profile:undefined}
      const field = 'profile'
      const message = 'profile must be an object'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.object(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 175 //
    ////////////////////
    it('should throw an error when value of field is an array', function * () {
      const data = {profile:['username']}
      const field = 'profile'
      const message = 'profile must be an object'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.object(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })
  })

  context('json', function () {

    ////////////////////
    // test suite 176 //
    ////////////////////
    it('should throw an error when value is not a valid json string', function * () {
      const data = {profile: 'foo'}
      const field = 'profile'
      const message = 'profile must be in json'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.json(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 177 //
    ////////////////////
    it('should work fine when value is a valid json string', function * () {
      const data = {profile: JSON.stringify({name:'foo'})}
      const field = 'profile'
      const message = 'profile must be in json'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.json(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ////////////////////
    // test suite 178 //
    ////////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'profile'
      const message = 'profile must be in json'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.json(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 179 //
    ////////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {profile:undefined}
      const field = 'profile'
      const message = 'profile must be in json'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.json(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })

  context('ipv4', function () {

    ////////////////////
    // test suite 180 //
    ////////////////////
    it('should throw an error when value is not a valid ipv4 address', function * () {
      const data = {user_ip: '2001:DB8:0:0:1::1'}
      const field = 'user_ip'
      const message = 'invalid ipv4 address'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.ipv4(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 181 //
    ////////////////////
    it('should work fine when value is a valid ipv4 address', function * () {
      const data = {user_ip: '127.0.0.1'}
      const field = 'user_ip'
      const message = 'invalid ipv4 address'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.ipv4(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ////////////////////
    // test suite 182 //
    ////////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'user_ip'
      const message = 'invalid ipv4 address'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.ipv4(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 183 //
    ////////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {user_ip:undefined}
      const field = 'user_ip'
      const message = 'invalid ipv4 address'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.ipv4(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })

  context('ipv6', function () {

    ////////////////////
    // test suite 184 //
    ////////////////////
    it('should throw an error when value is not a valid ipv6 address', function * () {
      const data = {user_ip: '127.0.0.1'}
      const field = 'user_ip'
      const message = 'invalid ipv6 address'
      const get = dotProp.get
      const args = []
      try{
        const passes = yield Validations.ipv6(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 185 //
    ////////////////////
    it('should work fine when value is a valid ipv6 address', function * () {
      const data = {user_ip: '2001:DB8:0:0:1::1'}
      const field = 'user_ip'
      const message = 'invalid ipv6 address'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.ipv6(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ////////////////////
    // test suite 186 //
    ////////////////////
    it('should skip validation when field does not exists', function * () {
      const data = {}
      const field = 'user_ip'
      const message = 'invalid ipv6 address'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.ipv6(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 187 //
    ////////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {user_ip:undefined}
      const field = 'user_ip'
      const message = 'invalid ipv6 address'
      const get = dotProp.get
      const args = []
      const passes = yield Validations.ipv6(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })

  context('requiredWhen', function () {

    ////////////////////
    // test suite 188 //
    ////////////////////
    it('should skip validation when conditional field does not exists', function * () {
      const data = {}
      const field = 'state'
      const message = 'state is required'
      const get = dotProp.get
      const args = ['country','US']
      const passes = yield Validations.requiredWhen(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 189 //
    ////////////////////
    it('should throw error when conditional field value matches and field under validation is missing', function * () {
      const data = {country:'US'}
      const field = 'state'
      const message = 'state is required'
      const get = dotProp.get
      const args = ['country','US']
      try{
        const passes = yield Validations.requiredWhen(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    ////////////////////
    // test suite 189 //
    ////////////////////
    it('should skip validation when of value of conditional field does not match', function * () {
      const data = {country:'UK'}
      const field = 'state'
      const message = 'state is required'
      const get = dotProp.get
      const args = ['country','US']
      const passes = yield Validations.requiredWhen(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 190 //
    ////////////////////
    it('should skip validation when conditional field is null', function * () {
      const data = {country:null}
      const field = 'state'
      const message = 'state is required'
      const get = dotProp.get
      const args = ['country','US']
      const passes = yield Validations.requiredWhen(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 191 //
    ////////////////////
    it('should work fine when field under validation is available and conditional field value match', function * () {
      const data = {country:'US',state:'NewYork'}
      const field = 'state'
      const message = 'state is required'
      const get = dotProp.get
      const args = ['country','US']
      const passes = yield Validations.requiredWhen(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })
  })

  context('afterOffsetOf', function () {

    ////////////////////
    // test suite 192 //
    ////////////////////
    it('should throw an error when date is not after defined offset', function * () {
      const data = {renewal:new Date()}
      const field = 'renewal'
      const message = 'packages are renewed after 12 months'
      const get = dotProp.get
      const args = ['12','months']
      try{
        const passes = yield Validations.afterOffsetOf(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    /////////////////////
    // test suite 193 ///
    /////////////////////
    it('should work fine when value is after defined offset', function * () {
      const data = {renewal: moment().add(13,'months')}
      const field = 'renewal'
      const message = 'packages are renewed after 12 months'
      const get = dotProp.get
      const args = ['12','months']
      const passes = yield Validations.afterOffsetOf(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ////////////////////
    // test suite 194 //
    ////////////////////
    it('should skip validation when field is not defined', function * () {
      const data = {}
      const field = 'renewal'
      const message = 'packages are renewed after 12 months'
      const get = dotProp.get
      const args = ['12','months']
      const passes = yield Validations.afterOffsetOf(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ////////////////////
    // test suite 195 //
    ////////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {renewal: undefined}
      const field = 'renewal'
      const message = 'packages are renewed after 12 months'
      const get = dotProp.get
      const args = ['12','months']
      const passes = yield Validations.afterOffsetOf(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })

  context('beforeOffsetOf', function () {

    ////////////////////
    // test suite 196 //
    ////////////////////
    it('should throw an error when date is not before defined offset', function * () {
      const data = {subscription:new Date()}
      const field = 'subscription'
      const message = '12 months old subscriptions are upgradable'
      const get = dotProp.get
      const args = ['12','months']
      try{
        const passes = yield Validations.beforeOffsetOf(data, field, message, args, get)
        expect(passes).not.to.exist()
      }catch(e){
        expect(e).to.equal(message)
      }
    })

    /////////////////////
    // test suite 197 ///
    /////////////////////
    it('should work fine when value is before defined offset', function * () {
      const data = {subscription:moment().subtract(2, 'years')}
      const field = 'subscription'
      const message = '12 months old subscriptions are upgradable'
      const get = dotProp.get
      const args = ['12','months']
      const passes = yield Validations.beforeOffsetOf(data, field, message, args, get)
      expect(passes).to.equal('validation passed')
    })

    ////////////////////
    // test suite 198 //
    ////////////////////
    it('should skip validation when field is not defined', function * () {
      const data = {}
      const field = 'subscription'
      const message = '12 months old subscriptions are upgradable'
      const get = dotProp.get
      const args = ['12','months']
      const passes = yield Validations.beforeOffsetOf(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })

    ///////////////////
    // test suite 199 //
    ///////////////////
    it('should skip validation when field value is undefined', function * () {
      const data = {subscription: undefined}
      const field = 'subscription'
      const message = '12 months old subscriptions are upgradable'
      const get = dotProp.get
      const args = ['12','months']
      const passes = yield Validations.beforeOffsetOf(data, field, message, args, get)
      expect(passes).to.equal('validation skipped')
    })
  })
})

