chai          = require 'chai'
should        = chai.should()
expect        = chai.expect
Messages      = new (require '../lib/messages')


describe "setMessage", () ->

  beforeEach (done) ->
    Messages.destructor()
    done()

  it "should set message for a single field", (done) ->

    rule    = 'required'
    message = 'This field is required'

    Messages.setMessage rule,message

    builtMessage = Messages.buildMessage rule,'name'
    expect(builtMessage).to.equal(message)
    done()


  it "should set bulk messages", (done) ->

    message = 'This field is required'

    messages =
      'required' : message

    Messages.setMessages messages

    builtMessage = Messages.buildMessage 'required','name'
    expect(builtMessage).to.equal(message)
    done()


  it "should set bulk messages and should convert dot strings to objects", (done) ->

    message      = 'This field is required'
    nameSpecific = 'Your name is required'

    messages =
      'required'      : message
      'name.required' : nameSpecific

    Messages.setMessages messages

    builtMessage = Messages.buildMessage 'required','name'
    expect(builtMessage).to.equal(nameSpecific)
    done()
