const db = require('../adapter')

function find ({id, favs = []}) {
  const product = db.get('products').find({id: +id}).value()
  return {
    ...product,
    liked: favs.includes(id.toString())
  }
}

function addLike ({ id }) {
  return db.get('products').find({id: +id}).update('likes', likes => likes + 1).write()
}

function removeLike ({ id }) {
  return db.get('products').find({id: +id}).update('likes', likes => likes - 1).write()
}

function list ({categoryId, ids, favs = []}) {
  let products
  if (categoryId && categoryId !== 'all') {
    products = db.get('products').filter({categoryId: +categoryId}).value()
  } else if (ids) {
    products = db.get('products').filter(product => ids.includes(product.id.toString())).value()
  } else {
    products = db.get('products').value()
  }

  return products.map(product => ({
    ...product,
    liked: favs.includes(product.id.toString())
  }))
}

module.exports = { find, addLike, removeLike, list }