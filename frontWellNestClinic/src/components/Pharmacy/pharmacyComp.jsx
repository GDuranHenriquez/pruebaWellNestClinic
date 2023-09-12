import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../Cards/Cards";
import styled from "./pharmacyComp.module.css";
import { useDispatch } from "react-redux";
import { getAllProducts, getProductByName } from "../../redux/action/actions";

function PharmacyComp() {
  const [filterType, setFilterType] = useState("");
  const [alphabeticalOrder, setAlphabeticalOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [priceOrder, setPriceOrder] = useState("asc");
  const [showArrow, setShowArrow] = useState(false);

  const dispatch = useDispatch();

  const searchProductByName = () => {
    dispatch(getProductByName(search));
    setShowArrow(true);
  };

  const navigateBack = () => {
    dispatch(getAllProducts());
    setShowArrow(false);
    // setSearch("");
  };

  useEffect(() => {
    /* fetchProducts(); */
  }, [filterType, alphabeticalOrder, search]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    if (search.trim().length<=0) {
      dispatch(getAllProducts());
      setShowArrow(false)
    }
  }, [search])

  const handleFilterType = async (selectedType) => {
    try {
      const response = await axios.get(
        `https://serverwellnestclinic.onrender.com/products?type=${selectedType}&order=${alphabeticalOrder}&search=${search}`
      );
      setProducts(response.data);
      setFilterType(selectedType);
    } catch (error) {
      console.error("Error filtering by type:", error);
    }
  };

  const changeAlphabeticalOrder = () => {
    if (alphabeticalOrder === "asc") {
      setAlphabeticalOrder("desc");
    } else {
      setAlphabeticalOrder("asc");
    }
  };

  const changePriceOrder = () => {
    if (priceOrder === "asc") {
      setPriceOrder("desc");
    } else {
      setPriceOrder("asc");
    }
  };
  
  return (
    <div className={styled.containerCards}>
      {showArrow && (
        <button onClick={navigateBack} className={styled.arrow}>
          &larr; All products
        </button>
      )}
      <div className={styled.filterType}>
        <select
          id={styled.selectType}
          value={filterType}
          onChange={(e) => handleFilterType(e.target.value)}
          >
          <option value="">All</option>
          <option value="type1">Type 1</option>
          <option value="type2">Type 2</option>
          {/* More type options */}
        </select>

        <button id={styled.alphabeticOrder} onClick={changeAlphabeticalOrder}>
          Alphabetical Order ({alphabeticalOrder === "asc" ? "A-Z" : "Z-A"})
        </button>

        <button id={styled.btnPryceOrder} onClick={changePriceOrder}>
          Price order
        </button>

        <div className={styled.search}>
          <input
            type="text"
            id={styled.inpSearch}
            placeholder="Search for a product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" onClick={searchProductByName}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default PharmacyComp;
