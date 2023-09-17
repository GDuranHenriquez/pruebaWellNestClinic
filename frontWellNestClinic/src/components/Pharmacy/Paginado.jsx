import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({
productsPerPage,
  allProducts,
  currentPage,
  paginado,
}) {
  const pageNumbers = [];

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

  return (
    <nav>
      <ul className={style.paginado}>
        <li className={`${style.arrow} ${currentPage === 1 ? style.disabled : ""}`}>
          <a onClick={handlePrevClick}>&lt;</a>
        </li>
        {pageNumbers && pageNumbers.map((number) => (
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
    </nav>
  );
}
