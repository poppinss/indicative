chai        = require 'chai'
moment      = require 'moment'
should      = chai.should()
expect      = chai.expect
Rules       = require '../lib/rules'
rules       = new Rules


describe "#Rules", () ->
  describe "arthimetic rules", () ->

    context "above", () ->

      field = 'age'
      message = 'Age must be above 30 years'
      ruleDefination = '30'

      it "should return error when value passed is not above the defined value", () ->

        data =
          age:23

        rules.validations.above data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message

      it "should return resolved promise when value passed is more than defined value", () ->

        data =
          age:31

        rules.validations.above data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err

    context "decimal", () ->

      field = 'test-speed'
      message = 'test speed should be in decimal numbers'

      it "should return error when value passed is not a decimal number", () ->

        data =
          'test-speed' : 10

        rules.validations.decimal data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message

      it "should return work fine when a valid decimal value has been passed", () ->

        data =
          'test-speed' : 10.5

        rules.validations.decimal data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "equals", () ->

      field = 'promo_code'
      message = 'invalid promo code'
      ruleDefination = 'SUNDAY30'

      it "should return error when value passed does not equals defined value", () ->

        data =
          promo_code: 'SUNDAY10'

        rules.validations.equals data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message

      it "should work fine when value passed is equal to the defined value", () ->

        data =
          promo_code: 'SUNDAY30'

        rules.validations.equals data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "even", () ->

      field = 'car_doors'
      message = 'car doors cannot be even in number'

      it "should return error when value passed is not an even number", () ->

        data =
          car_doors: 3

        rules.validations.even data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when value passed is a valid even number", () ->

        data =
          car_doors: 4

        rules.validations.even data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err




    context "finite", () ->

      field = 'employees'
      message = 'number of employees should be finite'

      it "should return error when value passed is not finite", () ->

        data =
          employees: 42/0

        rules.validations.finite data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message

      it "should work fine when value passed is a valid finite number", () ->

        data =
          employees: 42

        rules.validations.finite data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "infinite", () ->

      field = 'stars'
      message = 'number of employees should be infinite'

      it "should return error when value passed is not infinite", () ->

        data =
          stars: 42

        rules.validations.infinite data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message

      it "should work fine when value passed is a valid infinite number", () ->

        data =
          stars: Infinity

        rules.validations.infinite data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "integer ", () ->

      field = 'age'
      message = 'age is not valid'

      it "should return error when value passed is not an integer", () ->

        data =
          age: '42'

        rules.validations.integer data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message

      it "should work fine when value passed is a valid integer", () ->

        data =
          age: 28

        rules.validations.integer data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "max", () ->

      field = 'password'
      message = 'password cannot be greater than 6 digits'
      ruleDefination = 6

      it "should return error when length of value is more than defined length", () ->

        data =
          password: 'hello@1210219'

        rules.validations.max data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message

      it "should work fine when length of value is below than defined length", () ->

        data =
          password: 'r@1Y!'

        rules.validations.max data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when length of value is equal to the defined length", () ->

        data =
          password: 'tr@1Y!'

        rules.validations.max data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when value contains integers only", () ->

        data =
          password: 123456

        rules.validations.max data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "min", () ->

      field = 'password'
      message = 'password should be greater than 6 digits'
      ruleDefination = 6

      it "should return error when length of value is less than defined length", () ->

        data =
          password: 'hello'

        rules.validations.min data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message

      it "should work fine when length of value is greater than defined length", () ->

        data =
          password: 'brr@1Y!'

        rules.validations.min data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when length of value is equal to the defined length", () ->

        data =
          password: 'tr@1Y!'

        rules.validations.min data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when value contains integers only", () ->

        data =
          password: 123456

        rules.validations.min data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "negative", () ->

      field = 'tempature'
      message = 'tempature should be below 0 degrees'

      it "should return error when value passed is not negative", () ->

        data =
          tempature: 10

        rules.validations.negative data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should return error when value passed is not a valid number", () ->

        data =
          tempature: '-2'

        rules.validations.negative data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message

      it "should work fine when value passed is a valid negative number", () ->

        data =
          tempature: -2

        rules.validations.negative data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "notEquals", () ->

      field = 'username'
      message = 'username john has already been taken'
      ruleDefination = 'john'

      it "should return an error when value passed is equal to the defined value", () ->

        data =
          username: 'john'

        rules.validations.notEquals data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when value passed does not equal defined value", () ->

        data =
          username: 'johny'

        rules.validations.notEquals data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "odd", () ->

      field = 'station'
      message = 'station channel frequency should be an odd value'

      it "should return error when value passed is not an odd number", () ->

        data =
          station: 104

        rules.validations.odd data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when value passed is a valid odd number", () ->

        data =
          station: 93.5

        rules.validations.odd data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "positive", () ->

      field = 'age'
      message = 'age cannot be negative'

      it "should return error when value passed is not positive", () ->

        data =
          age: -1

        rules.validations.positive data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when value passed is a valid positive number", () ->

        data =
          age: 10

        rules.validations.positive data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "range", () ->

      field = 'age'
      message = 'age should be between 18 to 40 years'
      ruleDefination = '18,40'

      it "should return error when value passed is under defined range", () ->

        data =
          age: 16

        rules.validations.range data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should return error when value passed is over defined range", () ->

        data =
          age: 42

        rules.validations.range data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when value passed is between defined range", () ->

        data =
          age: 22

        rules.validations.range data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when value passed is between defined range and is a decimal number", () ->

        data =
          age: 22.2

        rules.validations.range data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when value passed is between defined range and is a rounded decimal number", () ->

        data =
          age: 22.0

        rules.validations.range data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when value passed is between defined range and range is in negative", () ->

        data =
          longitude: 89.1
        ruleDefination = '-180.0,180.0'
        field = 'longitude'

        rules.validations.range data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "under", () ->

      field = 'age'
      message = 'Age must be under 50 years'
      ruleDefination = 50

      it "should return error when value passed is not under defined value", () ->

        data =
          age:52

        rules.validations.under data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message

      it "should return resolved promise when value passed is under defined value", () ->

        data =
          age:31

        rules.validations.under data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err

  describe "datetime rules", () ->

    context "after", () ->

      field = 'expiry_date'
      message = 'Expiry date cannot be past'
      ruleDefination = moment().format "YYYY-MM-DD"

      it "should return error when value passed is not after defined date" , () ->

        data =
          expiry_date: moment().subtract(1,'day').format "YYYY-MM-DD"

        rules.validations.after data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message

      it "should return error when value passed is same as defined date" , () ->

        data =
          expiry_date:moment().format "YYYY-MM-DD"

        rules.validations.after data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should work fine when date passed is after defined date" , () ->

        data =
          expiry_date: moment().add(1,'day').format "YYYY-MM-DD"

        rules.validations.after data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "afterOffsetOf", () ->

      field = 'expiry_date'
      message = 'Expiry date cannot be past'
      ruleDefination = '1,days'

      it "should return error when value passed is not after defined offset" , () ->

        data =
          expiry_date: moment().format "YYYY-MM-DD"

        rules.validations.afterOffsetOf data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message

      it "should return error when value passed is same as defined offset" , () ->

        data =
          expiry_date: moment().add(1,'days').toISOString()

        rules.validations.afterOffsetOf data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should work fine when date passed is after the defined offset" , () ->

        data =
          expiry_date: moment().add(1,'days').add(1,'seconds').toISOString()

        rules.validations.afterOffsetOf data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should validate against now with no args as offset" , () ->
        data =
          expiry_date: moment().toISOString()

        rules.validations.afterOffsetOf data,field,message,''
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when date passed is after now with no args as offset" , () ->

        data =
          expiry_date: moment().add(1,'seconds').toISOString()

        rules.validations.afterOffsetOf data,field,message,''
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "before", () ->

      field = 'dob'
      message = 'Your dob cannot be after today'
      ruleDefination = moment().format "YYYY-MM-DD"

      it "should return error when value passed is not before defined date" , () ->

        data =
          dob: moment().add(1,'day').format "YYYY-MM-DD"

        rules.validations.before data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message

      it "should return error when value passed is same as defined date" , () ->

        data =
          dob:moment().format "YYYY-MM-DD"

        rules.validations.before data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should work fine when date passed is before defined date" , () ->

        data =
          dob: moment().subtract(1,'day').format "YYYY-MM-DD"

        rules.validations.before data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "beforeOffsetOf", () ->

      field = 'dob'
      message = 'Your dob cannot be after today'
      ruleDefination = '1,days'

      it "should return error when value passed is after defined offset" , () ->

        data =
          dob: moment().add(1,'day').add(1, 'seconds').toISOString()

        rules.validations.beforeOffsetOf data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should return error when value passed is same as defined offset" , () ->
        # mimic now date as pivot will be created later
        data =
          dob: moment().add(1, 's').toISOString()

        rules.validations.beforeOffsetOf data,field,message,'0'
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should work fine when date passed is before defined offset" , () ->

        data =
          dob: moment().toISOString()

        rules.validations.beforeOffsetOf data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should validate against now with no args as offset" , () ->
        # mimic future date
        data =
          dob: moment().add(1, 's').toISOString()

        rules.validations.beforeOffsetOf data,field,message,''
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when date passed is before now with no args as offset" , () ->
        data =
          dob: moment().subtract(1, 's').toISOString()

        rules.validations.beforeOffsetOf data,field,message,''
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "date", () ->

      field = 'dob'
      message = 'dob should be a valid date'

      it "should return error when value passed is not a valid date" , () ->

        data =
          dob: "20140428"

        rules.validations.date data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when date passed is a valid date" , () ->

        data =
          dob: "2014-04-28"

        rules.validations.date data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when date passed is a valid date and has MM/DD/YYYY format" , () ->

        data =
          dob: "04/28/2015"

        rules.validations.date data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when date passed is a valid date and has MM‐DD‐YYYY format" , () ->

        data =
          dob: "04-28-2015"

        rules.validations.date data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when date passed is a valid date and has YYYY/MM/DD format" , () ->

        data =
          dob: "2015/04/28"

        rules.validations.date data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should return error when value passed is not in predefined date formats" , () ->

        data =
          dob: "2014.04.28"

        rules.validations.date data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



    context "dateFormat", () ->

      field = 'dob'
      message = 'dob should be a valid date as YYYY-MM-DD'
      ruleDefination = "YYYY-MM-DD"

      it "should return error when value passed is not a valid date" , () ->

        data =
          dob: "20140428"

        rules.validations.dateFormat data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should return error when value passed is a valid date but not in defined format" , () ->

        data =
          dob: "2015/04/28"

        rules.validations.dateFormat data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should work fine when date passed is a valid date with valid defined format" , () ->

        data =
          dob: "2014-04-28"

        rules.validations.dateFormat data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err




    context "day", () ->

      field = 'party_night'
      message = 'Party nights should be saturday\'s only'
      ruleDefination = "saturday"

      it "should return error when day of date passed is not equal to defined day" , () ->

        data =
          party_night: "2015-04-28"

        rules.validations.day data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should not work when value passed is not a valid date object or neither can be converted to date object" , () ->

        data =
          party_night: "25th april 2015"

        rules.validations.day data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when day of date passed is equal to defined day" , () ->

        data =
          party_night: "2015-04-25"

        rules.validations.day data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err




    context "future", () ->

      field = 'next_release'
      message = 'Release can be done in future only'

      it "should return error when value passed is not a future date" , () ->

        data =
          next_release: moment().format()

        rules.validations.future data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should return error when value passed is today but with smaller time" , () ->

        data =
          next_release: moment().subtract(3,'hours').format()

        rules.validations.future data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should work fine when value passed is today but with greater time" , () ->

        data =
          next_release: moment().add(3,'hours').format()

        rules.validations.future data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when value passed is a valid future date" , () ->

        data =
          next_release: moment().add(1,'day').format()

        rules.validations.future data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err





    context "month", () ->

      field = 'closing_date'
      message = 'Closing months can be march only'
      ruleDefination = "march"

      it "should return error when month of date passed is not equal to defined month" , () ->

        data =
          closing_date: "2015-04-28"

        rules.validations.month data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when month of date passed is equal to defined month" , () ->

        data =
          closing_date: "2015-03-31"

        rules.validations.month data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "future", () ->

      field = 'dob'
      message = 'Dob should be in past'

      it "should return error when value passed is not a past date" , () ->

        data =
          dob: moment().add(3,'days').format()

        rules.validations.past data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should return error when value passed is today but with greater time" , () ->

        data =
          dob: moment().add(3,'hours').format()

        rules.validations.past data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should work fine when value passed is today but with smaller time" , () ->

        data =
          dob: moment().subtract(3,'hours').format()

        rules.validations.past data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when value passed is a valid date in past" , () ->

        data =
          dob: moment().subtract(3,'days').format()

        rules.validations.past data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "today", () ->

      field = 'somefield'
      message = 'date should be today only'

      it "should return error when date passed is not today" , () ->

        data =
          somefield: moment().add(1,'day').format()

        rules.validations.today data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when value date passed is today" , () ->

        data =
          somefield: moment().format()

        rules.validations.today data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "tomorrow", () ->

      field = 'somefield'
      message = 'date should be tomorrow only'

      it "should return error when date passed is not tomorrow" , () ->

        data =
          somefield: moment().format()

        rules.validations.tomorrow data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when value date passed is tomorrow" , () ->

        data =
          somefield: moment().add(1,'day').format()

        rules.validations.tomorrow data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err




    context "weekday", () ->

      field = 'working_hours'
      message = 'working hours should be on weekdays only'

      it "should return error when day of date passed is not a weekday" , () ->

        data =
          working_hours: moment().day('sunday').format()


        rules.validations.weekday data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should work fine when day of date passed is a valid weekday" , () ->

        data =
          working_hours: moment().day('monday').format()

        rules.validations.weekday data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err




    context "weekend", () ->

      field = 'adoniscon'
      message = 'adoniscon should be on weekends only'

      it "should return error when day of date passed is not weekend" , () ->

        data =
          adoniscon: moment().day('monday').format()


        rules.validations.weekend data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should work fine when day of date passed is a valid weekend" , () ->

        data =
          adoniscon: moment().day('saturday').format()

        rules.validations.weekend data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err





    context "weekend", () ->

      field = 'adoniscon'
      message = 'adoniscon should be on weekends only'

      it "should return error when day of date passed is not weekend" , () ->

        data =
          adoniscon: moment().day('monday').format()


        rules.validations.weekend data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should work fine when day of date passed is a valid weekend" , () ->

        data =
          adoniscon: moment().day('saturday').format()

        rules.validations.weekend data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err




    context "year", () ->

      field = 'world_cup'
      message = 'cricket world cup dates should be in 2015 only'
      ruleDefination = 2015

      it "should return error when year of date passed is not equal to defined year" , () ->

        data =
          world_cup: "2014-10-20"

        rules.validations.year data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should work fine when year of date passed is equal to defined year" , () ->

        data =
          world_cup: "2015-10-20"

        rules.validations.year data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err




    context "yesterday", () ->

      field = 'somefield'
      message = 'date should be yesterday only'

      it "should return error when date passed is not yesterday" , () ->

        data =
          somefield: moment().add(1,'day').format()

        rules.validations.yesterday data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when value date passed is yesterday" , () ->

        data =
          somefield: moment().subtract(1,'day').format()

        rules.validations.yesterday data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err

  describe "regular expression rules", () ->

    context "alpha", () ->

      field = 'name'
      message = 'name should only contain letters'

      it "should return error when value passed is not alpha" , () ->

        data =
          name: 'doe123'

        rules.validations.alpha data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when value passed is an alpha value" , () ->

        data =
          name: 'doe'

        rules.validations.alpha data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "alphaNumeric", () ->

      field = 'username'
      message = 'username should be combination of numbers and letters'

      it "should return error when value passed is not alphaNumeric" , () ->

        data =
          username: 'doe@123'

        rules.validations.alphaNumeric data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when value passed is an alphaNumeric value" , () ->

        data =
          username: 'd0e1j'

        rules.validations.alphaNumeric data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "creditCard", () ->

      field = 'card_number'
      message = 'card number is not valid'

      it "should return error when value passed is not a valid credit card number format" , () ->

        data =
          card_number: '878282246310005'

        rules.validations.creditCard data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when value passed is a valid credit card number format" , () ->

        data =
          card_number: '378282246310005'

        rules.validations.creditCard data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine with american express credit card format" , () ->

        data =
          card_number: '371449635398431'

        rules.validations.creditCard data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine with american express corporate credit card format" , () ->

        data =
          card_number: '378734493671000'

        rules.validations.creditCard data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine with discover credit card format" , () ->

        data =
          card_number: '6011111111111117'

        rules.validations.creditCard data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine with diners club credit card format" , () ->

        data =
          card_number: '30569309025904'

        rules.validations.creditCard data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine with JCB club credit card format" , () ->

        data =
          card_number: '3530111333300000'

        rules.validations.creditCard data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine with MasterCard credit card format" , () ->

        data =
          card_number: '5555555555554444'

        rules.validations.creditCard data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine with Visa credit card format" , () ->

        data =
          card_number: '4111111111111111'

        rules.validations.creditCard data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine with Visa credit card with less character format" , () ->

        data =
          card_number: '4222222222222'

        rules.validations.creditCard data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "email", () ->

      field = 'email'
      message = 'email is not valid'

      it "should return error when value passed is not valid email address" , () ->

        data =
          email: 'some-string'

        rules.validations.email data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when value passed is valid email address" , () ->

        data =
          username: 'myemail@test.com'

        rules.validations.email data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "email", () ->

      field = 'email'
      message = 'email is not valid'

      it "should return error when value passed is not valid email address" , () ->

        data =
          email: 'some-string'

        rules.validations.email data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when value passed is valid email address" , () ->

        data =
          username: 'myemail@test.com'

        rules.validations.email data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "hexadecimal", () ->

      field   = 'color'
      message = 'color should hex decimal only'

      it "should return error when value passed is not a valid hexadecimal" , () ->

        data =
          color: 'string'

        rules.validations.hexadecimal data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when value passed is valid hexadecimal" , () ->

        data =
          color: 'ff0000'

        rules.validations.hexadecimal data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "hexColor", () ->

      field   = 'color'
      message = 'color should be a valid hex color code'

      it "should return error when value passed is not a valid hex color code" , () ->

        data =
          color: '#eeee'

        rules.validations.hexColor data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when value passed is valid hex color code" , () ->

        data =
          color: '#ff0000'

        rules.validations.hexColor data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "ip", () ->

      field   = 'ip_address'
      message = 'ip address is not valid'

      it "should return error when value passed is not a valid ip address" , () ->

        data =
          ip_address: '1209000192'

        rules.validations.ip data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine with ipv4 address" , () ->

        data =
          ip_address: '10.0.0.68'

        rules.validations.ip data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine with ipv6 address" , () ->

        data =
          ip_address: '3ffe:1900:4545:3:200:f8ff:fe21:67cf'

        rules.validations.ip data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when value passed is a valid ip address" , () ->

        data =
          ip_address: '127.0.0.1'

        rules.validations.ip data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "ipv4", () ->

      field   = 'ip_address'
      message = 'ip address should be valid ipv4 address'

      it "should return error when value passed is not a valid ip address" , () ->

        data =
          ip_address: '1209000192'

        rules.validations.ipv4 data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine with ipv4 address" , () ->

        data =
          ip_address: '10.0.0.68'

        rules.validations.ipv4 data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should return error when value passed is not a valid ipv4 address" , () ->

        data =
          ip_address: '3ffe:1900:4545:3:200:f8ff:fe21:67cf'

        rules.validations.ipv4 data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


    context "ipv6", () ->

      field   = 'ip_address'
      message = 'ip address should be valid ipv6 address'

      it "should return error when value passed is not a valid ip address" , () ->

        data =
          ip_address: '1209000192'

        rules.validations.ipv6 data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine with ipv6 address" , () ->

        data =
          ip_address: '3ffe:1900:4545:3:200:f8ff:fe21:67cf'

        rules.validations.ipv6 data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should return error when value passed is not a valid ipv6 address" , () ->

        data =
          ip_address: '10.0.0.68'

        rules.validations.ipv6 data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


    context "socialSecurityNumber", () ->

      field   = 'ssn'
      message = 'ssn is not valid'

      it "should return error when value passed is not a valid ssn" , () ->

        data =
          ssn: '121000999'

        rules.validations.socialSecurityNumber data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine with valid ssn" , () ->

        data =
          ssn: '362-90-0999'

        rules.validations.socialSecurityNumber data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "url", () ->

      field   = 'blog_address'
      message = 'blog address should be a valid url'

      it "should return error when value passed is not a valid url" , () ->

        data =
          blog_address: 'examplecom'

        rules.validations.url data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine with valid url" , () ->

        data =
          blog_address: 'http://url.com'

        rules.validations.url data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine without http protocol" , () ->

        data =
          blog_address: 'url.com'

        rules.validations.url data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine without https protocol" , () ->

        data =
          blog_address: 'https://url.com'

        rules.validations.url data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine without www" , () ->

        data =
          blog_address: 'www.url.com'

        rules.validations.url data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine without www" , () ->

        data =
          blog_address: 'www.url.com'

        rules.validations.url data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


  describe "strings", () ->

    context "capitalized" , () ->

      field   = 'full_name'
      message = 'your name should start with a capital letter'

      it "should return error when value passed is not capitalized" , () ->

        data =
          full_name: 'j doe'

        rules.validations.capitalized data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work find when value passed is capitalized" , () ->

        data =
          full_name: 'J Doe'

        rules.validations.capitalized data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "endsWith" , () ->

      field   = 'email_address'
      message = 'your email address should ends with @company.com'
      ruleDefination = '@company.com'

      it "should return error when value passed does not ends with defined value" , () ->

        data =
          email_address: 'some.email@example.com'

        rules.validations.endsWith data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work find when value passed ends with defined value" , () ->

        data =
          email_address: 'some.email@company.com'

        rules.validations.endsWith data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "includes" , () ->

      field   = 'flight_make'
      message = 'flight make should be boeing'
      ruleDefination = 'boeing'

      it "should return error when value passed does not include defined value" , () ->

        data =
          flight_make: 'airbus a380'

        rules.validations.includes data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work find when value passed contains defined value" , () ->

        data =
          flight_make: 'boeing 787'

        rules.validations.includes data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err




    context "lowerCase" , () ->

      field   = 'username'
      message = 'username should be all lower case'

      it "should return error when value passed is not all lower case" , () ->

        data =
          username: 'Bingo!'

        rules.validations.lowerCase data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work find when value passed is all lower case" , () ->

        data =
          username: 'bingo!'

        rules.validations.lowerCase data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "startsWith" , () ->

      field   = 'username'
      message = 'username should prefix with company name'
      ruleDefination = 'COM'

      it "should return error when value passed does not starts with defined value" , () ->

        data =
          username: 'CO-bingo'

        rules.validations.startsWith data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work find when value starts with defined value" , () ->

        data =
          username: 'COM-bingo'

        rules.validations.startsWith data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "upperCase" , () ->

      field   = 'gender'
      message = 'gender should be all lower case'

      it "should return error when value passed is not all upper case" , () ->

        data =
          gender: 'Male'

        rules.validations.upperCase data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work find when value passed is all upper case" , () ->

        data =
          username: 'MALE'

        rules.validations.upperCase data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


  describe "types", () ->

    context "array" , () ->

      field   = 'cars'
      message = 'cars should be an array'

      it "should return error when value passed is not an array" , () ->

        data =
          cars: 'beamer'

        rules.validations.array data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work find when value passed is an array" , () ->

        data =
          cars: ['beamer']

        rules.validations.array data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "boolean" , () ->

      field   = 'is_active'
      message = 'active state should be a boolean'

      it "should return error when value passed is not a boolean value" , () ->

        data =
          is_active: 'yes'

        rules.validations.boolean data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work find when value passed is a boolean value" , () ->

        data =
          is_active: true

        rules.validations.boolean data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err




    context "json" , () ->

      field   = 'songs_list'
      message = 'songs should be sent over in JSON format'

      it "should return error when value passed is not a valid JSON" , () ->

        data =
          songs_list: 'songname:somename'

        rules.validations.json data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work find when value passed is valid JSON" , () ->

        data =
          songs_list: {song_name:'somename'}

        rules.validations.json data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


  describe "presence" , () ->

    context "accepted", () ->

      field   = 'terms'
      message = 'terms should be accepted'

      it "should return an error when field under validation has not been accepted", () ->

        data =
          terms: false

        rules.validations.accepted data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should work fine when field under validation is accepted , means is not false or null or blank", () ->

        data =
          terms: 'Yes'

        rules.validations.accepted data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "different", () ->

      field   = 'alternate_email'
      message = 'alternate email should be different from email address'
      ruleDefination = 'email'

      it "should return an error when field under validation is not different from defined field", () ->

        data =
          email           : 'original@example.com'
          alternate_email : 'original@example.com'

        rules.validations.different data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should work fine when defined field does not exists in data object", () ->

        data =
          alternate_email : 'original@example.com'

        rules.validations.different data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



      it "should work fine when value is different from the defined field", () ->

        data =
          email           : 'original@example.com'
          alternate_email : 'alternate@example.com'

        rules.validations.different data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



    context "in", () ->

      field   = 'user_type'
      message = 'user type should be one of the defined types'
      ruleDefination = 'Admin,Moderator,User'

      it "should return an error when field under value is not one of the defined value", () ->

        data =
          user_type : 'Staff'

        rules.validations.in data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should work fine when value of defined field is in one of the defined values", () ->

        data =
          user_type : 'Admin'

        rules.validations.in data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "notIn", () ->

      field   = 'username'
      message = 'user name has been taken'
      ruleDefination = 'admin,root,superuser'

      it "should return an error when field under value is in one of the defined value", () ->

        data =
          username : 'admin'

        rules.validations.notIn data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should work fine when value of defined field is not in one of the defined values", () ->

        data =
          user_type : 'behlo'

        rules.validations.notIn data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "required", () ->

      field   = 'username'
      message = 'username is required'

      it "should return an error when field under validation is not present", () ->

        data = {}

        rules.validations.required data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should work when data passed is not a string and is required", () ->

        data =
          username: [0,1]

        rules.validations.required data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



      it "should return an error when field under validation is null", () ->

        data =
          username : null

        rules.validations.required data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should return an error when field under validation is undefined", () ->

        data =
          username : undefined

        rules.validations.required data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should not return an error when field under validation is false", () ->

        data =
          username : false

        rules.validations.required data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when value is present", () ->

        data =
          username : 'joe'

        rules.validations.required data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err

      it "work fine when value passed is a numeric negative boolean", () ->

        data =
          username : 0

        rules.validations.required data,field,message
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err

      it "throw error when field under validation is empty", () ->

        data = 
          username : ""

        rules.validations.required data,field,message
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


    context "required_if", () ->

      field   = 'mustache'
      message = 'required when user is gender is male'
      ruleDefination = 'gender,male'

      it "should work fine when field if field is not present", () ->

        data = {}

        rules.validations.requiredIf data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



      it "should return an error when field if field is present and field under validation is not present", () ->

        data =
          gender : 'male'

        rules.validations.requiredIf data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should return an error when field if field is present and field under validation is null", () ->

        data =
          gender   : 'male'
          mustache : null

        rules.validations.requiredIf data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should return an error when field if field is present and field under validation is undefined", () ->

        data =
          gender   : 'male'
          mustache : undefined

        rules.validations.requiredIf data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should return an error when field if field is present and field under validation is set to false", () ->

        data =
          gender   : 'male'
          mustache : false

        rules.validations.requiredIf data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when field under validation is present and value of field under if is also same", () ->

        data =
          gender   : 'male'
          mustache : true

        rules.validations.requiredIf data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



      it "should work fine when field under validation is present and value of field under if value is not equal to defined value", () ->

        data =
          gender   : 'female'
          mustache : false

        rules.validations.requiredIf data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "required_with_all", () ->

      field   = 'apple_freak'
      message = 'apple freak should be true when user owns all apple devices'
      ruleDefination = 'iphone,mac,imac,ipod,ipad'

      it "should work fine when `with fields` are not present and field under validation is also not present", () ->

        data = {}

        rules.validations.requiredWithAll data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when some of the `with fields` are present and field under validation is not present", () ->

        data =
          imac : true
          ipod : true

        rules.validations.requiredWithAll data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should return error when all of the `with fields` are present and field under validation is not present", () ->

        data =
          imac   : true
          ipod   : true
          ipad   : true
          mac    : true
          iphone : true

        rules.validations.requiredWithAll data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should return error when all of the `with fields` are present and field under validation is null", () ->

        data =
          imac   : true
          ipod   : true
          ipad   : true
          mac    : true
          iphone : true
          apple_freak : null

        rules.validations.requiredWithAll data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should return error when all of the `with fields` are present and field under validation is undefined", () ->

        data =
          imac   : true
          ipod   : true
          ipad   : true
          mac    : true
          iphone : true
          apple_freak : undefined

        rules.validations.requiredWithAll data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message

      it "should work fine when all of the `with fields` are present and field under validation is false", () ->

        data =
          imac   : true
          ipod   : true
          ipad   : true
          mac    : true
          iphone : true
          apple_freak : false


        rules.validations.requiredWithAll data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when all of the `with fields` are present and field under validation is true or present", () ->

        data =
          imac   : true
          ipod   : true
          ipad   : true
          mac    : true
          iphone : true
          apple_freak : true


        rules.validations.requiredWithAll data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "required_with_any", () ->

      field   = 'social_login'
      message = 'social login should be set true when user is logged in using social channels'
      ruleDefination = 'twitter,facebook,gplus'

      it "should work fine when `with any fields` are not present and field under validation is also not present", () ->

        data = {}

        rules.validations.requiredWithAny data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should return error when field under validation is not present and any one with any fields are present", () ->

        data =
          twitter : true

        rules.validations.requiredWithAny data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should return error when field under validation is null and any one with any fields are present", () ->

        data =
          twitter       : true
          social_login  : null

        rules.validations.requiredWithAny data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message



      it "should return error when field under validation is undefined and any one with any fields are present", () ->

        data =
          twitter       : true
          social_login  : undefined

        rules.validations.requiredWithAny data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when field under validation is false and any one with any fields are present", () ->

        data =
          twitter       : true
          social_login  : false

        rules.validations.requiredWithAny data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when `with any fields` are present and field under validation is also present and not false", () ->

        data =
          twitter       : true
          social_login  : true

        rules.validations.requiredWithAny data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err






    context "required_without_all", () ->

      field   = 'phone_number'
      message = 'phone number is required when you are not member or staff'
      ruleDefination = 'member,staff'

      it "should work fine when `without all fields` are present and field under validation is also not present", () ->

        data =
          member : true

        rules.validations.requiredWithoutAll data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should return error when `without all fields` are not present and field under validation is also not present", () ->

        data = {}

        rules.validations.requiredWithoutAll data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should return error when `without all fields` are not present and field under validation is null", () ->

        data =
          phone_number : null

        rules.validations.requiredWithoutAll data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should return error when `without all fields` are not present and field under validation is undefined", () ->

        data =
          phone_number : undefined

        rules.validations.requiredWithoutAll data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when `without all fields` are not present and field under validation is false", () ->

        data =
          phone_number : false

        rules.validations.requiredWithoutAll data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine when `without all fields` are not present and field under validation is true or present", () ->

        data =
          phone_number : true

        rules.validations.requiredWithoutAll data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err




    context "required_without_any", () ->

      field   = 'email_address'
      message = 'email address is required without twitter and phone number'
      ruleDefination = 'twitter_token,phone_number'

      it "should work fine when `without any fields` are present and field under validation is also not present", () ->

        data =
          twitter_token : 'sometoken'
          phone_number  : '9102301021'

        rules.validations.requiredWithoutAny data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err



      it "should return error when any of the `without any fields` are missing and field under validation is not present", () ->

        data =
          phone_number  : '9102301021'

        rules.validations.requiredWithoutAny data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should return error when any of the `without any fields` are missing and field under validation is null", () ->

        data =
          phone_number  : '9102301021'
          email_address : null

        rules.validations.requiredWithoutAny data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when any of the `without any fields` are missing and field under validation is false", () ->

        data =
          phone_number  : '9102301021'
          email_address : false

        rules.validations.requiredWithoutAny data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should return error when any of the `without any fields` are missing and field under validation is undefined", () ->

        data =
          twitter_token  : 'sometoken'
          email_address : undefined

        rules.validations.requiredWithoutAny data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should return error when any of the `without any fields` are missing and field under validation is present and is true", () ->

        data =
          twitter_token  : 'sometoken'
          email_address : '@example.com'

        rules.validations.requiredWithoutAny data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "regex", () ->

      field   = 'email'
      message = 'regex should match'
      ruleDefination = "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$"

      it "should execute defined regex on rule defination and fail when regex is not passed", () ->

        data =
          email  : 'foo'

        rules.validations.regex data,field,message,ruleDefination
        .catch (err) ->
          should.exist err
          expect(err).to.equal message

      it "should execute defined regex on rule defination and succeed when regex is passed", () ->

        data =
          email  : 'foo@bar.com'

        rules.validations.regex data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


    context "same", () ->

      field   = 'password_confirm'
      message = 'Password should match'
      ruleDefination = 'password'

      it "should work fine with same field is not present", () ->

        data = {}

        rules.validations.same data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should work fine with same field is present and field under validation is not present", () ->

        data =
          password : 'wuhooo'

        rules.validations.same data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err


      it "should return error when same field value does not equals value of field under validation", () ->

        data =
          password : 'wuhooo'
          password_confirm : 'wuooo'

        rules.validations.same data,field,message,ruleDefination
        .then (success) ->
          should.not.exist success
        .catch (err) ->
          should.exist err
          expect(err).to.equal message


      it "should work fine when field under validation value is same as `same field's value`", () ->

        data =
          password : 'wuhooo'
          password_confirm : 'wuhooo'

        rules.validations.same data,field,message,ruleDefination
        .then (success) ->
          should.exist success
        .catch (err) ->
          should.not.exist err
