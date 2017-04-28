const crypto   = require('crypto')
const ejs      = require('ejs')
const fs       = require('fs-extra')
const minify   = require('html-minifier').minify
const notify   = require('osx-notifier')
const filesize = require('filesize')
const sass     = require('node-sass')
const webpack  = require('webpack')

const webpackConfig = require('./src/webpack.config.js')

prepareDist().then(() => {
  Promise.all([buildDatabase(), buildCSS(), buildJS(), copyImages(), copySpinners()])
    .then(([items, css, js]) => {
      buildHTML(items, css, js).then(sendNotification).then(() => process.exit(0))
    })
})

function prepareDist() {
  console.log('Cleaning dist')
  return new Promise((resolve, reject) => {
    fs.emptyDir('dist', (error) => {
      error ? reject(error) : resolve()
    })
  })
}

function copyImages() {
  console.log('Copying images')
  return new Promise((resolve, reject) => {
    fs.copy('src/images', 'dist/images', (error) => {
      error ? reject(error) : resolve()
    })
  })
}

function copySpinners() {
  console.log('Copying spinner images')
  return new Promise((resolve, reject) => {
    fs.copy('spinners/images', 'dist/images/spinners', (error) => {
      error ? reject(error) : resolve()
    })
  })
}

function buildCSS() {
  console.log('Building CSS')
  return new Promise((resolve, reject) => {
    const css = sass.render({
      file: 'src/sass/main.scss',
    }, (error, result) => {
      if (error) {
        console.error(error.message)
        process.exit(1)
      }
      const css = result.css.toString()
      const filename = 'styles.' + crypto.createHash('md5').update(css).digest('hex') + '.css'
      fs.writeFile('dist/' + filename, css, (error) => {
        if (error) {
          console.error(error.message)
          process.exit(1)
        }
        resolve(filename)
      })
    })
  })
}

function buildJS() {
  console.log('Building JS')
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (error, stats) => {
      if (error) {
        console.error(error.message)
        process.exit(1)
      }
      resolve(stats.toJson().assets[0].name)
    });
  })
}

function shuffle(a) {
  // http://stackoverflow.com/a/6274381
  for (let i = a.length; i; i-= 1) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

function buildDatabase(files) {
  console.log('Building database')
  return new Promise((resolve, reject) => {
    const brands = JSON.parse(fs.readFileSync('spinners/spinners.json', 'utf8'))
    const models = []
    for(const brandID in brands) {
      const brand = brands[brandID]
      brand.models.map((model) => {
        model.brand = {
          id   : brandID,
          name : brand.name,
          url  : brand.url,
        }
        model.images = {
          full    : 'images/spinners/' + brandID + '/' + model.file,
          thumb   : 'images/spinners/' + brandID + '/' + model.file.replace('.jpg', '_thumb.jpg'),
          thumb2x : 'images/spinners/' + brandID + '/' + model.file.replace('.jpg', '_thumb@2x.jpg'),
        }
        models.push(model)
      })
    }
    models.sort((a, b) => {
      if (a.added === b.added) {
        return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)
      }
      return a.added < b.added ? 1 : (a.added > b.added ? -1 : 0)
    })
    resolve(models)
  })
}

function buildHTML(items, css, js) {
  console.log('Building HTML')
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
