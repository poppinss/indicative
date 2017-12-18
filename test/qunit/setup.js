import 'regenerator-runtime/runtime.js'
import Promise from 'promise-polyfill'

if (!window.Promise) {
  window.Promise = Promise
}

/**
 * Copy pasted this from Qunit grunt plugin. It just adds
 * the Qunit tests stats in the window global, which is
 * used by Sauce labs to determine, whether tests
 * are passing or not.
 */
(function () {
  var log = []
  QUnit.done(function (testsResults) {
    var tests = []
    for (var i = 0, len = log.length; i < len; i++) {
      var details = log[i]
      tests.push({
        name: details.name,
        result: details.result,
        expected: details.expected,
        actual: details.actual,
        source: details.source
      })
    }
    testsResults.tests = tests
    window.global_test_results = testsResults
  })

  /**
   * Pushing test logs to log var.
   */
  QUnit.testStart(function (testDetails) {
    QUnit.log(function (details) {
      if (!details.result) {
        details.name = testDetails.name
        log.push(details)
      }
    })
  })
})()
