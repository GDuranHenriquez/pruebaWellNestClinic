import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '../../../Authenticator/AuthPro';
import style from './CartSaleComp.module.css';
import { useModal } from "../../../utils/useModal";
import PreviewModal from '../PreviewModal';

function CartSale({ sale }) {
  const isAuth = useAuth();
  const dispatch = useDispatch();
  const allSale = useSelector((state) => state.allSale);
  const [prodImg, setProdImg] = useState("");
  const [timerId, setTimerId] = useState(null);



  return (
    <>
      <li key={sale.id} className={style.liOrdes}>
        <div  className={style.containerCard}>
          <div className={style.containerInfoSale}>
            <p className={style.name}>Total amount: {sale.price}</p>
            <p className={style.name}>Discount:  {Number(sale.discount)*100}%</p>
            <p className={style.name}>Date: {sale.date}</p>
          </div>
          <div className={style.containerProducts}>
            {sale.Sale_DetailSale.map((detail, index) => 
              <DetailProduc key={index} prod={detail}></DetailProduc>
            )}
          </div>         
        </div>
      </li>
    </>
  );
}

function DetailProduc({prod}){
  const [isOpenModal, openModal, closeModal] = useModal(false);


  return(
    <div className={style.detailProductContainer}>
      <div className={style.imgProduct}>
        <img id={style.imgProduct}src={prod.DetailSale_Product.imageUrl} alt="imgProduct" />
      </div>

      <div className={style.detailProduct}>
        <p className={style.name}>Name: {prod.DetailSale_Product.name}</p>
        <p className={style.name}>Product Price: ${prod.price} /u</p>
        <p className={style.name}>Purchased Items: {prod.amount}</p>
      </div>
      <button name='review' className={style.btnReview} onClick={openModal}>Review</button>
      <PreviewModal isOpen={isOpenModal} closeModal={closeModal} id={prod.DetailSale_Product.id}></PreviewModal>      
    </div>
  )
}

export default CartSale;