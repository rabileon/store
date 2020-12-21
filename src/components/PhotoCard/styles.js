import styled from 'styled-components'
import { fadeIn } from '../../styles/animation'

export const Article = styled.article`
  min-height: 480px;
  
  .detail_buy{
    display: flex;
    justify-content:space-around;
    margin-top: 10px;
  }
  .detal__price_info{
    display:flex;
 
    align-items: center;
    font-size: 20px;
    font-weight: bold;
  }

  .detail__btn_buy{
    font-size: 20px;
    display:flex;
    padding:0px 20px;
    border: 2px solid;
    border-radius:5px;
    align-items: center;
    
  }
`

export const ImgWrapper = styled.div`
  border-radius: 20px;
  display: block;
  height: 0;
  overflow: hidden;
  padding: 80% 0 0 0;
  position: relative;
  width: 100%; 
 
`

export const Img = styled.img`
  ${fadeIn()}
  box-shadow: 0 40px 50px #000000;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
`

export const Button = styled.button`
  display: flex;

  align-items: center;
  padding-top: 8px;
  & svg {
    margin-right: 4px;
  }
`