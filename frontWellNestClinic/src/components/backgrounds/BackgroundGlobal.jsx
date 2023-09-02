import { BackgrounContainer } from './BackGroundGlobalCss'

function BackGroundGlobal(pros){

  return <BackgrounContainer >
    <img src={pros.imgBackGround} alt="Backgroun" />
  </BackgrounContainer>

}

export default BackGroundGlobal;

