const ejs      = require('ejs')
const fs       = require('fs')
const minify   = require('html-minifier').minify
const notify   = require('osx-notifier')
const filesize = require('filesize')
const sass     = require('node-sass')
const shuffle  = (a) => {
  // http://stackoverflow.com/a/6274381
  for (let i = a.length; i; i-= 1) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

Promise.all([importItems(), buildCSS(), buildJS()])
  .then(([items, css, js]) => {
    buildHTML(items, css, js).then(sendNotification).then(() => console.log('Built.'))
  })

function importItems() {
  return new Promise((resolve, reject) => {
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
    resolve(models)
  })
}

function buildCSS() {
  return new Promise((resolve, reject) => {
    const css = sass.render({
      file: 'src/sass/main.scss',
    }, (error, result) => {
      if (error) {
        console.error(error.message)
        process.exit(1)
      }
      resolve(result.css.toString())
    })
  })
}

function buildJS() {
  return new Promise((resolve, reject) => {
    fs.readFile('src/js/scripts.js', 'utf8', (error, data) => {
      resolve(data)
    })
  })
}

function buildHTML(items, css, js) {
  return new Promise((resolve, reject) => {
    const indexTemplate = fs.readFileSync('src/ejs/main.ejs', 'utf8')
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
      minifyJS                   : true,
      removeAttributeQuotes      : false,
      removeComments             : true,
      removeEmptyAttributes      : true,
      removeScriptTypeAttributes : true,
      useShortDoctype            : true,
    })
    fs.writeFileSync('index.html', minifiedHTML, 'utf8')
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
