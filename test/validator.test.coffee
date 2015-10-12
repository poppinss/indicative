  
  "use strict"

  chai          = require 'chai'
  should        = chai.should()
  expect        = chai.expect
  Validator     = new (require '../lib/validator')


  describe "Validator", () ->

    it "should return error when any of the validation rule fails", (done) ->

      rules =
        name: "required"

      data = {}

      Validator
      .validate(rules,data)
      .then (success) ->
        should.not.exist(success)
      .catch (err) ->
        should.exist(err)
        expect(err).to.be.an("array")
        expect(err[0].field).to.equal("name")
        done()



    it "should validate multiple validation rules and return on first failure", (done) ->

      rules =
        name: "required|alpha"

      data =
        name: "johny12"

      Validator
      .validate(rules,data)
      .then (success) ->
        should.not.exist(success)
      .catch (err) ->
        should.exist(err)
        expect(err).to.be.an("array")
        expect(err[0].field).to.equal("name")
        expect(err[0].rule).to.equal("alpha")
        done()


    it "should validate nested objects when rules are defined as plain objects", (done) ->

      rules =
        profile:
          name: "required"

      data =
        profile:
          name: null

      Validator
      .validate(rules,data)
      .then (success) ->
        should.not.exist(success)
      .catch (err) ->
        should.exist(err)
        expect(err).to.be.an("array")
        expect(err[0].field).to.equal("profile.name")
        expect(err[0].rule).to.equal("required")
        done()



    it "should validate nested objects when rules are defined with dot notation", (done) ->

      rules =
        "profile.name": "required"

      data =
        profile:
          name: null

      Validator
      .validate(rules,data)
      .then (success) ->
        should.not.exist(success)
      .catch (err) ->
        should.exist(err)
        expect(err).to.be.an("array")
        expect(err[0].field).to.equal("profile.name")
        expect(err[0].rule).to.equal("required")
        done()



    it "should not validate nested objects when rules are not nested", (done) ->

      rules =
        name: "required"

      data =
        name: "something"
        profile:
          name: null

      Validator
      .validate(rules,data)
      .then (success) ->
        should.exist(success)
        done()
      .catch (err) ->
        should.not.exist(err)


    it "should print custom messages for rules when passed", (done) ->

      rules =
        name: "required"

      data = {}

      messages =
        required: "Name is required"

      Validator
      .validate(rules,data,messages)
      .then (success) ->
        should.not.exist(success)
      .catch (err) ->
        should.exist(err)
        expect(err).to.be.an("array")
        expect(err[0].field).to.equal("name")
        expect(err[0].rule).to.equal("required")
        expect(err[0].message).to.equal(messages.required)
        done()


    it "should give prefrence to field specific messages over rule specific messages", (done) ->

      rules =
        name: "required"

      data = {}

      messages =
        required   : "Field is required"
        name       : 
          required : "Name is required to continue"

      Validator
      .validate(rules,data,messages)
      .then (success) ->
        should.not.exist(success)
      .catch (err) ->
        should.exist(err)
        expect(err).to.be.an("array")
        expect(err[0].field).to.equal("name")
        expect(err[0].rule).to.equal("required")
        expect(err[0].message).to.equal(messages.name.required)
        done()



    it "should give prefrence to field specific messages over rule specific messages when messages are nested using dot notation", (done) ->

      rules =
        name: "required"

      data = {}

      messages =
        required          : "Field is required"
        "name.required"   : "Name is required to continue"

      Validator
      .validate(rules,data,messages)
      .then (success) ->
        should.not.exist(success)
      .catch (err) ->
        should.exist(err)
        expect(err).to.be.an("array")
        expect(err[0].field).to.equal("name")
        expect(err[0].rule).to.equal("required")
        expect(err[0].message).to.equal(messages["name.required"])
        done()



    it "should not parse data fields with array values when rules defined on them are not nested", (done) ->

      rules =
        binary: "required"

      data = 
        binary : [0,1]

      Validator
      .validate(rules,data)
      .then (success) ->
        should.exist(success)
        done()
      .catch (err) ->
        should.not.exist(err)


    it "should not parse data fields with array values when rules defined on them are not nested even if same key is present under nested data object", (done) ->

      rules =
        binary: "required"

      data = 
        binary : [0,1]
        data   : 
          binary : null

      Validator
      .validate(rules,data)
      .then (success) ->
        should.exist(success)
        done()
      .catch (err) ->
        should.not.exist(err)


    it "should not parse data fields with array values when rules defined on them are not nested even if same key is present under nested rule object", (done) ->

      rules =
        data :
          binary: "required"

      data = 
        data :
          binary : [0,1]

      Validator
      .validate(rules,data)
      .then (success) ->
        should.exist(success)
        done()
      .catch (err) ->
        should.not.exist(err)


    it "should not parse data fields with array values when rules defined on them are not nested even if same key is present under deeply nested rule object", (done) ->

      rules =
        data :
          binary: "required"
          another:
            binary: "required"

      data = 
        data :
          binary : [0,1]

      Validator
      .validate(rules,data)
      .then (success) ->
        should.not.exist(success)
      .catch (err) ->
        should.exist(err)
        expect(err).to.be.an("array")
        expect(err[0].field).to.equal("data.another.binary")
        expect(err[0].rule).to.equal("required")
        done()


    it "should work fine when duplicate keys inside nested rules and data are all present", (done) ->

      rules =
        data :
          binary: "required"
          another:
            binary: "required"

      data = 
        data :
          binary : [0,1]
          another:
            binary: "boom"

      Validator
      .validate(rules,data)
      .then (success) ->
        should.exist(success)
        done()
      .catch (err) ->
        should.not.exist(err)


    it "should return error when duplicate keys inside nested rules and data isn't present", (done) ->

      rules =
        data :
          binary: "required"
          another:
            binary: "required"

      data = 
        data :
          binary : [0,1]
          another:
            binary: null

      Validator
      .validate(rules,data)
      .then (success) ->
        should.not.exist(success)
        done()
      .catch (err) ->
        should.exist(err)
        expect(err).to.be.an("array")
        expect(err[0].field).to.equal("data.another.binary")
        expect(err[0].rule).to.equal("required")
        done()


    it "should work fine when nested objects value contains mix of objects and arrays", (done) ->

      rules =
        fullname: "required"

      data = 
        fullname:
          fullname:
            firstname: "somename"

      Validator
      .validate(rules,data)
      .then (success) ->
        should.exist(success)
        done()
      .catch (err) ->
        should.not.exist(err)


    it "should fail when regex test has not been passed", (done) ->

      rules =
        email: "regex:^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$"

      data = 
        email: 'foo'

      Validator
      .validate(rules,data)
      .then (success) ->
        should.not.exist(success)
      .catch (err) ->
        should.exist(err)
        expect(err[0].message).to.match(/regex validation failed/)
        expect(err[0].rule).to.equal('regex')
        done()


    it "should pass when regex test has been passed", (done) ->

      rules =
        email: "regex:^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$"

      data = 
        email: 'foo@bar.com'

      Validator
      .validate(rules,data)
      .then (success) ->
        should.exist(success)
        done()
      .catch (err) ->
        should.not.exist(err)


    it "should return an error when key under validation is under root and same key is present under nested object", (done) ->

      rules =
        fullname: "required"
        firstname: "required"

      data = 
        fullname:
          firstname: "ook"
          fullname:
            firstname: "somename"

      Validator
      .validate(rules,data)
      .then (success) ->
        should.not.exist(success)
      .catch (err) ->
        should.exist(err)
        expect(err).to.be.an("array")
        expect(err[0].field).to.equal("firstname")
        expect(err[0].rule).to.equal("required")
        done()

    it "should work fine when rules are defined as an array and there are nested values to be parsed", (done) ->

      rules =
        fullname : ['required']
        profile :
          username : ['required']


      data =
        fullname: "ook"


      Validator
      .validate rules,data
      .then (success) ->
        should.not.exist success
      .catch (err) ->
        expect(err).to.be.an "array"
        expect(err[0].field).to.equal "profile.username"
        expect(err[0].rule).to.equal "required"
        done()


    it "should work fine when rules are defined as an array and there are nested values to be parsed and all data is present", (done) ->

      rules =
        fullname : ['required']
        profile :
          username : ['required']


      data =
        fullname: "ook"
        profile:
          username: "ook"

      Validator
      .validate rules,data
      .then (success) ->
        should.exist(success)
        done()
      .catch (err) ->
        should.not.exist err
        done()

    it "should work fine when rules are defined as an array and rules schema is dot notated", (done) ->

      rules =
        fullname : ['required']
        "profile.username" : ['required']

      data =
        fullname: "ook"

      Validator
      .validate rules,data
      .then (success) ->
        should.not.exist(success)
      .catch (err) ->
        expect(err).to.be.an "array"
        expect(err[0].field).to.equal "profile.username"
        expect(err[0].rule).to.equal "required"
        done()

    it "should work fine when rules are defined as an array and rules schema is dot notated and values are present", (done) ->

      rules =
        fullname : ['required']
        "profile.username" : ['required']

      data =
        fullname: "ook"
        profile:
          username: "ook"

      Validator
      .validate rules,data
      .then (success) ->
        should.exist(success)
        done()
      .catch (err) ->
        should.not.exist(err)
        done()
