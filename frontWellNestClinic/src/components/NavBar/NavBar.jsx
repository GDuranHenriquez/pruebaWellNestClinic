import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./NavBar.module.css";
import {IconLogout, IconUserDown} from "@tabler/icons-react";

function NavBar() {
  return (
    <nav>

      <img className={styles.logo} src="/imagenes/Logo.jpg" alt="logo" />
      <div className={styles.menu}>
        
        <Link to="/home">Home</Link>
        <Link to="/doctors">Make an appointment</Link>
        <Link to="/appointments">My medical appointments</Link>
        <Link to="/pharmacy">Pharmacy</Link>
        <Link to="/my-profile" className={styles.iconUserDownLink}>
        <IconUserDown className={styles.iconUserDown}/>
        </Link>
        <IconLogout className={styles.iconLogout}/>
      </div>
      
    </nav>
  );
}

export default NavBar;