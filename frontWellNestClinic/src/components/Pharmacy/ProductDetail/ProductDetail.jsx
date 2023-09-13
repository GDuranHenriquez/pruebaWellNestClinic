import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../../redux/action/actions";
import { useEffect } from "react";
import style from "./ProductDetail.module.css";
import { IconShoppingCart } from "@tabler/icons-react";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  // if (!Object.keys(products).length) {
  //   return <div className={style.loading}>Loading...</div>;

  // }
  return (
    <div className={style.container}>
      <h1 className={style.name}>{products.name}</h1>

      <img
        className={style.image}
        src={products.imageUrl}
        alt="pharmacy product"
      />
      <div className={style.description}>{products.description}
      </div>
      <div className={style.BtnAdd}>
        <button onClick={""}>
          <p className={style.addTo}>Add to</p>
          <IconShoppingCart id={style.iconCart}></IconShoppingCart>{" "}
        </button>
    </div>
      <Link to="/pharmacy">
        <button className={style.button}>Go back</button>
      </Link>
    </div>
  );
};

export default ProductDetail;
