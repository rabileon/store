import React from 'react'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'

const LIKE_PRODUCT = gql`
mutation likeProduct($input: LikeProduct!) {
  likeProduct(input: $input) {
    id,
    liked,
    likes
  }
}
`

export const ToggleLikeMutation = ({ children }) => {
  return <Mutation mutation={LIKE_PRODUCT}>
    {children}
  </Mutation>
}