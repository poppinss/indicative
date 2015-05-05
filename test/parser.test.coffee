chai          = require 'chai'
should        = chai.should()
expect        = chai.expect
Parser        = new (require '../lib/parser')
Messages      = new (require '../lib/messages')


describe "parseRules", () ->

  it "should parse pipe seperated rules to hash object" ,() ->

    rules =
      name : 'required|min:4'

    expected =
      name : ['required','min:4']

    hash = Parser.parseRules rules
    expect(hash).to.deep.equal(expected)


  it "should parse pipe seperated rules to hash object when there are leading pipes with no value" ,() ->

    rules =
      name : 'required|min:4|'

    expected =
      name : ['required','min:4']

    hash = Parser.parseRules rules
    expect(hash).to.deep.equal(expected)


  it "should parse pipe seperated rules to hash object when there are multiple pipes inside single rule" ,() ->

    rules =
      name : 'required||min:4'

    expected =
      name : ['required','min:4']

    hash = Parser.parseRules rules
    expect(hash).to.deep.equal(expected)


describe "parseRule" , () ->

  it "should parse a single rule" , () ->

    rule  = 'required'
    field = 'name'

    expected =
      rule    : 'required'
      args    : undefined
      message : 'required validation failed on name'

    hash = Parser.parseRule rule,field
    expect(hash).to.deep.equal(expected)


  it "should parse a single rule with arguments" , () ->

    rule  = 'min:4'
    field = 'name'

    expected =
      rule    : 'min'
      args    : "4"
      message : 'min validation failed on name'

    hash = Parser.parseRule rule,field
    expect(hash).to.deep.equal(expected)


  it "should parse a single rule with multiple arguments" , () ->

    rule  = 'range:4,10'
    field = 'age'

    expected =
      rule    : 'range'
      args    : "4,10"
      message : 'range validation failed on age'

    hash = Parser.parseRule rule,field
    expect(hash).to.deep.equal(expected)


  it "should parse rule and show custom message" , () ->

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
