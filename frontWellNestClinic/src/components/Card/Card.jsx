import { useState } from "react";
import PropTypes from "prop-types";
import { IconShoppingCart } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";



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
        <div>{stars}</div>
        
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

export default Card;
