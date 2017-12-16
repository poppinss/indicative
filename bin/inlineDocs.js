const klaw = require('klaw')
const path = require('path')
const fs = require('fs')

function readSourceFiles () {
  return new Promise((resolve, reject) => {
    const fns = []
    klaw(path.join(__dirname, '../src/validations'))
    .on('data', (item) => {
      if (!item.path.endsWith('index.js') && !item.stats.isDirectory()) {
        fns.push(item.path)
      }
    })
    .on('end', () => resolve(fns))
    .on('error', reject)
  })
}

function extractComments (files) {
  return files.map((file) => {
    let context = 'idle'
    const lines = []
    fs.readFileSync(file, 'utf-8').split('\n').forEach((line) => {
      if (line.trim() === '/**') {
        context = 'in'
        return
      }

      if (line.trim() === '*/') {
        context = 'out'
        return
      }

      if (context === 'in') {
        lines.push(line.replace(/\*/g, '').replace(/^\s\s/, ''))
      }
    })
    return { file, comment: lines.join('\n') }
  })
}

function generateDocFiles (commentsMap) {
  commentsMap.forEach((item) => {
    const fileName = path.basename(item.file).replace('.js', '')
    fs.writeFileSync(path.join(__dirname, '../docs/validations/', `${fileName}.adoc`), item.comment)
  })
}

readSourceFiles()
.then((files) => {
  generateDocFiles(extractComments(files))
}).catch(console.error)
