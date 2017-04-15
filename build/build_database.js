const fs      = require('fs')
const shuffle = (a) => {
  // http://stackoverflow.com/a/6274381
  for (let i = a.length; i; i-= 1) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

function buildDatabase(files) {
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

module.exports = {
  buildDatabase : buildDatabase,
}
