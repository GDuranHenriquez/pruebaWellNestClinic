import MySchedule from "../../components/MySchedule/MySchedule";
import style from './MySchedulePage.module.css';
import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
 

function MySchedulePage(){

  return (<div className= {style.containerMySchedulePage}>
    <BackGroundGlobal imgBackGround = {"https://gacetamedica.com/wp-content/uploads/2021/10/GettyImages-1201500582.jpg"} ></BackGroundGlobal>
    <MySchedule></MySchedule>
  </div>)
}

export default MySchedulePage;