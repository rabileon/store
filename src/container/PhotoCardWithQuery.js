import React from 'react'
import { PhotoCard } from '../components/PhotoCard'

import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const GET_SINGLE_PRODUCT = gql`
query getSingleProduct($id:ID!) {
  product(id:$id) {
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

const renderProp = ({ loading, error, data }) => {
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  const { product = {} } = data
  return <PhotoCard {...product} />
}

export const PhotoCardWithQuery = ({ id }) => (
  <Query query={GET_SINGLE_PRODUCT} variables={{ id }}>
    {renderProp}
  </Query>
)