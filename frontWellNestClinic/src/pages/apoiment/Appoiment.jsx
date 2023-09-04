import MakeAppoiment from "../../components/makeAppoiment/makeAppoiment";
import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import style from './appoiment.module.css'

function Appoiment(){
  
  return(<div className={style.appoiment}>
    <BackGroundGlobal imgBackGround="https://gacetamedica.com/wp-content/uploads/2021/10/GettyImages-1201500582.jpg"></BackGroundGlobal>
    <MakeAppoiment></MakeAppoiment>
  </div>)
}

export default Appoiment; 