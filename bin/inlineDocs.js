const klaw = require('klaw')
const path = require('path')
const fs = require('fs-extra')

const docsFor = ['validations', 'sanitizations']
const srcPath = path.join(__dirname, '..', 'src')
const docsDir = path.join(__dirname, '..', 'static', 'content')

/**
 * Returns front matter for doc file
 *
 * @method getMatter
 *
 * @param  {String}  permalink
 * @param  {String}  category
 *
 * @return {Array}
 */
function getMatter (permalink, category) {
  return [
    '---',
    `permalink: ${permalink}`,
    `title: ${permalink}`,
    `category: ${category}`,
    '---',
    ''
  ]
}

function getRuleImport (rule) {
  return [
    'For customized build, you can import this rule as follows.',
    '[source, js]',
    '----',
    `import { ${rule} } from 'indicative/builds/validations'`,
    '----'
  ]
}

/**
 * Walks over a location and reads all .js files
 *
 * @method getFiles
 *
 * @param  {String} location
 * @param  {Function} filterFn
 *
 * @return {Array}
 */
function getFiles (location, filterFn) {
  return new Promise((resolve, reject) => {
    const files = []
    klaw(location)
    .on('data', (item) => {
      if (!item.stats.isDirectory() && filterFn(item)) {
        files.push(item.path)
      }
    })
    .on('end', () => resolve(files))
    .on('error', reject)
  })
}

/**
 * Returns an array of files in parallel
 *
 * @method readFiles
 *
 * @param  {Array}  locations
 *
 * @return {Array}
 */
async function readFiles (locations) {
  return Promise.all(locations.map((location) => {
    return fs.readFile(location, 'utf-8')
  }))
}

/**
 * Extract comments from the top of the file. Also this method
 * assumes, each block of content has only one top of comments
 * section.
 *
 * @method extractComments
 *
 * @param  {String}        contents
 *
 * @return {String}
 */
function extractComments (contents) {
  let context = 'idle'
  const lines = []
  contents.split('\n').forEach((line) => {
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
  return lines.join('\n')
}

/**
 * Writes all docs to their respective files
 *
 * @method writeDocs
 *
 * @param  {String}  basePath
 * @param  {Array}  nodes
 *
 * @return {void}
 */
async function writeDocs (basePath, nodes) {
  Promise.all(nodes.map((node) => {
    const location = path.join(basePath, node.location.replace(srcPath, '').replace(/\.js$/, '.adoc'))
    return fs.outputFile(location, node.comments)
  }))
}

/**
 * Converts all source files inside a directory to `.adoc`
 * files inside docs directory
 *
 * @method srcToDocs
 *
 * @param  {String}  dir
 *
 * @return {void}
 */
async function srcToDocs (dir) {
  const location = path.join(srcPath, dir)
  const srcFiles = await getFiles(location, (item) => item.path.endsWith('.js') && !item.path.endsWith('index.js'))
  const filesContents = await readFiles(srcFiles)
  const filesComments = srcFiles.map((location, index) => {
    const fnName = path.basename(location).replace(/\.js$/, '')
    const matter = getMatter(fnName, dir)
    const doc = matter.concat(extractComments(filesContents[index])).concat(getRuleImport(fnName))
    return { comments: doc.join('\n'), location }
  })
  await writeDocs(docsDir, filesComments)
}

Promise
  .all(docsFor.map((dir) => srcToDocs(dir)))
  .then(() => {
    console.log(`Generated docs inside ${docsDir}`)
  })
  .catch(console.error)
