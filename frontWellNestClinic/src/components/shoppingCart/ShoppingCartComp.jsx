import { useEffect, useState } from "react";
import style from "./shoppingCartComp.module.css";
import { useModal } from "../../utils/useModal";
import CheckoutComp from "../Modales/checkout/checkoutComp";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/action/actions";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../Authenticator/AuthPro";
import PropTypes from "prop-types";

function ShoppingCartComp() {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  
  const idProductsCart = useSelector((state) => state.idProductsCart);
  const cartItems = useSelector((state) => state.cartItems);

  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [amount, setAmount] = useState(0);

  // Función para calcular el precio total de los productos seleccionados

  const navigate = useNavigate();
  const goToCheckout = () => {
    navigate("/checkout");
  };

  const calculateTotalPrice = (prd) => {
    const productPrices = prd.map(
      (product) => product.cart_product.amount * product.price
    );
    const total = productPrices.reduce((a, b) => a + b, 0);
    return total > 0 ? total : 0;
  };
  const contarItems = (idProCart) => {
    const productCount = idProCart.map((idProd) => idProd.amount);
    const total = productCount.reduce((a, b) => a + b, 0);
    return total > 0 ? total : 0;
  };

  useEffect(() => {
    if (Object.keys(cartItems.cart).length > 0) {
      setTotalPrice(calculateTotalPrice(cartItems.cart.products));
      setTotalQuantity(contarItems(idProductsCart));
    }else{
      setTotalPrice(0);
      setTotalQuantity(0);
    }
  }, [cartItems, idProductsCart]);

  const reset = () =>{
    setTotalPrice(0);
    setTotalQuantity(0);
  };
 
  return (
    <div className={style.containerCartDetail}>
      <div className={style.divLink}>
        <Link to="/pharmacy" className={style.link}>
          <button className={style.backButton}>&larr; Go back</button>
        </Link>
      </div>
      <div className={style.CartDetail}>
        <div>
          <h2>Your Cart</h2>
          <ul>
            {Object.keys(cartItems.cart).length > 0
              ? cartItems.cart.products.map((item) => (
                  <CartItems key={item.id} prod={item}></CartItems>
                ))
              : ""}
          </ul>
        </div>
        <CheckoutComp isOpen={isOpenModal} closeModal={closeModal} reset = {reset}/>
      </div>
      <div className={style.TotalDetail}>
        <h2 className={style.resumen}>Order Summary</h2>
        <div className={style.infoContainer}>
          <div className={style.infoDiv}>
            <p className={style.info2}>Products:</p>
            <p>{totalQuantity}</p>
          </div>
          <div className={style.infoDiv}>
          <p className={style.info2}>Subtotal: </p>
          <p>${totalPrice}</p>
         </div>
         <div className={style.infoDiv}>
         <p className={style.info2}>  Discount: </p>
         <p>${totalPrice - cartItems.discountedPrice}{" "}
          </p>
          </div>

        </div>
        <hr />
        <div className={style.infoDivTotal}>
        <p className={style.totalPrice}>Total:</p>
        <p className={style.totalPrice}>${cartItems.discountedPrice}</p>
        </div>

        <button
          className={style.buttonCheckout}
          onClick={openModal}
          disabled={totalPrice > 0 ? false : true}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

function CartItems({ prod }) {
  const isAuth = useAuth();
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const idProductsCart = useSelector((state) => state.idProductsCart);
  const [amountProd, setAmountProd] = useState(0);
  const [prodImg, setProdImg] = useState("");
  const [timerId, setTimerId] = useState(null);

  const getImgUrl = (productId) => {
    const img = allProducts.find((item) => item.id === productId);
    if (img) {
      setProdImg(img.imageUrl);
    }
  };
  const getAmount = (carId) => {
    const prodId = idProductsCart.find((item) => item.id === carId);
    if (prodId) {
      setAmountProd(prodId.amount);
    }
  };

  useEffect(() => {
    getImgUrl(prod.id);
    getAmount(prod.id);
  }, [prod]);

  const handleInpAmount = (newAmount) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    const newTimerId = setTimeout(() => {
      const user = isAuth.user;
      const addProduct = {
        user: user.id,
        productId: prod.id,
        amount: newAmount,
      };
      dispatch(addToCart(addProduct));
    }, 500);
    setTimerId(newTimerId);
  };

  const addSubtractTocardButon = (e) => {
    if (e.target.name === "add") {
      setAmountProd(Number(amountProd) + 1);
      handleInpAmount(Number(amountProd) + 1);
    } else if (e.target.name === "subtract") {
      if (Number(amountProd) - 1 < 0) {
        null;
      } else {
        setAmountProd(Number(amountProd) - 1);
        handleInpAmount(Number(amountProd) - 1);
      }
    } else if (e.target.name === "remove") {
      setAmountProd(0);
      handleInpAmount(0);
    }
  };

  return (
    <>
      <li key={prod.id}>
        <div className={style.todo}>
          {/* <div className={style.nameImagen}> */}

          <img className={style.imagen} src={prodImg} />
          {/* </div> */}
          <a className={style.name}>{prod.name}</a>
          <div className={style.contenedorInfo}>
            <div className={style.productInfo}>
              <div className={style.amount}>
                <a
                  name="subtract"
                  className={style.buttonMenos}
                  onClick={addSubtractTocardButon}
                >
                  ➖
                </a>

                <div className={style.quantity}> {amountProd}</div>

                <a
                  name="add"
                  className={style.buttonMas}
                  onClick={addSubtractTocardButon}
                >
                  ➕
                </a>
              </div>
              <button
                name="remove"
                className={style.buttonRemove}
                onClick={addSubtractTocardButon}
              >
                Remove
              </button>
            </div>
          </div>
          {/* <input  className={style.checkbox}
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleSelect(item.id)}
              /> */}
          <div className={style.price}>
            Sub: ${prod.price} /u
            <br />
            Total: ${prod.price * amountProd}
          </div>
        </div>
      </li>
    </>
  );
}

CartItems.propTypes = {
  prod: PropTypes.object.isRequired,
};

export default ShoppingCartComp;
