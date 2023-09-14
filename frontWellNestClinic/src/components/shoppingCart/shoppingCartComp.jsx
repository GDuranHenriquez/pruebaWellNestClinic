import React, { useState } from 'react';
import  { useNavigate } from 'react-router-dom'
function ShoppingCartComp() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

  const history = useNavigate();
  const goToCheckout = () => {
    history('/checkout');
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => toggleSelect(item.id)}
            />
            {item.name} - ${item.price} - Quantity: {item.quantity}
            <button onClick={() => increaseQuantity(item.id)}>+</button>
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
          </li>
        ))}
      </ul>
      <p>Total Price: ${totalPrice}</p>
      <button onClick={goToCheckout}>Checkout</button>
    </div>
  );
}

export default ShoppingCartComp;
