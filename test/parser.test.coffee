chai          = require 'chai'
should        = chai.should()
expect        = chai.expect
Parser        = new (require '../lib/parser')
Messages      = new (require '../lib/messages')


describe "parseRules", () ->

  beforeEach (done) ->
    Messages.destructor()
    done()

  it "should parse pipe seperated rules to hash object" ,(done) ->

    rules =
      name : 'required|min:4'

    expected =
      name : ['required','min:4']

    hash = Parser.parseRules rules
    expect(hash).to.deep.equal(expected)
    done()


  it "should parse pipe seperated rules to hash object when there are leading pipes with no value" ,(done) ->

    rules =
      name : 'required|min:4|'

    expected =
      name : ['required','min:4']

    hash = Parser.parseRules rules
    expect(hash).to.deep.equal(expected)
    done()


  it "should parse pipe seperated rules to hash object when there are multiple pipes inside single rule" ,(done) ->

    rules =
      name : 'required||min:4'

    expected =
      name : ['required','min:4']

    hash = Parser.parseRules rules
    expect(hash).to.deep.equal(expected)
    done()


describe "parseRule" , () ->

  beforeEach (done) ->
    Messages.destructor()
    done()

  it "should parse a single rule" , (done) ->

    rule  = 'required'
    field = 'name'

    expected =
      rule    : 'required'
      args    : undefined
      message : 'required validation failed on name'

    hash = Parser.parseRule rule,field
    expect(hash).to.deep.equal(expected)
    done()


  it "should parse a single rule with arguments" , (done) ->

    rule  = 'min:4'
    field = 'name'

    expected =
      rule    : 'min'
      args    : "4"
      message : 'min validation failed on name'

    hash = Parser.parseRule rule,field
    expect(hash).to.deep.equal(expected)
    done()


  it "should parse a single rule with multiple arguments" , (done) ->

    rule  = 'range:4,10'
    field = 'age'

    expected =
      rule    : 'range'
      args    : "4,10"
      message : 'range validation failed on age'

    hash = Parser.parseRule rule,field
    expect(hash).to.deep.equal(expected)
    done()


  it "should parse rule and show custom message" , (done) ->

    rangeMessage = 'Your age must be between 4 to 10 years'
    Messages.setMessage 'range',rangeMessage

    rule  = 'range:4,10'
    field = 'age'

    expected =
      rule    : 'range'
      args    : "4,10"
      message : rangeMessage

    hash = Parser.parseRule rule,field
    expect(hash).to.deep.equal(expected)
    done()

  it "should not parse values defined next to rules", () ->

    rule  = 'date_format:HH:mm'
    field = 'time'

    expected =
      rule    : 'date_format'
      args    : "HH:mm"

    hash = Parser.parseRule rule,field
    expect(hash.args).to.equal(expected.args)

  it "should not split an array of rules", () ->

    rules  =
      dob: 'date_format:HH:mm|required'

    rules  =
      dob: ['date_format:HH:mm','required']

    return_data = {}

    Parser.parseRules rules,return_data
    expect(return_data).deep.equal(rules)
