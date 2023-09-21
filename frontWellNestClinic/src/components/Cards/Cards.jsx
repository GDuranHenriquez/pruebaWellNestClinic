import { useEffect } from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';
import { useSelector } from 'react-redux';
import {
  getCart
} from "../../redux/action/actions";
import { useAuth } from "../../Authenticator/AuthPro";

function Cards() {
  const isAuth = useAuth();
  const user = isAuth.user;
  
  const allProducts = useSelector((state) => state.allProducts);
  useEffect(() =>{
    getCart(user.id);
  })

  return (
    <div className={styles.cards}>
      {allProducts.length === 0 ? <p className={styles.notFound} >Not Products Found</p> : allProducts.map((product) => (
        <Card key={product.id} product ={ product } />
      ))}
    </div>
  );
}

export default Cards;


