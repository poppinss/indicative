import { validate, schema } from '../validator'
import { Suite } from 'benchmark'
const suite = new Suite()

suite
  .add('Validate | cache', {
    defer: true,
    fn (deferred) {
      validate({ username: 'virk' }, schema.new({ username: schema.string() }), {}, {
        cacheKey: 'foo',
      })
        .then(() => {
          deferred.resolve()
        })
    },
  })
  .add('Validate | no cache', {
    defer: true,
    fn (deferred) {
      validate({ username: 'virk' }, schema.new({ username: schema.string() }))
        .then(() => {
          deferred.resolve()
        })
    },
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ 'async': true })
