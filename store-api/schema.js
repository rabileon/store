const userModel = require('./models/userModel')
const categoriesModel = require('./models/categoriesModel')
const productsModel = require('./models/productsModel')
const { gql } = require('apollo-server-express')
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const typeDefs = gql`
  type User {
    id: ID
    avatar: String
    name: String
    email: String
    isPremium: Boolean
  }

  type Product {
    id: ID
    categoryId: Int
    src: String
    likes: Int
    price: Float
    liked: Boolean
    userId: ID
    
  }

  type Category {
    id: ID
    cover: String
    name: String
    path: String
  }

  type Query {
    favs: [Product]
    categories: [Category]
    products(categoryId: ID): [Product],
    product(id: ID!): Product
  }

  input LikeProduct {
    id: ID!
  }

  input UserCredentials {
    email: String!
    password: String!
  }

  type Mutation {
    likeAnonymousProduct (input: LikeProduct!): Product
    likeProduct (input: LikeProduct!): Product
    signup (input: UserCredentials!): String
    login (input: UserCredentials!): String
  }
`

function checkIsUserLogged (context) {
  const {email, id} = context
  // check if the user is logged
  if (!id) throw new Error('you must be logged in to perform this action')
  // find the user and check if it exists
  const user = userModel.find({email})
  // if user doesnt exist, throw an error
  if (!user) throw new Error('user does not exist')
  return user
}

function tryGetFavsFromUserLogged (context) {
  try {
    const {email} = checkIsUserLogged(context)
    const user = userModel.find({email})
    return user.favs
  } catch(e) {
    return []
  }
}

const resolvers = {
  Mutation: {
    likeAnonymousProduct: (_, {input}) => {
      // find the product by id and throw an error if it doesn't exist
      const {id: productId} = input
      const product = productsModel.find({ id: productId })
      if (!product) {
        throw new Error(`Couldn't find product with id ${productId}`)
      }
      // put a like to the product
      productsModel.addLike({ id: productId })
      // get the updated products model
      const actualProduct = productsModel.find({ id: productId })
      return actualProduct
    },
    likeProduct: (_, { input }, context) => {
      const { id: userId } = checkIsUserLogged(context)

      // find the product by id and throw an error if it doesn't exist
      const {id: productId} = input
      const product = productsModel.find({ id: productId })
      if (!product) {
        throw new Error(`Couldn't find product with id ${productId}`)
      }

      const hasFav = userModel.hasFav({ id: userId, productId })

      if (hasFav) {
        productsModel.removeLike({ id: productId })
        userModel.removeFav({ id: userId, productId, })
      } else {
        // put a like to the product and add the like to the user database
        productsModel.addLike({ id: productId })
        userModel.addFav({ id: userId, productId, })
      }

      // get favs from user before exiting
      const favs = tryGetFavsFromUserLogged(context)
      // get the updated products model
      const actualProduct = productsModel.find({ id: productId, favs })

      return actualProduct
    },
    // Handle user signup
    async signup (_, { input }) {
      // add 1 second of delay in order to see loading stuff
      await new Promise(resolve => setTimeout(resolve, 1000))

      const {email, password} = input

      const user = await userModel.find({ email })

      if (user) {
        throw new Error('User already exists')
      }

      const newUser = await userModel.create({
        email,
        password
      })

      // return json web token
      return jsonwebtoken.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1y' }
      )
    },

    // Handles user login
    async login (_, { input }) {
      // add 1 second of delay in order to see loading stuff
      await new Promise(resolve => setTimeout(resolve, 1000))

      const { email, password } = input
      const user = await userModel.find({ email })

      if (!user) {
        throw new Error('No user with that email')
      }

      const valid = await bcrypt.compare(password, user.password)
   
      if (!valid) {
        throw new Error('Incorrect password')
      }

      // return json web token
      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      )
    }
  },
  Query: {
    
    favs(_, __, context) {
      const {email} = checkIsUserLogged(context)
      const {favs} = userModel.find({email})
      return productsModel.list({ ids: favs, favs })
    },
    categories() {
      return categoriesModel.list()
    },
    product(_, {id}, context) {
      const favs = tryGetFavsFromUserLogged(context)
      return productsModel.find({id, favs})
    },
    products(_, {categoryId}, context) {
      const favs = tryGetFavsFromUserLogged(context)
      return productsModel.list({categoryId, favs})
    }
  }
}

module.exports = { typeDefs, resolvers }