import React, { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js';

import { Modal } from '../Modal';


function CheckoutComp({ isOpen, closeModal, products, discount, shippingCost }) {
  
  const stripe = useStripe();
  const elements = useElements();

  const [buyerName, setBuyerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');

  // Función para calcular el valor total de los productos
  const calculateTotalPrice = () => {
    const productPrices = products.map((product) => product.price);
    const totalPrice = productPrices.reduce((acc, price) => acc + price, 0);
    return totalPrice;
  };

  // Calcular el valor total de la compra
  const totalPrice = calculateTotalPrice();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: buyerName,
        phone: contactNumber,
        address: {
          line1: address,
        },
      },
    });

    if (!error) {
      console.log(paymentMethod);
      // Aquí puedes enviar los detalles de la compra y el pago al servidor.
    }
  };

  const handleModalContainerClick = (e) => e.stopPropagation();

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        fontWeight:'bold',
        color: 'black',
        '::placeholder': {
          color: 'rgba(39, 53, 68,0.7)',
        },
        border: '1px solid #000000',
        borderRadius: '5px',
        padding: '10px',
        margin: '0 auto',
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
  return (<>{isOpen?
    <Modal>
      <div className='modalContainer' onClick={handleModalContainerClick}>
      <div className="containerForm">
        <button type="button" id='btnCloseModal' onClick={closeModal}>X</button>
        <form onSubmit={handleSubmit}>
          {/* Buyer Information */}
          <div className='buyerInfo'>
            <h2>Buyer Information:</h2>
            <div>
              <label htmlFor="buyerName">Buyer's Name:</label>
              <input
                type="text"
                id="buyerName"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="contactNumber">Contact Number:</label>
              <input
                type="tel"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className='orderSummary'>
            <h2>Order Summary:</h2>
            <div>
              <p>Total Value of Products: ${totalPrice.toFixed(2)}</p>
              <p>Discount for Purchase: ${discount.toFixed(2)}</p>
              <p>Shipping Cost: ${shippingCost.toFixed(2)}</p>
              <p>Total: ${(totalPrice - discount + shippingCost).toFixed(2)}</p>
            </div>
          </div>

          {/* Payment Form */}
          <div className='cardPay'>
            <CardElement options={cardElementOptions}/>
          </div>   
          <button onClick={handleSubmit}>Buy</button>
        </form>
      </div>        
    </div>
    </Modal> : '' }</>
  );
}

export default CheckoutComp;




