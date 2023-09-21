import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import style from "./ProductDetail.module.css";
import { IconShoppingCart } from "@tabler/icons-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../../Authenticator/AuthPro";
import { addToCart } from '../../../redux/action/actions';

//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const isAuth = useAuth();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.detail);
  const IDProductsCart = useSelector((state) => state.idProductsCart);
  const error = useSelector((state) => state.genericError);
  const [amount, setAmount] = useState(0);
  const [timerId, setTimerId] = useState(null);


  const addSubtractTocardButon = (e) => {
    if (e.target.name === 'add') {
      setAmount(Number(amount) + 1)
      handleInpAmount(Number(amount) + 1)
    } else if (e.target.name === 'subtract') {
      if (Number(amount) - 1 < 0) {
        null
      } else {
        setAmount(Number(amount) - 1)
        handleInpAmount(Number(amount) - 1)
      }
    }
  };
  const cartContainer = () => {
    for (var i = 0; i < IDProductsCart.length; i++) {
      if (products.id === IDProductsCart[i].id) {
        return true
      }
    }
    return false
  };
  const handleInpAmount = (newAmount) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    const newTimerId = setTimeout(() => {
      const user = isAuth.user;
      const addProduct = {
        user: user.id,
        productId: products.id,
        amount: newAmount
      }
      dispatch(addToCart(addProduct))
    }, 500);
    setTimerId(newTimerId);
  };

  const addTocardButon = (e) =>{
    const user = isAuth.user;
    const addProduct = {
      user: user.id,
      productId: products.id,
      amount: 1
    }
    dispatch(addToCart(addProduct))
  }


  useEffect(() => {
    amountInp();
  }, [IDProductsCart])

  useEffect(() => {
    if(error){
      messageError(error);
    }
  }, [error])

  const amountInp = () => {
    for (var i = 0; i < IDProductsCart.length; i++) {
      if (products.id === IDProductsCart[i].id) {
        setAmount(IDProductsCart[i].amount);
        return;
      }
    }
    setAmount(0)
    return;
  }

  const messageError = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };


  return (
    <div className={style.containerDetail}>
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
            <div className={style.BtnAdd}>
              {cartContainer(products.id) ? <span className={style.bntAddMinus}>
                <button id={style.btnAdd} name="subtract" onClick={addSubtractTocardButon}>-</button>
                <input type="number" name="amount" id={style.inpAmount} value={amount} disabled />
                <button id={style.btnAdd} name="add" onClick={addSubtractTocardButon}>+</button>
              </span> : <button onClick={addTocardButon}>
                <p className={style.addTo} >Add to</p>
                <IconShoppingCart id={style.iconCart}></IconShoppingCart>{" "}
              </button>}

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
      <div className={style.infoscore}>
        <h1>Comment Section</h1>
        {products.Product_Score.map((score, index) => 
          <Score key={index} score={score} ></Score>
        )}
      </div>
      <ToastContainer></ToastContainer>
    </div>

  );
};

function Score({score}){
  const [star, setStart] = useState([]);
  const arrStart = [];

  useEffect(() => {
    setStart([]);
    for(var i=1; i <= score.stars; i++){
      arrStart.push(i)
    }
    setStart(arrStart)
    console.log(arrStart)
    
  },[score]);
  
  return (
    <div className={style.unitScore}>
      <p>Review: {score.text}</p>
      <p>{star.map((st, index) => (
        <span key={index}>⭐</span>
        ))}</p>
    </div>
  )
}

const startRating = (rating) => {
  //Numero de estrellas
  //const totalStars = 5;
  //calculamos el numero de estrelas a llenar
  //Calculamos cuanto falta por llenar de la ultima estrella
  //const remainingPercentage = rating - filledStars;
  //const backstars = [];  
  //const star = <FontAwesomeIcon icon={faStar} />  
  //const filledStars = Math.floor(rating);

  const percentage = (rating / 5) * 100;
  return <div className={style.backStart}  >
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
    <FontAwesomeIcon icon={faStar} />
    <div className={style.frontStart} style={{ width: percentage + `%` }}>
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faStar} />
    </div>
  </div>

}

export default ProductDetail;
