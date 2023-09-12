import React from 'react';
import styles from './PurchaseDetail.module.css';

const PurchaseDetails = () => {
  return (
    <div className={styles.container}>
    <div className={styles.title}>
      <h1>WellNest Clinic Pharmacy</h1></div>
      <div className={styles.heading}>
      <h2>Invoice</h2></div>
      <hr />

      <div className={styles.product}>
        <p> Loratadina CALOX 10mg </p></div>

      <div className={styles.productDetail}>
      <div className={styles.label}>Price:</div>
        <div className={styles.value}>$15.99</div>

        <div className={styles.label}>Plan:</div>
        <div className={styles.value}>Gold</div>

        <div className={styles.label}>Discount:</div>
        <div className={styles.value}>10%</div>
      </div>
      </div>
      
  )
};

export default PurchaseDetails;




