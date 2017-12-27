'use strict'

const { spawn } = require('child_process')

function runTest () {
  const tests = spawn('npm', ['run', 'test:all'], { env: Object.assign(process.env, { FORCE_COLOR: true }) })
  tests.stdout.on('data', (data) => (process.stdout.write(data)))
  tests.stderr.on('data', (data) => (process.stderr.write(data)))
  tests.on('exit', (code) => (process.exit(code)))
}

if ('TRAVIS' in process.env && 'CI' in process.env) {
  const downloadPuppeteer = spawn('npm', ['install', 'puppeteer', 'ngrok'])
  downloadPuppeteer.stdout.on('data', (data) => (process.stdout.write(data)))
  downloadPuppeteer.stderr.on('data', (data) => (process.stderr.write(data)))
  downloadPuppeteer.on('exit', (code) => {
    if (code === 0) {
      runTest()
      return
    }
    process.exit(code)
  })
} else {
  runTest()
}
