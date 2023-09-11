import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function checkoutComp({ selectedProducts }) {
  const [userData, setUserData] = useState({
    username: '',
    phoneNumber: '',
    address: '',
    paymentMethod: '',
  });

  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const history = useHistory();

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

  const handlePaymentMethodChange = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      paymentMethod: e.target.value,
    }));
  };

  const handlePaymentClick = async () => {
    if (!userData.username || !userData.phoneNumber || !userData.address || !userData.paymentMethod) {
      alert('Please fill in all shipping information and select a payment method.');
      return;
    }
  
    try {
      const response = await axios.post('/your-payment-endpoint', {
        userData,
        selectedProducts,
        totalCost,
      });
  
      if (response.status === 200) {
        alert('Payment successful! Redirecting to confirmation page.');
        history.push('/confirmation');
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
        <form>
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
          <select
            name="paymentMethod"
            value={userData.paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value="">Select Payment Method</option>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </form>
      </div>
      <div>
        <h3>Order Summary</h3>
        <p>Total Cost of Items: ${totalCost.toFixed(2)}</p>
        <p>Discount: ${discount.toFixed(2)}</p>
        <p>Shipping Cost: ${shippingCost.toFixed(2)}</p>
        <p>Total Cost: ${totalCost.toFixed(2)}</p>
      </div>
      <button onClick={handlePaymentClick}>Pay ${totalCost.toFixed(2)}</button>
      <Link to="/shopping-cart">Back to Cart</Link>
    </div>
  );
}

export default checkoutComp;
