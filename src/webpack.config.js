const path = require('path')

module.exports = {
  mode   : 'production',
  entry  : path.join(__dirname, 'js', 'main.js'),
  output : {
    path          : path.join(__dirname, '..', 'dist'),
    filename      : 'scripts.[hash].js',
    library       : 'App',
    libraryTarget : 'var',
  },
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
