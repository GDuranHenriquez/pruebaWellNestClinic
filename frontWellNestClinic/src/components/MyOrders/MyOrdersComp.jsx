import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styles from './myOrdersComp.module.css';
import CartSale from './CartSale/CartSale';

function MyOrdersComp() { 
  const allSale = useSelector((state) => state.allSale)

  return (
    <div className={styles.myOrdersContainer}>
      <h2 className={styles.myOrdersTitle}>My Orders</h2>
      <ul className={styles.myOrderList}>
        {allSale.map((order, index) => ( 
          <CartSale key={index} sale = {order} ></CartSale>
         ))}        
      </ul>
    </div>
  );
}

export default MyOrdersComp;