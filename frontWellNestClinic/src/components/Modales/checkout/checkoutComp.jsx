import { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Modal } from '../Modal';
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../../Authenticator/AuthPro';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Loading from "../../Loading/Loading";
//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnimatedCheckmark from '../AnimatedCheckmark';


function CheckoutComp({ isOpen, closeModal }) {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const navigate = useNavigate();

  const elements = useElements();
  const auth = useAuth();
  const idCart = useSelector((state) => state.cartItems.cart.id);
  const products = useSelector((state) => state.cartItems);

  const [isLoading, setIsLoading] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [sucessPayment, setSucessPayment] = useState(false);

  // Función para calcular el valor total de los productos
  const calculateTotalPrice = (prd) => {
    const productPrices = prd.map((product) => (product.cart_product.amount) * (product.price));
    const total = productPrices.reduce((a, b) => a + b, 0);
    return total;
  };

  // Calcular el valor total de la compra
  useEffect(() => {
    if (Object.keys(products.cart).length > 0) {
      setTotalPrice(calculateTotalPrice(products.cart.products));      
    }
  }, [products])

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
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
        const { id } = paymentMethod;
        const dataPayment = {
          stripeId: id,
          cartId: idCart,
          user: auth.user.id
        }
        const refreshToken = localStorage.getItem("token");
        const endPoint = import.meta.env.VITE_BASENDPOINT_BACK + "/sale";
        const config = {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        };
        const { data } = await axios.post(endPoint, dataPayment, config);
        setIsLoading(false);
        setSucessPayment(true)
        setTimeout(() => {
          navigate("/my-orders");
        }, 2000)
        
      }
    } catch (error) {
      setIsLoading(false);
      if(error.response.data.message){
        messageError(error.response.data.message);
      }else{
        /* messageError(error.error); */
        messageError(error.response.data.error)
      }

    }
  }

  const handleModalContainerClick = (e) => e.stopPropagation();

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        fontWeight: 'bold',
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

  const messageError = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const messageSuccess = (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const renderComponent = () => {
    if (isOpen && !sucessPayment) {
      return (
        <Modal>
          <div className='modalContainer' onClick={handleModalContainerClick}>
            <div className="containerForm">
              <button type="button" id='btnCloseModal' onClick={closeModal}>X</button>
              <div className="paymentData">
                <div className='buyerInfo'>
                  <h2>Buyer Information:</h2>
                  <div>
                    <p>{`Buyer's Name: ${auth.user.name}`}</p>
                  </div>
                </div>

                <div className='orderSummary'>
                  <h2>Order Summary:</h2>
                  <div>
                    <p>Total Value of Products: ${totalPrice.toFixed(2)}</p>
                    <p>Discount for Purchase: ${totalPrice - products.discountedPrice}</p>
                    <p>Total: ${(products.discountedPrice).toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                {/* Payment Form */}
                <div className='cardPay'>
                  <CardElement options={cardElementOptions} />
                </div>
                <button onClick={handleSubmit}>Buy</button>
              </form>
            </div>
          </div>
        </Modal>
      )
    } else if (isOpen && sucessPayment) {
      return (
        < Modal >
          <AnimatedCheckmark></AnimatedCheckmark>
        </Modal >
      )
    }
  }

  useEffect(() =>{

  }, [sucessPayment])

  return (<>
    {renderComponent()}
    {isLoading && <Loading></Loading>}
    <ToastContainer></ToastContainer>
  </>
  );
}

export default CheckoutComp;




