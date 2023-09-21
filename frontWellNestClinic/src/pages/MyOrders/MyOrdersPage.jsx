import style from "../pharmacy/pharmacyPage.module.css";
import BackGrounPharmacy from '../../components/Pharmacy/BackGrounPharmacy';
import MyOrdersComp from '../../components/MyOrders/MyOrdersComp';
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from 'react';
import { useAuth } from "../../Authenticator/AuthPro";
import { getSale } from "../../redux/action/actions"; 


function MyOrdersPage(){

  const [isLoading, setIsLoading] = useState(true);
  /* const allSale = useSelector((state) => state.allSale); */
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    setIsLoading(true);
    //dispatch(getAllProducts())
    dispatch(getSale(auth.user.id)).then((data) => {
      setIsLoading(false);
    });
    
  }, []);
  

  return (<div className={style.MyPharmacyPage}>
    <BackGrounPharmacy></BackGrounPharmacy>
    {isLoading && <Loading></Loading>}
    {!isLoading && <MyOrdersComp/>}  
  </div>
  )
}

export default MyOrdersPage;