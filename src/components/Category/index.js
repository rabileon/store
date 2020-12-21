import React from 'react'
import { Link, Image } from './styles'

const DEFAULT_IMAGE = 'https://i.imgur.com/KJTnnwU.png'

export const Category = ({ cover = DEFAULT_IMAGE, path = '#', name}) => (
  <Link to={path}>
    <Image src={cover} />
    {name}
  </Link>
)