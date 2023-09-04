import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import  { styled } from 'styled-components'
import Home from "../../components/home/Home";

function HomePages(){

  return <ContinerHomePage>
    <BackGroundGlobal imgBackGround="https://gacetamedica.com/wp-content/uploads/2021/10/GettyImages-1201500582.jpg"></BackGroundGlobal>
    <Home></Home>
  </ContinerHomePage>
}


const ContinerHomePage = styled.div`
  width: 100%;
  height: 100vh;
  /* margin-top: calc(100vh * (0.1)) */;

`

export default HomePages;