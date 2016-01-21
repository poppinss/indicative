'use strict'

const indicative = require('../')
const chai = require('chai')
const expect = chai.expect

describe('Exported', function() {
  it('should return validate method when validate is used of the object', function () {
    expect(indicative.validate).to.be.a('function')
    expect(indicative.validate.toString()).to.match(/function \(data, rules, messages\) {/)
  })

  it('should return validateAll method when validateAll is used of the object', function () {
    expect(indicative.validateAll).to.be.a('function')
    expect(indicative.validateAll.toString()).to.match(/function \(data, rules, messages\) {/)
  })

  it('should return extend method when extend is used of the object', function () {
    expect(indicative.extend).to.be.a('function')
    expect(indicative.extend.toString()).to.match(/function \(name, method, message\) {/)
  })

  it('should return raw extend when method when is.extend is used of the object', function () {
    expect(indicative.is.extend).to.be.a('function')
    expect(indicative.is.extend.toString()).to.match(/function \(name, method\) {/)
  })

  it('should return raw validator when .is is used', function () {
    expect(indicative.is).to.be.an('object')
  })

  it('should return sanitize method when .sanitize is used', function () {
    expect(indicative.sanitize).to.be.a('function')
    expect(indicative.sanitize.toString()).to.match(/function \(data, schema\) {/)
  })

  it('should return sanitize filters when .sanitizor is used', function () {
    expect(indicative.sanitizor).to.be.an('object')
  })

})
