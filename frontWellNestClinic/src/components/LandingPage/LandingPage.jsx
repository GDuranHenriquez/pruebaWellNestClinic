
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css"


const LandingPage = () => {
    return (
    <div className={styles.container}>
        <div className={styles.containerSection}>
            <h1 className={styles.heading}>Bienvenido a WellNest Clinic</h1>
            <p className={styles.description}>Transforma tu experiencia médica con nosotros.</p>

            <div className={styles.buttoncontainer}>
                <Link to="/checkUser" className={styles.button}>SignUp</Link>
                <Link to="/login" className={styles.button}>LogIn</Link>
            </div>
        </div>
        </div>
    );
};

export default LandingPage;