import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import  { styled } from 'styled-components'
import Home from "../../components/home/Home";

function HomePages(){

  return <ContinerHomePage>
    {/* <BackGroundGlobal imgBackGround="https://wallpapers.com/images/featured/doctor-kwucobzhm0etbcwy.jpg"></BackGroundGlobal> */}
    <BackGroundGlobal imgBackGround="https://www.decisores.com/wp-content/uploads/2022/11/medico-1536x864.jpg"></BackGroundGlobal>
    <Home></Home>
  </ContinerHomePage>
}


const ContinerHomePage = styled.div`
    width: 100%;
  /* height: 100vh; */
  padding-top: calc(100vh * (0.1));

`

export default HomePages;