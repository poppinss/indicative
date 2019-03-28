const { Validator } = require('../build/src/Validator/index')
const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

const schema = {
  username: 'required',
  age: 'required|integer'
}

const data = {
  username: 'virk',
  age: 22
}

const validator = new Validator()
validator.validate(data, schema, {}, { cacheKey: 'foo' }).catch(console.log)

suite.add('Indicative@new', {
  defer: true,
  fn (deferred) {
    validator.validate(data, schema, {}, { cacheKey: 'foo' }).then(() => deferred.resolve())
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
