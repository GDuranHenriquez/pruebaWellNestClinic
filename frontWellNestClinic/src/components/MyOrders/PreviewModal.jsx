import { useState, useEffect } from 'react';
import { Modal } from '../Modales/Modal';
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../Authenticator/AuthPro';
import axios from 'axios';
import Loading from "../Loading/Loading";
//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from "../Card/Card.module.css";

function PreviewModal({ isOpen, closeModal, id }) {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [raiting, setRaiting] = useState(0);
  const [review, setReview] = useState('');

  const startRaiting = (e) => {
    setRaiting(Number(e.target.value))
  }
  const SetReview = (e) => {
    setReview(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      if (raiting === 0) {
        setIsLoading(false)
        return messageError('You must rate the product');
      }
      if (review === '') {
        setIsLoading(false)
        return messageError('You must leave a comment');
      }
      const endPoint = import.meta.env.VITE_BASENDPOINT_BACK + `/score`;
      const refreshToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      };
      const dataReview = {
        text: review,
        stars: raiting,
        product: id
      }
      const response = await axios.post(endPoint, dataReview, config) 
      if(response.status === 200){
        messageSuccess('Thank you for your review')
      }     
      setRaiting(0);
      setReview('');
      setIsLoading(false);
      closeModal();
    } catch (error) {
      setIsLoading(false);
      if (error.response.data.message) {
        messageError(error.response.data.message);
      } else {
        /* messageError(error.error); */
        messageError(error.response.data.error)
      }

    }
  }

  const handleModalContainerClick = (e) => e.stopPropagation();

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
    if (isOpen) {
      return (
        <Modal>
          <div className='modalContainer' onClick={handleModalContainerClick}>
            <div className="containerForm">
              <button type="button" id='btnCloseModal' onClick={closeModal}>X</button>
              <h1>Leave a review</h1>
              <form>
                <select name="starts" defaultValue={raiting} onChange={startRaiting}>
                  <option value="0" >Select a star</option>
                  <option value="1">⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                </select>
                <textarea name="comentario" id="comentario" placeholder='Leave a comment' onChange={SetReview} />
                {/* {startRating(raiting, startRaiting)} */}
                <button className='submit' onClick={handleSubmit}>Submit</button>
              </form>
            </div>
          </div>
        </Modal>
      )
    } /* else if (isOpen && sucessPayment) {
      return (
        < Modal >
          <AnimatedCheckmark></AnimatedCheckmark>
        </Modal >
      )
    } */
  }

  useEffect(() => {

  }, [])

  return (<>
    {renderComponent()}
    {isLoading && <Loading></Loading>}
    <ToastContainer></ToastContainer>
  </>
  );
}


const startRating = (rating, startRaiting) => {
  //Numero de estrellas
  //const totalStars = 5;
  //calculamos el numero de estrelas a llenar
  //Calculamos cuanto falta por llenar de la ultima estrella
  //const remainingPercentage = rating - filledStars;
  //const backstars = [];  
  //const star = <FontAwesomeIcon icon={faStar} />  
  //const filledStars = Math.floor(rating);

  const percentage = (rating / 5) * 100;
  return <div className={styles.backStart}  >
    <FontAwesomeIcon icon={faStar} name='sa' onClick={startRaiting} />
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
    <div className={styles.frontStart} style={{ width: percentage + `%` }}>
      <FontAwesomeIcon icon={faStar} name='1' onClick={startRaiting} />
      <FontAwesomeIcon icon={faStar} name='2' onClick={startRaiting} />
      <FontAwesomeIcon icon={faStar} name='3' onClick={startRaiting} />
      <FontAwesomeIcon icon={faStar} name='4' onClick={startRaiting} />
      <FontAwesomeIcon icon={faStar} name='5' onClick={startRaiting} />
    </div>
  </div>

}

export default PreviewModal;
