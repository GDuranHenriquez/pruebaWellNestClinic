import { useState } from 'react';
import PropTypes from 'prop-types';
import { IconShoppingCart } from '@tabler/icons-react';

import styles from './Card.module.css';

function Card({product}) {
  const [isVisPlusMines, setIsVisPlusMines] = useState(0);

  return (
    <div className={styles.card}>
      <div className={styles.imgProduct}>
        <img id={styles.imgProduct} src={product.imageUrl} alt={`imagen de ${product.name}`} />
      </div>

      <div className={styles.dataProduc}>
        <div className={styles.name}>
          <p id={styles.name}>{product.name}</p>
        </div>
        <div className={styles.price}>

          <p id={styles.price}>Price: {product.price}</p>
        </div>
        <div className={ styles.divBtnAdd }>
          <button id={styles.divBtnAdd} /* onClick={''} */ className={styles.btnAdd}>
            Add to Cart
          </button>
          <IconShoppingCart id={ styles.iconCart }></IconShoppingCart>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  product: PropTypes.object.isRequired,
}

export default Card;
