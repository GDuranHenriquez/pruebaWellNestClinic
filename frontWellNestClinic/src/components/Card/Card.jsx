import { useState } from "react";
import PropTypes from "prop-types";
import { IconShoppingCart } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Card({ product }) {
  const [id, SetId] = useState(product.id)


  const stars = Array.from({ length: product.Product_Average.averageRating }, (_, index) => (
    <span key={index} className={styles.star}>⭐</span>
  ));

  return (
    <div className={styles.card}>
   

      <Link to={ `/product/${id}`}>
        <img
          className={styles.imgProduct}
          src={product.imageUrl}
          alt={`image of ${product.name}`}
        />
      </Link>
      <div className={styles.name}>{product.name}</div>
      <div className={styles.data}>
        <div> ${product.price}</div>
        <div className={styles.rating} >
          {startRating(product.Product_Average.averageRating)}
        </div>
        
      </div>
      <div className={styles.BtnAdd}>
        <button>
          <p className={styles.addTo}></p>
          <IconShoppingCart id={styles.iconCart}></IconShoppingCart>{" "}
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  product: PropTypes.object.isRequired,
};

const startRating = (rating) => {
  //Numero de estrellas
  //const totalStars = 5;
  //calculamos el numero de estrelas a llenar
  //Calculamos cuanto falta por llenar de la ultima estrella
  //const remainingPercentage = rating - filledStars;
  //const backstars = [];  
  //const star = <FontAwesomeIcon icon={faStar} />  
  //const filledStars = Math.floor(rating);
  
  const percentage = (rating/5)*100;
  return <div className = {styles.backStart}  >
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <div className = {styles.frontStart}  style={{width: percentage +`%`}}>
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
      </div>
    </div>

}


export default Card;
