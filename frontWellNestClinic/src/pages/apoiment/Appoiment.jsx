import MakeAppoiment from "../../components/makeAppoiment/makeAppoiment";
import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import style from './appoiment.module.css'

function Appoiment(){
  
  return(<div className={style.appoiment}>
    <BackGroundGlobal imgBackGround='https://d1odllitvcy39q.cloudfront.net/images/141_nueva-fachada-seguro-americano-2014.jpg'></BackGroundGlobal>
    <MakeAppoiment></MakeAppoiment>
  </div>)
}

export default Appoiment; 