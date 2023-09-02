import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import styles from './Home.module.css';

function Home() {

  return (
    <div className={styles.fondo}>
        <div className={styles.pad}>
      <NavBar />
      <div className={styles.msg}>
        <div className={styles.contenedor}>
      <h1 className={styles.h1}>WELCOME TO WELLNEST CLINIC</h1>
      <h2>Browse through our selection of pharmaceutical products with the reassurance that each item has been carefully chosen to meet the highest quality standards.</h2>
      <h2>We invite you to explore our website, take advantage of our resources, and discover how you can take informed and proactive control of your health.</h2>
      </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Home;