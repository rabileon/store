import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

const GET_PRODUCTS = gql`
query getProducts($categoryId: ID) {
  products(categoryId: $categoryId) {
    id
    categoryId
    src
    likes
    userId
    price
    liked
  }
}
`

export const withPhotos = graphql(GET_PRODUCTS)