import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import  { styled } from 'styled-components'
import SignUpComponent from "../../components/SignUp/SignUp";


function SignUp(){

  return <ContinerHomePage>
    <BackGroundGlobal imgBackGround='https://d1odllitvcy39q.cloudfront.net/images/141_nueva-fachada-seguro-americano-2014.jpg'></BackGroundGlobal>
    <SignUpComponent/>
  </ContinerHomePage>
}


const ContinerHomePage = styled.div`
  width: 100%;
  height: 100vh;
  /* margin-top: calc(100vh * (0.1)) */;

`

export default SignUp;