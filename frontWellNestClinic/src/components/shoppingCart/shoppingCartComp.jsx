import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../../redux/action/actions";
import { useSelector } from "react-redux";
import style from "./shoppingCartComp.module.css";

function ShoppingCartComp() {
  /* const [cartItems, setCartItems] = useState([]); */
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const cartItems = useSelector((state) => state.cartItems.cart.products);
  const allProducts = useSelector((state) => state.allProducts);
  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      increaseQuantity(existingItem.id);
    } else {
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCart);
      calculateTotalPrice(updatedCart);
    }
  };

  const getImgUrl = (productId) => {
    const prod = allProducts.find((item) => item.id === productId);
    if (prod) {
      return prod.imageUrl;
    }
  };
  // Función para aumentar la cantidad de un producto en el carrito
  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  // Función para disminuir la cantidad de un producto en el carrito
  const decreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  // Función para seleccionar/deseleccionar un producto
  const toggleSelect = (productId) => {
    const updatedSelectedItems = selectedItems.includes(productId)
      ? selectedItems.filter((id) => id !== productId)
      : [...selectedItems, productId];
    setSelectedItems(updatedSelectedItems);
  };

  // Función para calcular el precio total de los productos seleccionados
  const calculateTotalPrice = (updatedCart) => {
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
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                 
                    <div className={style.quantity}>
                      {" "}
                      {item.cart_product.amount}
                    </div>
                   
                    <button
                      className={style.button}
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={style.button}
                    onClick={() => removeFromCart(item.id)}
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
        <button className={style.button} onClick={goToCheckout}>
          Checkout
        </button>
      </div>

      <div className={style.TotalDetail}></div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
  };
};

export default ShoppingCartComp;
