import styled from 'styled-components'
import { Link as LinkRouter } from '@reach/router'

export const Link = styled(LinkRouter)`
  display: flex;
  flex-direction: column;
  text-align: center;
  text-decoration: none;
  width: 75px;
  margin: 20px 0px;
  color: black;
  
`

export const Image = styled.img`
  border: 1px solid #ddd;
  box-shadow: 0px 10px 14px rgba(0, 0, 0, .2);
  border-radius: 15%;
  height: auto;
  overflow: hidden;
  object-fit: cover;
  height: 75px;
  width: 75px;
  

`
