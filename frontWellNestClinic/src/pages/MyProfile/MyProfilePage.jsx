import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import  { styled } from 'styled-components';
import MyProfileComp from "../../components/MyProfileComp/MyProfileComp";


function MyProfilePage(){

  return <ContinerHomePage>
    <BackGroundGlobal imgBackGround='https://media.istockphoto.com/id/1301652887/es/foto/concepto-de-atenci%C3%B3n-m%C3%A9dica.webp?s=1024x1024&w=is&k=20&c=s7Kn3Gn1VPmUMLXCoZGC8xIklqSckcU07MSVp5-rW3Y='></BackGroundGlobal>
    <MyProfileComp/>
   </ContinerHomePage>
}


const ContinerHomePage = styled.div`
  width: 100%;
  height: 100vh;
  /* margin-top: calc(100vh * (0.1)) */;

`

export default MyProfilePage;