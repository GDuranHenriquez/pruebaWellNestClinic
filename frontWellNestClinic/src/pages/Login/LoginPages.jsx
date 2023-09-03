import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal"
import Login from "../../components/Login/Login";
import  { styled } from 'styled-components'

function LoginPages(){
  return(<ContinerLoginPage>
    <BackGroundGlobal imgBackGround = 'https://d1odllitvcy39q.cloudfront.net/images/141_nueva-fachada-seguro-americano-2014.jpg'></BackGroundGlobal>
    <Login></Login>
  </ContinerLoginPage>)
}

const ContinerLoginPage = styled.div`
  width: 100%;
  height: 100vh;
  /* margin-top: calc(100vh * (0.1)) */;

`

export default LoginPages;