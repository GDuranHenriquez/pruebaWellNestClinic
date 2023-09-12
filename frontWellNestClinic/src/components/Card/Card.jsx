import { useState } from "react";
import PropTypes from "prop-types";
import { IconShoppingCart } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";


function Card({ product }) {

  return (
    <div className={styles.card}>
   

      <Link to={ `/product/${product.id}`}>
        <img
          className={styles.imgProduct}
          src={product.imageUrl}
          alt={`image of ${product.name}`}
        />
      </Link>
      <div className={styles.name}>{product.name}</div>
      <div className={styles.data}>
        <div>Price: ${product.price}</div>
        <div>Rating: {product.Product_Average.averageRating}⭐</div>
      </div>
      <div className={styles.BtnAdd}>
        <button>
          <p className={styles.addTo}>Add to</p>
          <IconShoppingCart id={styles.iconCart}></IconShoppingCart>{" "}
        </button>
        {/* <IconShoppingCart id={styles.iconCart}></IconShoppingCart> */}
      </div>
    </div>
  );
}

Card.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Card;
