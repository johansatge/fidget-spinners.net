const path           = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry  : path.join(__dirname, 'js', 'main.js'),
  output : {
    path          : path.join(__dirname, '..', 'dist'),
    filename      : 'scripts.[hash].js',
    library       : 'App',
    libraryTarget : 'var',
  },
  plugins: [
    new UglifyJSPlugin(),
  ],
  module: {
    rules : [
      {
        test    : /\.jsx?$/,
        include : [
          path.join(__dirname, 'js'),
        ],
        loader  : 'babel-loader',
        options : {
          presets : ['es2015'],
        },
      },
    ],
  },
}
