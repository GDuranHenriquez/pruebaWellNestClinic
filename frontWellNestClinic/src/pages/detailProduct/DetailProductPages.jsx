import style from "../pharmacy/pharmacyPage.module.css"
import BackGrounPharmacy from '../../components/Pharmacy/BackGrounPharmacy'
import ProductDetail from "../../components/Pharmacy/ProductDetail/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { getProductDetail } from "../../redux/action/actions";
import { useParams } from 'react-router-dom'


function DetailProductPages(){

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getProductDetail(id)).then((data) => {
      setIsLoading(false);
    });
  }, [dispatch, id]);

  return (<div className={style.MyPharmacyPage}>
    <BackGrounPharmacy></BackGrounPharmacy>
   
    {isLoading ? <Loading></Loading> : <ProductDetail></ProductDetail>}
   
  </div>)
}

export default DetailProductPages;