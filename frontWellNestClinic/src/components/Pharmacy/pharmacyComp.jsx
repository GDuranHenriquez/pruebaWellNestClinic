import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../Cards/Cards';
import styled from './pharmacyComp.module.css';
import { useDispatch } from 'react-redux'
import { getAllProducts } from '../../redux/action/actions';
 

function PharmacyComp() {
  const [filterType, setFilterType] = useState('');
  const [alphabeticalOrder, setAlphabeticalOrder] = useState('asc');
  const [search, setSearch] = useState('');
  const [priceOrder, setPriceOrder] = useState('asc');

  const dispatch = useDispatch();

 

  
  const searchProductByName = async () => {
    try {
      const response = await axios.get(`https://serverwellnestclinic.onrender.com/products?type=${filterType}&alphabeticalOrder=${alphabeticalOrder}&search=${search}&priceOrder=${priceOrder}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching for products by name:', error);
    }
  };

  useEffect(() => {
    /* fetchProducts(); */
  }, [filterType, alphabeticalOrder, search]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [])

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

  return (
    <div className={styled.containerCards}>
      <div className={styled.filterType}>        
        <select id={styled.selectType} value={filterType} onChange={(e) => handleFilterType(e.target.value)}>
            <option value="">All</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            {/* More type options */}
        </select>

        <button id={styled.alphabeticOrder} onClick={changeAlphabeticalOrder}>
          Alphabetical Order ({alphabeticalOrder === 'asc' ? 'A-Z' : 'Z-A'})
        </button>

        <div className={styled.search}>
          <input  type="text"
          id={styled.inpSearch}
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
          <button id={styled.BtnSearch} onClick={searchProductByName}>Search</button>
        </div>

        

        <button id={styled.btnPryceOrder} onClick={changePriceOrder}>Price order</button>
      </div>
    </div>
  );
}

export default PharmacyComp;