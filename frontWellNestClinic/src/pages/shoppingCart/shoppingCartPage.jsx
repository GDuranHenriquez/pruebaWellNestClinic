import style from "../pharmacy/pharmacyPage.module.css";
import BackGrounPharmacy from '../../components/Pharmacy/BackGrounPharmacy';
import ShoppingCartComp from '../../components/shoppingCart/ShoppingCartComp';
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from 'react';
import { useAuth } from "../../Authenticator/AuthPro";
import { getCart, getAllProducts } from "../../redux/action/actions"; 


function ShoppingCartPage(){
  const [isLoading, setIsLoading] = useState(true);
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  const auth = useAuth();
  

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllProducts())
    dispatch(getCart(auth.user.id)).then((data) => {
      setIsLoading(false);
    });
  }, []);

  return (<div className={style.MyPharmacyPage}>
    <BackGrounPharmacy></BackGrounPharmacy>
    {isLoading && <Loading></Loading>}
    {Object.keys(cartItems).length > 0? <ShoppingCartComp/>:''}
  </div>)
}

export default ShoppingCartPage;