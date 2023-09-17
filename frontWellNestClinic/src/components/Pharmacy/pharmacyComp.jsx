import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../Cards/Cards";
import styled from "./pharmacyComp.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getAllProductsByPage,
  getProductByName,
  getProductsFilter,
} from "../../redux/action/actions";
import Paginado from "./Paginado";

function PharmacyComp() {
  const [filterType, setFilterType] = useState("");
  const [alphabeticalOrder, setAlphabeticalOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [priceOrder, setPriceOrder] = useState("asc");
  const [ratingOrder, setRatingOrder] = useState("asc");
  const [showArrow, setShowArrow] = useState(false);
  const allProducts = useSelector((state) => state.totalProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const indexOfLastproduct = currentPage * productsPerPage;
  const indexOfFirstproduct = indexOfLastproduct - productsPerPage;

  const [type, setType] = useState([]);

  const dispatch = useDispatch();

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(getAllProductsByPage(pageNumber, productsPerPage))
  };

  const searchProductByName = () => {
    dispatch(getProductByName(search));
    setShowArrow(true);
  };

  const navigateBack = () => {
    dispatch(getAllProductsByPage(1, productsPerPage));
    setShowArrow(false);
    // setSearch("");
  };

  useEffect(() => {
    /* fetchProducts(); */
  }, [filterType, alphabeticalOrder, search]);

  useEffect(() => {
    dispatch(getAllProductsByPage(currentPage, productsPerPage));
    async function fetchType() {
      try {
        const response = await axios.get(
          "https://serverwellnestclinic.onrender.com/presentation-type"
        );
        setType(response.data);
      } catch (error) {
        console.error("Error fetching type:", error);
      }
    }

    fetchType();
  }, []);

  // useEffect(() => {
  //   if (search.trim().length <= 0) {
  //     dispatch(getAllProducts());
  //     setShowArrow(false);
  //   }
  // }, [search]);

  const handleFilterType = async (selectedType) => {
    setFilterType(selectedType);
    dispatch(getProductsFilter(selectedType, null));
  };

  const changeAlphabeticalOrder = async () => {
    if (alphabeticalOrder === "asc") {
      setAlphabeticalOrder("desc");
    } else {
      setAlphabeticalOrder("asc");
    }
    dispatch(getProductsFilter(filterType, alphabeticalOrder, "name"));
  };

  const changePriceOrder = async () => {
    if (priceOrder === "asc") {
      setPriceOrder("desc");
    } else {
      setPriceOrder("asc");
    }

    dispatch(getProductsFilter(filterType, priceOrder, "price"));
  };
  
  
  const changeRatingOrder = async () => {
    if (ratingOrder === "asc") {
      setRatingOrder("desc");
    } else {
      setRatingOrder("asc");
    }
    
    dispatch(getProductsFilter(filterType, ratingOrder, "rating"));
  };
  return (
    <div className={styled.contenedorMayor}>
   <div className={styled.contenedor}>
        <div className={styled.containerCards}>
      <div className={styled.filterType}>
        <select
          id={styled.selectType}
          value={filterType}
          onChange={(e) => handleFilterType(e.target.value)}
        >
          <option value="">Type (all)</option>
          {type.map((t) => (
            <option className={styled.letra} key={t.id} value={t.id}>
              {t.type}
            </option>
          ))}
        </select>

        <button id={styled.order} onClick={changeAlphabeticalOrder}>
          Name ({alphabeticalOrder === "asc" ? "z-a" : "a-z"})
        </button>

        <button id={styled.order} onClick={changePriceOrder}>
          Price ({priceOrder === "asc" ? "max-min" : "min-max"})
        </button>

        <button id={styled.order} onClick={changeRatingOrder}>
        Rating ({ratingOrder === "asc" ? "5-1" : "1-5"})
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
    </div>
    <div className={styled.paginado}>
        <Paginado
         productsPerPage={productsPerPage}
         allProducts={allProducts}
         currentPage={currentPage}
         paginado={paginado}
       />
       {showArrow && (
         <button onClick={navigateBack} className={styled.arrow}>
           &larr; All products
         </button>
       )}
       </div>
    </div>
  );
}

export default PharmacyComp;
