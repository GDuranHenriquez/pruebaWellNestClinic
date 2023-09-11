import style from "./pharmacyPage.module.css"
import BackGrounPharmacy from '../../components/Pharmacy/BackGrounPharmacy'
import PharmacyComp from '../../components/Pharmacy/pharmacyComp'
import Cards from "../../components/Cards/Cards"

function MyPharmacyPage(){
  return (<div className={style.MyPharmacyPage}>
    <BackGrounPharmacy></BackGrounPharmacy>
    <PharmacyComp></PharmacyComp>
    <Cards></Cards>
  </div>)
}

export default MyPharmacyPage;