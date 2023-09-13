import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../../redux/action/actions";
import { useEffect } from "react";
import style from "./ProductDetail.module.css";
import { IconShoppingCart } from "@tabler/icons-react";
import Loading from "../../Loading/Loading";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.detail);
  console.log(products);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(id);
    setIsLoading(true);
    dispatch(getProductDetail(id)).then((data) => {
      setIsLoading(false);
    });
  }, [dispatch, id]);

  const stars = () => {
    if (Object.keys(products).length) {
      return Array.from(
        { length: products.Product_Average.averageRating },
        (_, index) => (
          <span key={index} className={style.star}>
            ⭐
          </span>
        )
      );
    }
  };



  return (
    <>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className={style.container}>
          <Link to="/pharmacy" className={style.link}>
            <button className={style.backButton}>&larr; back</button>
          </Link>
          <span className={style.productInfo}>
            <img
              className={style.image}
              src={products.imageUrl}
              alt="pharmacy product"
            />
            <div className={style.info2}>
              <h1 className={style.name}>{products.name}</h1>

              <div className={style.price}> Price: ${products.price} </div>
              {/* <div>{stars}</div> */}
              <StarGenerator products={products}>   </StarGenerator>
              <div className={style.btnAdd}>
                <button>
                  <p className={style.addTo}>Add to</p>
                  <IconShoppingCart id={style.iconCart}></IconShoppingCart>{" "}
                </button>
              </div>
            </div>
          </span>
          <div className={style.contenedor}>
            {/* <div className={style.nameDesc}> */}

            <div className={style.description}>Description</div>

            <div className={style.descripcion}>{products.description}</div>
          </div>

          <li className={style.content}>
            <ol className={style.dose}>Dose: {products.dose} |</ol>
            <ol className={style.amount}>Amount: {products.amount} |</ol>
            <ol className={style.type}>
              Type: {products.Product_PresentationType.type}
            </ol>
          </li>

          <li className={style.contentDos}>
            <ol className={style.lab}>
              Laboratory: {products.Product_Laboratory.name} |
            </ol>
            <ol className={style.drug}>
              Drug: {products.drugs.map((drug) => drug.name)} |
            </ol>
            <ol className={style.stock}>Left in stock: {products.stock}</ol>
          </li>
        </div>
      )}
    </>
  );
};

const StarGenerator = (products) => {
  const [star, setStar] = useState([])
  for (let i = 0; i <=products.Product_Average.averageRating; i++) {
    setStar([...star, i])
  }
  return (
    <div>
      {Object.keys(products.length)?star.map((element)=> {
        <span key={index} className={style.star}>
        ⭐
      </span>

      }):""}

    </div>

  )
}

export default ProductDetail;
