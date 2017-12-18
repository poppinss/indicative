'use strict'

/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/*
|--------------------------------------------------------------------------
| QUnit runner
|--------------------------------------------------------------------------
|
| Karma sauce launcher sucks badly. Qunit is simple and we just need it
| to make sure that we are bundling anything that will break on different
| browsers.
|
| This file will bundle `test/qunit/*.spec.js` files and run them using
| the Qunit runner.
|
*/

const path = require('path')
const rollup = require('rollup')
const sauceLabs = require('./sauceLabs')
const chalk = require('chalk')
const ngrok = require('ngrok')
const opn = require('opn')

/**
 * The browsers on which to run tests
 *
 * @type {Array}
 */
const browsers = [
  ['Windows 7', 'chrome', 'latest'],
  ['Windows 7', 'firefox', 'latest'],
  ['OS X 10.11', 'safari', 'latest'],
  ['Windows 8', 'internet explorer', '10'],
  ['Windows 8.1', 'internet explorer', '11'],
  ['Windows 10', 'MicrosoftEdge', 'latest']
]

/**
 * A simple template to be used for running qunit tests, the
 * build code will be injected
 *
 * @method qUnitTemplate
 *
 * @param  {String}      code
 *
 * @return {String}
 */
const qUnitTemplate = function (code) {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
      <link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-2.4.1.css">
      <script src="https://code.jquery.com/qunit/qunit-2.4.1.js"></script>
      <script type="text/javascript">
        ${code}
      </script>
    </head>
    <body>
      <div id="qunit"></div>
    </body>
  </html>`
}

/**
 * Start of the process
 *
 * @method start
 */
async function start () {
  let exitCode = 0
  const port = process.env.PORT || 3000
  console.log(chalk`{magenta creating app bundle}`)

  /**
   * Creating rollup bundle by bundling `test/qunit/index.js` file.
   */
  const bundle = await rollup.rollup({
    input: path.join(__dirname, '../test', 'qunit', 'index'),
    plugins: require('../rollupPlugins')
  })

  const { code } = await bundle.generate({
    file: path.join(__dirname, '../tmp', 'qunit.js'),
    format: 'umd',
    name: 'indicativeSpec'
  })

  const server = await sauceLabs.serve(qUnitTemplate(code), port)
  console.log(chalk`started app server on {green http://localhost:${port}}`)

  /**
   * Starting the HTTP server. If `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY`
   * env variables exists, we will run tests on sauce, otherwise
   * we will run them on user machine.
   */
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log(chalk`{yellow pass SAUCE_USERNAME & SAUCE_ACCESS_KEY to run tests on saucelabs}`)
    opn(`http://localhost:${port}`)
    return
  }

  try {
    /**
     * Ngrok url
     */
    const publicUrl = await sauceLabs.getPublicUrl(port)
    console.log(chalk`started ngrok tunnel on {green ${publicUrl}}`)

    /**
     * Creating jobs with sauce labs
     */
    const jobs = await sauceLabs.createTestsJob(browsers, publicUrl)
    console.log(chalk`created {green ${jobs.length} jobs}`)

    /**
     * Monitoring jobs for results
     */
    console.log(chalk`{magenta monitoring jobs}`)
    const results = await sauceLabs.getJobsResult(jobs)

    /**
     * Got some results
     */
    results.forEach((result) => {
      console.log('')
      console.log(chalk`{bold ${result.platform.join(' ')}}`)
      console.log(chalk`  {green Passed ${result.result.passed}}`)
      console.log(chalk`  {red Failed ${result.result.failed}}`)
      console.log(`  Total ${result.result.total}`)
    })

    /**
     * Creating a new build to be annotated
     */
    const buildId = `build-${new Date().getTime()}`

    console.log('annotating jobs result')
    for (let result of results) {
      await sauceLabs.annotateJob(result.job_id, buildId, result.result.failed === 0)
    }
    console.log(chalk`{green done}`)
  } catch (error) {
    console.log(chalk`  {red Reaceived error}`)
    console.log(error)
    exitCode = 1
  }

  /**
   * Cleanup
   */
  ngrok.kill()
  server.close()
  process.exit(exitCode)
}

start()
