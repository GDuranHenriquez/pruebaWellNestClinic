import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de tener axios instalado en tu proyecto
import { Link } from 'react-router-dom';
/* import { FaShoppingCart } from 'react-icons/fa'; */

function DetailPage({ match }) {
  const [product, setProduct] = useState(null);

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
    </div>
  );
}

export default DetailPage;
