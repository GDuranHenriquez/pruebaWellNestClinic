import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
import style from "./ProductDetail.module.css";
import { IconShoppingCart } from "@tabler/icons-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';



const ProductDetail = () => {

  const products = useSelector((state) => state.detail);

  return (
        <div className={style.container}>
          <Link to="/pharmacy" className={style.link}>
            <button className={style.backButton}>&larr; back</button>
          </Link>
          <div className={style.containerImgPrice}>
            <div className={style.imgProducto} >
              <img
                className={style.image}
                src={products.imageUrl}
                alt="pharmacy product"
              />
            </div>

            <div className={style.info2}>
              <h1 className={style.name}>{products.name}</h1>
              <div className={style.price}> Price: ${products.price} </div>
              <div className={style.rating} >
                {startRating(products.Product_Average.averageRating)}
              </div>
              <div className={style.btnAdd}>
                <button>
                  <p className={style.addTo}>Add to</p>
                  <IconShoppingCart id={style.iconCart}></IconShoppingCart>{" "}
                </button>
              </div>
            </div>
          </div>
          <div className={style.contenedor}>
            <div className={style.description}>Description</div>
            <p className={style.descripcion}>{products.description}</p>
          </div>

          <li className={style.content}>
              <ol >Dose: {products.dose} |</ol>
              <ol >Amount: {products.amount} |</ol>
              <ol >
                Type: {products.Product_PresentationType.type}
              </ol>
            </li>

            <li className={style.contentDos}>
              <ol >
                Laboratory: {products.Product_Laboratory.name} |
              </ol>
              <ol >
                Drug: {products.drugs.map((drug) => drug.name)} |
              </ol>
              <ol >Left in stock: {products.stock}</ol>
            </li>

        </div>
  );
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
  return <div className = {style.backStart}  >
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <div className = {style.frontStart}  style={{width: percentage +`%`}}>
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
      </div>
    </div>

}

export default ProductDetail;
