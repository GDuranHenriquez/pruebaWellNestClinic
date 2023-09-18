import style from "./pharmacyPage.module.css"
import BackGrounPharmacy from '../../components/Pharmacy/BackGrounPharmacy'
import PharmacyComp from '../../components/Pharmacy/pharmacyComp'
import Cards from "../../components/Cards/Cards"
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux' 
import { getCart } from '../../redux/action/actions'
import { useAuth } from "../../Authenticator/AuthPro";


function MyPharmacyPage(){
  const dispatch = useDispatch();
  const isAuth = useAuth();
  const user = isAuth. user;

  useEffect(() => {
    dispatch(getCart(user.id));
  },[])

  return (<div className={style.MyPharmacyPage}>
    <BackGrounPharmacy></BackGrounPharmacy>
    <PharmacyComp></PharmacyComp>
    <Paginado></Paginado>
    <Cards></Cards>
  </div>)
}

export default MyPharmacyPage;