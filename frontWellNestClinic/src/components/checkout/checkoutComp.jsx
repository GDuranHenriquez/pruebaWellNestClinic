import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutComp({ selectedProducts, addToCart }) {
  const [userData, setUserData] = useState({
    username: '',
    phoneNumber: '',
    address: '',
  });

  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Calcular el precio total de los productos seleccionados
    const totalPrice = selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    // Calcular el descuento (por ejemplo, 10%)
    const calculatedDiscount = totalPrice * 0.1;

    // Calcular los costos de envío (por ejemplo, $5 por producto)
    const calculatedShippingCost = selectedProducts.length * 5;

    // Calcular el costo total
    const calculatedTotalCost =
      totalPrice - calculatedDiscount + calculatedShippingCost;

    setDiscount(calculatedDiscount);
    setShippingCost(calculatedShippingCost);
    setTotalCost(calculatedTotalCost);
  }, [selectedProducts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userData.username || !userData.phoneNumber || !userData.address) {
      alert('Please fill in all shipping information.');
      return;
    }

    if (!stripe || !elements) {
      // Stripe.js no se ha cargado aún. Espera un momento y vuelve a intentarlo.
      return;
    }

    // Crea un token de tarjeta de crédito utilizando Stripe Elements
    const { token, error } = await stripe.createToken(elements.getElement(CardElement));

    if (error) {
      console.error('Error creating token:', error);
      alert('Payment failed. Please check your card information.');
      return;
    }

    try {
      // Envía el token de tarjeta de crédito al servidor junto con otros datos
      const response = await axios.post('/your-payment-endpoint', {
        userData,
        selectedProducts,
        totalCost,
        token: token.id,
      });

      if (response.status === 200) {
        alert('Payment successful!');
        // Agrega los productos al carrito después del pago exitoso
        selectedProducts.forEach((product) => addToCart(product));
        navigate('/confirmation'); // Redirige a la página de confirmación
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Order Confirmation</h2>
      <div>
        <h3>Selected Products</h3>
        <ul>
          {selectedProducts.map((product) => (
            <li key={product.id}>
              {product.name} - Quantity: {product.quantity}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Shipping Information</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userData.username}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={userData.phoneNumber}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={userData.address}
            onChange={handleInputChange}
          />
          <div>
            <CardElement />
          </div>
          <button type="submit">Pay ${totalCost.toFixed(2)}</button>
        </form>
      </div>
      <div>
        <h3>Order Summary</h3>
        <p>Total Cost of Items: ${totalCost.toFixed(2)}</p>
        <p>Discount: ${discount.toFixed(2)}</p>
        <p>Shipping Cost: ${shippingCost.toFixed(2)}</p>
        <p>Total Cost: ${totalCost.toFixed(2)}</p>
      </div>
      <Link to="/shopping-cart">Back to Cart</Link>
    </div>
  );
}

export default CheckoutComp;



