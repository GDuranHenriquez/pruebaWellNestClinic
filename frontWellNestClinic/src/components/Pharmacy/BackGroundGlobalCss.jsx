import styled from 'styled-components'

export const BackgrounContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10;
  background-color:#f1f0f0 ;
  
  img{
    object-fit: cover;
    width: 100%;
    height: 100%;
    /* filter: brightness(70%); */
    background-color:#f1f0f0 ;
  }
`