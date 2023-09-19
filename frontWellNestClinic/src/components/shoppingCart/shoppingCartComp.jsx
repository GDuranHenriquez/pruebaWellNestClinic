import { useState } from "react";
import { useSelector } from "react-redux";
import style from "./shoppingCartComp.module.css";
import { useModal } from "../../utils/useModal";
import  CheckoutComp  from '../Modales/checkout/checkoutComp'

function ShoppingCartComp() {
  /* const [cartItems, setCartItems] = useState([]); */
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
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
  }; */

    
  return (
    <div className={style.containerCartDetail}>
      <div className={style.CartDetail}>
        <h2>Shopping Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div className={style.todo}>
                <div className={style.nameImagen}>
                  <div className={style.name}>{item.name}</div>

                  <img className={style.imagen} src={getImgUrl(item.id)} />
                </div>
                <div className={style.price}> ${item.price}</div>
                <div className={style.contenedorInfo}>
                  <div className={style.productInfo}></div>
                  <div className={style.amount}>
                  <button
                      className={style.button}
                    >
                      -
                    </button>
                 
                    <div className={style.quantity}>
                      {" "}
                      {item.cart_product.amount}
                    </div>
                   
                    <button
                      className={style.button}
                      
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={style.button}
                    
                  >
                    Remove
                  </button>
                </div>
                {/* <input  className={style.checkbox}
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleSelect(item.id)}
              /> */}
              </div>
            </li>
          ))}
        </ul>
        <p className={style.totalPrice}>Total Price: ${totalPrice}</p>
        <button className={style.button} onClick={openModal}>
          Checkout
        </button>
      </div>

      <div className={style.TotalDetail}></div>
      <CheckoutComp isOpen = {isOpenModal} closeModal = {closeModal}/>
    </div>
  );
}

export default ShoppingCartComp;
