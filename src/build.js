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
shuffle(models)

// http://stackoverflow.com/a/6274381
const shuffle = (a) => {
  for (let i = a.length; i; i-= 1) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
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
  removeAttributeQuotes      : false,
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
