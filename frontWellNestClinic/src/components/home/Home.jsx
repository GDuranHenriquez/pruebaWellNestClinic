import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import styles from './Home.module.css';
import {IconLogout, IconUserDown} from "@tabler/icons-react";

function Home() {

  return (
    <div className={styles.fondo}>
      <img className={styles.logo} src="/imagenes/Logo.jpg" alt="logo" />
        <div className={styles.pad}>
      <NavBar />
      <div className={styles.msg}>
        <div className={styles.contenedor}>
      <h1 className={styles.h1}>WELCOME TO WELLNEST CLINIC</h1>
      <h2>We invite you to explore our site, where you will be able to schedule appointments with your doctors and purchase any pharmacy products quickly and easily.</h2>
      <h2>Our operating hours are from Monday to Sunday from 8:00 am to 8:00 pm. </h2>
      <h2>At WellNest Clinic we seek to exceed the expectations of our members with humanism and quality.</h2>
      </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Home;