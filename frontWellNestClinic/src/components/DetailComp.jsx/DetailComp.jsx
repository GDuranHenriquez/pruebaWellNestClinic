import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de tener axios instalado en tu proyecto
import { Link } from 'react-router-dom';
import Loading from "../components/Loading/Loading";

/* import { FaShoppingCart } from 'react-icons/fa'; */

function DetailPage({ match }) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const IDProductsCart = useSelector((state) => state.idProductsCart);
  const [amount, setAmount] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const addSubtractTocardButon = (e) =>{
    if(e.target.name === 'add'){
      setAmount(Number(amount) + 1)
      handleInpAmount(Number(amount) + 1)
    }else if(e.target.name === 'subtract'){
      setAmount(Number(amount) - 1)
      handleInpAmount(Number(amount) - 1)
    }
  }
  const cartContainer = () => {
    for(var i = 0; i < IDProductsCart.length; i++){
      if(product.id === IDProductsCart[i].id){
        return true
      }      
    }
    return false
  }
  const handleInpAmount = (newAmount) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    const newTimerId  = setTimeout(() => {
      const user = isAuth.user;
      const addProduct = {
      user: user.id,
      productId: product.id,
      amount: newAmount
    }
    dispatch(addToCart(addProduct))
    }, 500);
    setTimerId(newTimerId); 
  }

  useEffect(() => {
    amountInp();
  }, [IDProductsCart])

  useEffect(() => {
    // Obtener el ID del producto de la URL usando React Router
    const productId = match.params.id;
    
    // Realizar una solicitud a la API para obtener los detalles del producto
    axios.get(`https://tu-api.com/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar los detalles del producto:', error);
      });
      setIsLoading(false);
  }, [match.params.id]);

  if (!product) {
    return <div>Cargando...</div>; // Puedes mostrar un indicador de carga mientras se obtienen los datos
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Descripción: {product.description}</p>
      <p>Laboratorio o Marca: {product.manufacturer}</p>
      <p>Tipo de Medicamento: {product.type}</p>
      <p>Vía de Administración: {product.administration}</p>
      <p>Precio: ${product.price}</p>
      <button onClick={() => alert(`Agregado al carrito: ${product.name}`)}>
        Add {/* <FaShoppingCart /> */}
      </button>
      <div>
        <span>Rating: </span>
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index}>★</span>
        ))}
      </div>
      <Link to="/cart">Ir al carrito</Link>
      {isLoading? <Loading></Loading>: ''}
    </div>
  );
}

export default DetailPage;
