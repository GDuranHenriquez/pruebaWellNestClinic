import style from "../pharmacy/pharmacyPage.module.css";
import BackGrounPharmacy from '../../components/Pharmacy/BackGrounPharmacy';
import ShoppingCartComp from '../../components/shoppingCart/ShoppingCartComp'


function ShoppingCartPage(){
  return (<div className={style.farmacia}>
    <BackGrounPharmacy></BackGrounPharmacy>
    <ShoppingCartComp/>
  </div>)
}

export default ShoppingCartPage;