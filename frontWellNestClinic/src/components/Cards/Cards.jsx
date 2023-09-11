import Card from '../Card/Card';
import styles from './Cards.module.css';
import { useSelector } from 'react-redux';

function Cards() {
  const allProducts = useSelector((state) => state.allProducts);

  return (
    <div className={styles.cards}>
      {allProducts.map((product) => (
        <Card key={product.id} product ={ product } />
      ))}
    </div>
  );
}

export default Cards;


