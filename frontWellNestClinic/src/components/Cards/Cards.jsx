import React from 'react';
import Card from '../Card/Card';

import styles from './Cards.module.css';

function Cards({ products, onAddToCartClick }) {
  return (
    <div className={styles.cards}>
      {products.map((product) => (
        <Card key={product.id} product={product} onAddToCartClick={onAddToCartClick} />
      ))}
    </div>
  );
}

export default Cards;


