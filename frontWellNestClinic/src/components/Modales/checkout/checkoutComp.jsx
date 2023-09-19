import React, { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js';

import { Modal } from '../Modal';


function CheckoutComp({isOpen, closeModal}) {
  
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    if(!error){
      console.log(paymentMethod);
    };

  }
  const handleModalContainerClick = e => e.stopPropagation();
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

{/* <div>
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
      </div> */}




