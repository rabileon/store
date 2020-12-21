import React from 'react'
import { PhotoCard } from '../PhotoCard'

export const ListOfPhotoCardsComponent = ({ data: { products = [] } } = {}) => {
  return (
    <ul>
      {products.map(product => <PhotoCard key={product.id} {...product} />)}
    </ul>
  )
}