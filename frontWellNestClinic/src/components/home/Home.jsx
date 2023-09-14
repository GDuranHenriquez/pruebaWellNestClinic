import Footer from '../../components/Footer/Footer';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';


function Home() {

  return (
    <div className={styles.fondo}>
      {/* <img className={styles.logo} src="/imagenes/Logo.jpg" alt="logo" /> */}
      <div className={styles.pad}>
        <div className={styles.msg}>
          <h1 className={styles.h1}>Making Health Care Better Together</h1>
          <h2 className={styles.h2}>We invite you to explore our site, where you will be able to schedule appointments with your doctors and purchase any pharmacy products quickly and easily.
            <div>
              <span></span>
            </div>
            <div>Our operating hours are from Monday to Sunday from 8:00 am to 8:00 pm. </div>
            <div>At WellNest Clinic we seek to exceed the expectations of our members with humanism and quality.</div></h2>
        </div>

        <div className={styles.buttons}>
          <Link to="/makeAppointment" className={styles.newScheduleButton}>
            Make an <br></br> appointment
          </Link>

          <Link to="/about-us" className={styles.aboutUsButton}>
            Learn more <br></br> about us
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;