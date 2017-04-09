const ejs      = require('ejs')
const fs       = require('fs')
const minify   = require('html-minifier').minify
const notify   = require('osx-notifier')
const filesize = require('filesize')

const buildDatabase = require('./build_database.js').buildDatabase
const buildJS       = require('./build_assets.js').buildJS
const buildCSS      = require('./build_assets.js').buildCSS

Promise.all([buildDatabase(), buildCSS(), buildJS()])
  .then(([items, css, js]) => {
    buildHTML(items, css, js).then(sendNotification).then(() => process.exit(0))
  })

function buildHTML(items, css, js) {
  return new Promise((resolve, reject) => {
    const indexTemplate = fs.readFileSync('src/index.ejs', 'utf8')
    const html = ejs.render(indexTemplate, {
      items : items,
      css   : css,
      js    : js,
    })
    const minifiedHTML = minify(html, {
      caseSensitive              : true,
      collapseWhitespace         : true,
      conservativeCollapse       : true,
      html5                      : true,
      minifyCSS                  : true,
      minifyJS                   : false,
      removeAttributeQuotes      : false,
      removeComments             : true,
      removeEmptyAttributes      : true,
      removeScriptTypeAttributes : true,
      useShortDoctype            : true,
    })
    fs.writeFileSync('dist/index.html', minifiedHTML, 'utf8')
    resolve(html)
  })
}

function sendNotification(html) {
  return new Promise((resolve, reject) => {
    notify({
      type     : 'pass',
      title    : 'Build done',
      subtitle : 'Built index.html',
      message  : 'Size: ' + filesize(Buffer.byteLength(html, 'utf8')),
      group    : 'node',
    });
    resolve()
  })
}
