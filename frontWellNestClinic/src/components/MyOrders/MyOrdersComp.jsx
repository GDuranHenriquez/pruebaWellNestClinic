import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './myOrdersComp.module.css';

function MyOrdersComp() {
  const [orders, setOrders] = useState([]);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  
  useEffect(() => {
    // Solicitud a la API para obtener las órdenes del usuario
    /* axios.get('/api/orders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar las órdenes:', error);
      }); */

    // Solicitud adicional para obtener las calificaciones y comentarios existentes
    // axios.get('/api/ratings')
    //   .then((response) => {
    //     setRatings(response.data.ratings);
    //     setComments(response.data.comments);
    //   })
    //   .catch((error) => {
    //     console.error('Error al cargar las calificaciones y comentarios:', error);
    //   });
  }, []);

  // Función para manejar el envío de calificaciones y comentarios
  const handleRatingSubmit = (orderId) => {
    const rating = ratings[orderId];
    const comment = comments[orderId];
    
    // Solicitud para enviar la calificación y el comentario
    // axios.post('/api/rate', { orderId, rating, comment })
    //   .then((response) => {
    //     console.log('Calificación y comentario enviados con éxito:', response.data);
    //     // Actualiza el estado si es necesario
    //   })
    //   .catch((error) => {
    //     console.error('Error al enviar la calificación y comentario:', error);
    //   });
  };

  return (
    <div className={styles.myOrdersContainer}>
      <h2 className={styles.myOrdersTitle}>Mis Órdenes</h2>
      <ul className={styles.myOrderList}>
        {/* {orders.map((order) => (
          <li key={order.id} className={styles.myOrderItem}>
            <h3 className={styles.myOrderHeader}>Orden #{order.id}</h3>
            <div className={styles.myOrderProduct}>
              <h4 className={styles.myOrderProductTitle}>{order.productName}</h4>
              <p className={styles.myOrderProductDescription}>{order.productDescription}</p>
            </div>
            <div className={styles.myOrderRating}>
              <label htmlFor={`rating-${order.id}`} className={styles.myOrderLabel}>Calificación:</label>
              <select
                id={`rating-${order.id}`}
                className={styles.myOrderSelect}
                value={ratings[order.id] || ''}
                onChange={(e) => setRatings({ ...ratings, [order.id]: e.target.value })}
              >
                <option value="">Seleccionar calificación</option>
                <option value="1">1 estrella</option>
                <option value="2">2 estrellas</option>
                <option value="3">3 estrellas</option>
                <option value="4">4 estrellas</option>
                <option value="5">5 estrellas</option>
              </select>
              <label htmlFor={`comment-${order.id}`} className={styles.myOrderLabel}>Comentario:</label>
              <textarea
                id={`comment-${order.id}`}
                className={styles.myOrderTextArea}
                value={comments[order.id] || ''}
                onChange={(e) => setComments({ ...comments, [order.id]: e.target.value })}
              ></textarea>
              <button
                className={styles.myOrderButton}
                onClick={() => handleRatingSubmit(order.id)}
              >
                Enviar calificación y comentario
              </button>
            </div>
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export default MyOrdersComp;


