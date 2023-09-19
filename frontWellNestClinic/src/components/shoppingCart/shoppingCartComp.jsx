import { useState } from "react";
import { removeFromCart } from "../../redux/action/actions";
import { useSelector } from "react-redux";
import style from "./shoppingCartComp.module.css";
import { useModal } from "../../utils/useModal";
import CheckoutComp from "../Modales/checkout/checkoutComp";
import { Link, useNavigate } from "react-router-dom";

function ShoppingCartComp() {
  /* const [cartItems, setCartItems] = useState([]); */
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const cartItems = useSelector((state) => state.cartItems.cart.products);
  const allProducts = useSelector((state) => state.allProducts);
  const [isOpenModal, openModal, closeModal] = useModal(false);

  const getImgUrl = (productId) => {
    const prod = allProducts.find((item) => item.id === productId);
    if (prod) {
      return prod.imageUrl;
    }
  };

  /* // Función para seleccionar/deseleccionar un producto
  const toggleSelect = (productId) => {
    const updatedSelectedItems = selectedItems.includes(productId)
      ? selectedItems.filter((id) => id !== productId)
      : [...selectedItems, productId];
    setSelectedItems(updatedSelectedItems);
<<<<<<< Updated upstream
  }; */

  // Función para calcular el precio total de los productos seleccionados
  const calculateTotalPrice = (updatedCart) => {
    console.log("calculate price excecuted");
    const selectedProducts = updatedCart.filter((item) =>
      selectedItems.includes(item.id)
    );
    const totalPrice = selectedProducts.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(totalPrice);
  };

  const navigate = useNavigate();
  const goToCheckout = () => {
    navigate("/checkout");
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
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className={style.todo}>
                  {/* <div className={style.nameImagen}> */}

                  <img className={style.imagen} src={getImgUrl(item.id)} />
                  {/* </div> */}
                  <a className={style.name}>{item.name}</a>
                  <div className={style.contenedorInfo}>
                    <div className={style.productInfo}>
                      <div className={style.amount}>
                        <a
                          className={style.buttonMenos}
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          ➖
                        </a>

                        <div className={style.quantity}>
                          {" "}
                          {item.cart_product.amount}
                        </div>

                        <a
                          className={style.buttonMas}
                          onClick={() => increaseQuantity(item.id)}
                        >
                          ➕
                        </a>
                      </div>
                      <button
                        className={style.buttonRemove}
                        onClick={() => removeFromCart(item.id)}
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
                  <div className={style.price}> ${item.price}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <CheckoutComp isOpen={isOpenModal} closeModal={closeModal} />
      </div>
      <div className={style.TotalDetail}>
        <h2 className={style.resumen}>Order Summary</h2>
        <div className={style.infoContainer}>
          <p className={style.info}>Products:</p>
          <p className={style.info}>Discount:</p>
        </div>
        <hr />
        <p className={style.totalPrice}>Total: ${totalPrice}</p>

        <button className={style.buttonCheckout} onClick={openModal}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default ShoppingCartComp;
