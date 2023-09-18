import { useState } from "react";
import { addToCart } from '../../redux/action/actions';
import PropTypes from "prop-types";
import { IconShoppingCart } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../Authenticator/AuthPro";

function Card({product}) {
  const isAuth = useAuth();
  const dispatch = useDispatch();
  const [id, SetId] = useState(product.id)  
  const IDProductsCart = useSelector((state) => state.idProductsCart);

  
  const addTocardButon = (e) =>{
    const user = isAuth.user;
    const addProduct = {
      user: user.id,
      productId: product.id,
      amount: 1
    }
    dispatch(addToCart(addProduct))
  }

  return (
    <div className={styles.card}>   

      <Link to={ `/product/${id}`} className={styles.imgProductLink}>
        <img
          className={styles.imgProduct}
          src={product.imageUrl}
          alt={`image of ${product.name}`}
        />
      </Link>
      <div className={styles.name}><p className={styles.nameP}>{product.name}</p></div>
      <div className={styles.data}>
        <div> ${product.price}</div>
        <div className={styles.rating} >
          {startRating(product.Product_Average.averageRating)}
        </div>
        
      </div>
      <div className={styles.BtnAdd}>
        {IDProductsCart.includes(product.id)? <span className={styles.bntAddMinus}>
          <button id={styles.btnAdd}>-</button>
          <input type="number" name="amount" id={styles.inpAnount} />
          <button id={styles.btnAdd}>+</button>
        </span>:<button onClick={addTocardButon}>
          <p className={styles.addTo}></p>
          <IconShoppingCart id={styles.iconCart}></IconShoppingCart>{" "}
      </button>}      
      </div>
    </div>
  );
}

Card.propTypes = {
  product: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
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
