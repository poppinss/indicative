const { validationCompiler } = require('..')
const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

const schema = {
  username: 'required',
  age: 'required|integer'
}

/**
 * Dummy validations
 */
const validations = {
  required: {
    async: false,
    validate () {
      return true
    }
  },
  integer: {
    async: false,
    validate () {
      return true
    }
  },
}

const data = {
  username: 'virk',
  age: 28,
}

/**
 * Dummy formatter
 */
class Formatter {
  constructor () {
    this.errors = []
  }
  addError (error) {
    this.errors.push(error)
  }
  toJSON () {
    return this.errors.length ? this.errors : null
  }
}

const validate = validationCompiler(schema, validations, {})

suite.add('Indicative@new', {
  defer: true,
  fn (deferred) {
    validate(data, new Formatter()).then(() => deferred.resolve())
  }
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true })
