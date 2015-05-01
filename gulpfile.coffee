gulp        = require 'gulp'
coffeelint  = require 'gulp-coffeelint'

gulp.task 'lint', () ->
  gulp.src('./lib/*.coffee')
    .pipe(coffeelint('coffeelint.json'))
    .pipe(coffeelint.reporter('default'))