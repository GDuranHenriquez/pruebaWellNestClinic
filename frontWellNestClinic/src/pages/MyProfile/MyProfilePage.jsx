import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import  { styled } from 'styled-components';
import MyProfileComp from "../../components/MyProfileComp/MyProfileComp";


function MyProfilePage(){

  return <ContinerHomePage>
    <BackGroundGlobal imgBackGround="https://gacetamedica.com/wp-content/uploads/2021/10/GettyImages-1201500582.jpg"></BackGroundGlobal>
    <MyProfileComp/>
   </ContinerHomePage>
}


const ContinerHomePage = styled.div`
  width: 100%;
  height: 100vh;
  /* margin-top: calc(100vh * (0.1)) */;

`

export default MyProfilePage;