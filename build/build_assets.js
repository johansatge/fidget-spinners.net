const ejs      = require('ejs')
const fs       = require('fs')
const minify   = require('html-minifier').minify
const sass     = require('node-sass')
const webpack  = require('webpack')

const webpackConfig = require('../src/webpack.config.js')

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
    webpack(webpackConfig, (error, stats) => {
      if (error) {
        console.error(error.message)
        process.exit(1)
      }
      fs.readFile('src/js/main.bundle.js', 'utf8', (error, data) => {
        resolve(data)
      })
    });
  })
}

module.exports = {
  buildCSS : buildCSS,
  buildJS  : buildJS,
}
