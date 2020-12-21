const db = require('../adapter')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')
const bcrypt = require('bcrypt')


function addFav ({ id, productId }) {
  db.get('users').find({ id }).update('favs', favs => [...favs, productId]).write()
}

function removeFav ({ id, productId }) {
  db.get('users').find({ id }).update('favs', favs => favs.filter(fav => fav !== productId)).write()
}

function hasFav ({ id, productId }) {
  const user = db.get('users').find({ id }).value()
  const hasFav = user.favs.includes(productId)
  return hasFav
}

async function create ({ email, password }) {
  const avatarHash = crypto.createHash('md5').update(email).digest("hex")
  const avatar = `https://gravatar.com/avatar/${avatarHash}`

  // Create a user
  const user = {
    id: uuidv1(), // with a unique user id
    password: await bcrypt.hash(password, 10), // with the encrypted password
    favs: [],
    avatar,
    email
  }

  // Write in db.json
  db.get('users')
    .push(user)
    .write()

  return user;
}

function find ({ email }) {
  return db.get('users')
  .find({ email })
  .value()
}

module.exports = { create, addFav, hasFav, removeFav, find }