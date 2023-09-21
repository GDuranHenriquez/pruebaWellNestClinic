import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import  { styled } from 'styled-components'
import Home from "../../components/home/Home";
import AboutUs from "../../components/AboutUs/AboutUs";

function AboutPage(){

  return <ContinerHomePage>
    {/* <BackGroundGlobal imgBackGround="https://wallpapers.com/images/featured/doctor-kwucobzhm0etbcwy.jpg"></BackGroundGlobal> */}
    <BackGroundGlobal imgBackGround="https://res-3.cloudinary.com/the-university-of-melbourne/image/upload/s--XBshXWu0--/c_fill,f_auto,h_630,q_75,w_1200/v1/pursuit-uploads/4a3/d1a/39b/4a3d1a39b03e923e6b0920d6902d90c8a865b2f6655f76ef844282979ac2.jpg"></BackGroundGlobal>
    <AboutUs></AboutUs>
  </ContinerHomePage>
}


const ContinerHomePage = styled.div`
    width: 100%;
  /* height: 100vh; */
  padding-top: calc(100vh * (0.08));

`

export default AboutPage;