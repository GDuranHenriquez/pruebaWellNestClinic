import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Card.module.css';

function Card({ product, onAddToCartClick }) {
  return (
    <div className={styles.card}>
      <img src={product.imageUrl} alt={product.name} className={styles.image} />
      <h2 className={styles.name}>{product.name}</h2>
      <Link to={`/product/${product.id}`} className={styles.seeMore}>
        See More
      </Link>
      <button onClick={() => onAddToCartClick(product)}>Add to Cart</button>
    </div>
  );
}

export default Card;
