import { useState } from 'react'
import styled from 'styled-components'
import astroLogo from './img/astro-logo.png'

const HeaderAstro = styled.header`
background-color: #F8B552;
height: 110px;
display: flex;
align-items: center;
justify-content: space-between;
font-family: Arial, Helvetica, sans-serif;
font-style: normal;

.title-astro {
  font-weight: 700;
  font-size: 2rem;
  color: #FFFFFF;
}

.img-astro {
  width: 4rem;
}

.img-title{
  display: flex;
  align-items: flex-end;
  margin: 10px;
}

.button-astro{
  width: 9vw;
  height: 44px;
  background: #F0940A;
  border-radius: 50px;
  color: white;
  border: none;
  font-weight: 550;
  font-size: 1.4rem;
  margin-right: 20px;
}
.button-astro:hover{
  background-color: white;
  color: #F0940A;
  transition: 600ms;
  cursor: pointer;
}
`

function Header(props) {

  return(
    <HeaderAstro>
      <section  className='img-title'>
      <img className='img-astro' src={astroLogo} />
        <h1 className='title-astro'>AstroMatch</h1>
        </section>
        {props.currentPage === "profile"
          ?<button className='button-astro btn-animated' onClick={() => props.goToMatch()}>Matches</button>
          :<button className='button-astro btn-animated' onClick={() => props.goToProfile()}>Perfis</button>
          }
          
        
    </HeaderAstro>
  )
}

export default Header