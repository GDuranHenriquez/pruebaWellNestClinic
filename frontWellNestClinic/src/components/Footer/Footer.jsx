import React from 'react';
import styles from './Footer.module.css';
import {IconBrandWhatsapp, IconBrandInstagram, IconBrandFacebook, IconBrandTelegram} from "@tabler/icons-react";

function Footer() {
  return (
    <footer className={styles.footer}>
      {/* <div className={styles.texto}>
        <p>Enjoy your time on our Health and Pharmacy page!</p>
      </div> */}
      {/* <div className={styles.texto}>
        <p>Our social networks:</p>
        <IconBrandWhatsapp className={styles.iconWhatsapp} size={40}/> <IconBrandInstagram className={styles.iconInstagram} size={40}/> <IconBrandFacebook size={40}/> <IconBrandTelegram className={styles.iconTelegram}size={40}/>
      </div> */}
      <div className={styles.texto}>
        <p>Contact us:</p>
        <p>Telephone Number : 263-841-5555</p>
        <p>Email Address: info@wellnestclinic.com</p>
      </div>
    </footer>
  );
}

export default Footer;