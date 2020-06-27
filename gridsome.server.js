// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(async actions => {
    const KampePhotos = require('./src/data/kampe-photos.json')

    const kampePhotoCollection = actions.addCollection({
      typeName: 'KampePhotos'
    })

    for (const photo of KampePhotos) {
      photo['image'] = require.resolve('./src/assets/kampe-photos/' + photo.filename)
      photo['externalUrl'] = 'https://public-sites.s3.fr-par.scw.cloud/kampe-family/' + photo.filename
      kampePhotoCollection.addNode(photo)
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
