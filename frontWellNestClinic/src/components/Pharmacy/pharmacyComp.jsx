import { useState, useEffect } from "react";
import axios from "axios";
import styled from "./pharmacyComp.module.css";
import { useDispatch } from "react-redux";
import {
  getProductsFilter,
  getCart
} from "../../redux/action/actions";
import { useAuth } from "../../Authenticator/AuthPro";




function PharmacyComp() {
  
  const [filterType, setFilterType] = useState("");
  const [alphabeticalOrder, setAlphabeticalOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [priceOrder, setPriceOrder] = useState("asc");
  const [ratingOrder, setRatingOrder] = useState("asc");
  const isAuth = useAuth();
  const user = isAuth.user;

  const [type, setType] = useState([]);
  const dispatch = useDispatch();

  const searchProductByName = () => {
    dispatch(getProductsFilter(filterType, priceOrder, "price", search));
  };



  useEffect(() => {
    /* fetchProducts(); */
  }, [filterType, alphabeticalOrder, search]);

  useEffect(() => {
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
    dispatch(getCart(user.id));
  }, []);

  // useEffect(() => {
  //   if (search.trim().length <= 0) {
  //     dispatch(getAllProducts());
  //     setShowArrow(false);
  //   }
  // }, [search]);

  const handleFilterType = async (selectedType) => {
    setFilterType(selectedType);
    dispatch(getProductsFilter(selectedType, null, null, search));
  };

  const changeAlphabeticalOrder = async () => {
    if (alphabeticalOrder === "asc") {
      setAlphabeticalOrder("desc");
    } else {
      setAlphabeticalOrder("asc");
    }
    dispatch(getProductsFilter(filterType, alphabeticalOrder, "name", search));
  };

  const changePriceOrder = async () => {
    if (priceOrder === "asc") {
      setPriceOrder("desc");
    } else {
      setPriceOrder("asc");
    }

    dispatch(getProductsFilter(filterType, priceOrder, "price", search));
  };


  const changeRatingOrder = async () => {
    if (ratingOrder === "asc") {
      setRatingOrder("desc");
    } else {
      setRatingOrder("asc");
    }

    dispatch(getProductsFilter(filterType, ratingOrder, "rating", search));
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
      {/* <div className={styled.paginado}>
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
       </div> */}
    </div>
  );
}

export default PharmacyComp;
