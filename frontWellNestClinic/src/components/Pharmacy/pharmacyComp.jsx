import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../Cards/Cards';


function PharmacyComp() {
  const [products, setProducts] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [alphabeticalOrder, setAlphabeticalOrder] = useState('asc');
  const [search, setSearch] = useState('');
  const [priceOrder, setPriceOrder] = useState('asc');

 
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://serverwellnestclinic.onrender.com/products?type=${filterType}&alphabeticalOrder=${alphabeticalOrder}&search=${search}&priceOrder=${priceOrder}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  
  const searchProductByName = async () => {
    try {
      const response = await axios.get(`https://serverwellnestclinic.onrender.com/products?type=${filterType}&alphabeticalOrder=${alphabeticalOrder}&search=${search}&priceOrder=${priceOrder}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching for products by name:', error);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, [filterType, alphabeticalOrder, search]);

  const handleFilterType = async (selectedType) => {
    try {
      const response = await axios.get(`https://serverwellnestclinic.onrender.com/products?type=${selectedType}&order=${alphabeticalOrder}&search=${search}`);
      setProducts(response.data);
      setFilterType(selectedType);
    } catch (error) {
      console.error('Error filtering by type:', error);
    }
  };

  const changeAlphabeticalOrder = () => {
    if (alphabeticalOrder === 'asc') {
      setAlphabeticalOrder('desc');
    } else {
      setAlphabeticalOrder('asc');
    }
  };

  const changePriceOrder = () => {
    if (priceOrder === 'asc') {
      setPriceOrder('desc');
    } else {
      setPriceOrder('asc');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filterType, alphabeticalOrder, search, priceOrder]);

  return (
    <div>
      <div>

        <Cards
        products={products}
        onSeeMoreClick={handleSeeMoreClick}
        onAddToCartClick={handleAddToCartClick}
      />
      <select value={filterType} onChange={(e) => handleFilterType(e.target.value)}>
          <option value="">All</option>
          <option value="type1">Type 1</option>
          <option value="type2">Type 2</option>
          {/* More type options */}
        </select>
        <button onClick={changeAlphabeticalOrder}>
          Alphabetical Order ({alphabeticalOrder === 'asc' ? 'A-Z' : 'Z-A'})
        </button>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchProductByName}>Search</button>
        <button onClick={changePriceOrder}>Price order</button>-
      </div>

      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product">
            {/* Product information */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PharmacyComp;
