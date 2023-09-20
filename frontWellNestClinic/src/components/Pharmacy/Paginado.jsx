import React, { useState, useEffect } from "react";
import style from "./Paginado.module.css";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../Loading/Loading";
import {  
  getAllProductsByPage,  
} from "../../redux/action/actions";

export default function Paginado() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const indexOfLastproduct = currentPage * productsPerPage;
  const indexOfFirstproduct = indexOfLastproduct - productsPerPage;
  const [showArrow, setShowArrow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const allProducts = useSelector((state) => state.totalProducts);
  const pageNumbers = [];

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
    setIsLoading(true);
    dispatch(getAllProductsByPage(pageNumber, productsPerPage)).then((data) =>{
      setIsLoading(false);
    });
    
  };

  const navigateBack = () => {
    setIsLoading(true);
    dispatch(getAllProductsByPage(1, productsPerPage)).then((data) =>{
      setIsLoading(false);
    });
    // setSearch("");
  };

  for (let i = 0; i < Math.ceil(allProducts / productsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      paginado(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageNumbers.length) {
      paginado(currentPage + 1);
    }
  };

  useEffect(() => {
    setIsLoading(true);    
    dispatch(getAllProductsByPage(currentPage, productsPerPage)).then((data) =>{
      setIsLoading(false);
    });;
  }, []);

  return (
    <nav className={style.nav}>
      <ul className={style.paginado}>
        <li
          className={`${style.arrow} ${
            currentPage === 1 ? style.disabled : ""
          }`}
        >
          <a onClick={handlePrevClick}>&lt;</a>
        </li>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className={style.number} key={number}>
              <a
                onClick={() => paginado(number)}
                className={currentPage === number ? style.active : ""}
              >
                {number}
              </a>
            </li>
          ))}
        <li
          className={`${style.arrow} ${
            currentPage === pageNumbers.length ? style.disabled : ""
          }`}
        >
          <a onClick={handleNextClick}>&gt;</a>
        </li>
      </ul>
      {isLoading? <Loading></Loading>:''}
    </nav>
  );
}
