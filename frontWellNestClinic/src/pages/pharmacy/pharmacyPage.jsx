import style from "./pharmacyPage.module.css"
import BackGroundGlobal from '../../components/Pharmacy/pharmacyComp'
import PharmacyComp from '../../components/Pharmacy/pharmacyComp'


function MyPharmacyPage(){
  return (<div className={style.farmacia}>
    <BackGroundGlobal imgBackGround="https://i.pinimg.com/474x/f6/46/81/f64681ae17370c0c383b19a7f74e1f98.jpg"></BackGroundGlobal>
    {/* <PharmacyComp></PharmacyComp> */}
  </div>)
}

export default MyPharmacyPage;