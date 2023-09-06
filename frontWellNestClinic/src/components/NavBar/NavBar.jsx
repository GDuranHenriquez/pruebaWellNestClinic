import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./NavBar.module.css";
import {IconLogout, IconUserDown} from "@tabler/icons-react";

function NavBar() {
  return (
    <nav>

      <img className={styles.logo} src="/imagenes/Logo.jpg" alt="logo" />
      <div className={styles.menu}>
        
        <Link to="/home" className={styles.linkNoUnderline}>Home </Link>
        <Link to="/doctors" className={styles.linkNoUnderline}>Make an appointment</Link>
        <Link to="/appointments" className={styles.linkNoUnderline}>My medical appointments</Link>
        <Link to="/pharmacy" className={styles.linkNoUnderline}>Pharmacy</Link>
        <Link to="/my-profile" className={styles.iconUserDownLink}>
        <IconUserDown className={styles.iconUserDown}/>
        </Link>
        <Link to= "/">
        <IconLogout className={styles.iconLogout}/>
        </Link>
      </div>
      
    </nav>
  );
}

export default NavBar;