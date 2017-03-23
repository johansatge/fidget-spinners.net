const ejs = require('ejs')
const fs = require('fs')
const minify = require('html-minifier').minify
const notify = require('osx-notifier')
const filesize = require('filesize')

const brands = JSON.parse(fs.readFileSync('src/json/spinners.json', 'utf8'))
const models = []
for(const brandID in brands) {
  const brand = brands[brandID]
  brand.models.map((model) => {
    model.brand = {
      id   : brandID,
      name : brand.name,
      url  : brand.url,
    }
    models.push(model)
  })
}

const indexTemplate = fs.readFileSync('src/ejs/main.ejs', 'utf8')
const css = fs.readFileSync('src/css/styles.css', 'utf8')
const js = fs.readFileSync('src/js/scripts.js', 'utf8')

const html = ejs.render(indexTemplate, {
  models : models,
  css    : css,
  js     : js,
})
const minifiedHTML = minify(html, {
  caseSensitive              : true,
  collapseWhitespace         : true,
  conservativeCollapse       : true,
  html5                      : true,
  minifyCSS                  : true,
  minifyJS                   : true,
  removeAttributeQuotes      : true,
  removeComments             : true,
  removeEmptyAttributes      : true,
  removeScriptTypeAttributes : true,
  useShortDoctype            : true,
})
fs.writeFileSync('public/index.html', minifiedHTML, 'utf8')

notify({
  type     : 'pass',
  title    : 'Build done',
  subtitle : 'Built index.html',
  message  : 'Size: ' + filesize(Buffer.byteLength(html, 'utf8')),
  group    : 'node',
});
