chai          = require 'chai'
should        = chai.should()
expect        = chai.expect
Messages      = new (require '../lib/messages')


describe "setMessage", () ->

  it "should set message for a single field", () ->

    rule    = 'required'
    message = 'This field is required'

    Messages.setMessage rule,message

    builtMessage = Messages.buildMessage rule,'name'
    expect(builtMessage).to.equal(message)


  it "should set bulk messages", () ->

    message = 'This field is required'

    messages =
      'required' : message

    Messages.setMessages messages

    builtMessage = Messages.buildMessage 'required','name'
    expect(builtMessage).to.equal(message)


  it "should set bulk messages and should convert dot strings to objects", () ->

    message      = 'This field is required'
    nameSpecific = 'Your name is required'

    messages =
      'required'      : message
      'name.required' : nameSpecific

    Messages.setMessages messages

    builtMessage = Messages.buildMessage 'required','name'
    expect(builtMessage).to.equal(nameSpecific)