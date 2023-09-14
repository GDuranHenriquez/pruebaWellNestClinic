import React from 'react';
import styles from './Footer.module.css';


function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.texto}>
        <p>Clinic address: Berry Hill 6723, Nashville, Tennessee</p>
        <p>Phone number : 263-841-5555</p>
        <p>Email address: info@wellnestclinic.com</p>
      </div>
    </footer>
  );
}

export default Footer;