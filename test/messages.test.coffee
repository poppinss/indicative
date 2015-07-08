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

  context "templating", () ->

    it "should replace {{field}} with field name", (done) ->
      message = "{{field}} is required to continue"
      messages = 
        'required'     : message
      Messages.setMessages messages
      builtMessage = Messages.buildMessage 'required','age'
      expect(builtMessage).to.equal("age is required to continue")
      done()


    it "should replace {{rule}} with rule applied", (done) ->
      message = "{{rule}} validation failed on {{field}}"
      messages = 
        'required'     : message
      Messages.setMessages messages
      builtMessage = Messages.buildMessage 'required','age'
      expect(builtMessage).to.equal("required validation failed on age")
      done()


    it "should replace {{value}} with value next to field", (done) ->
      message = "{{value}} is not valid email address"
      messages = 
        'email'     : message
      Messages.setMessages messages
      builtMessage = Messages.buildMessage 'email','email',null,'something'
      expect(builtMessage).to.equal("something is not valid email address")
      done()


  
    it "should use arguments passed while defining rules", (done) ->
      message = "Your age must be over {{argument[0]}} and under {{argument[1]}}"
      messages = 
        'range'     : message
      Messages.setMessages messages
      builtMessage = Messages.buildMessage 'range','age','18,42'
      expect(builtMessage).to.equal("Your age must be over 18 and under 42")
      done()


    it "should access argument values using dot notation", (done) ->
      message = "Your age must be over {{argument.0}} and under {{argument.1}}"
      messages = 
        'range'     : message
      Messages.setMessages messages
      builtMessage = Messages.buildMessage 'range','age','18,42'
      expect(builtMessage).to.equal("Your age must be over 18 and under 42")
      done()
