import style from "../pharmacy/pharmacyPage.module.css";
import BackGrounPharmacy from '../../components/Pharmacy/BackGrounPharmacy';
import MyOrdersComp from '../../components/MyOrders/MyOrdersComp';


function MyOrdersPage(){
  return (<div className={style.MyPharmacyPage}>
    <BackGrounPharmacy></BackGrounPharmacy>
    <MyOrdersComp/>
  </div>)
}

export default MyOrdersPage;