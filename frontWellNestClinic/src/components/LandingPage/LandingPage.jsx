
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css"


const LandingPage = () => {
    return (
    <div className={styles.container}>
        <div className={styles.containerSection}>
            <h1 className={styles.heading}>Welcome to WellNest Clinic</h1>
            <p className={styles.description}>Transform your medical experience with us</p>

            <div className={styles.buttoncontainer}>
                <Link to="/checkUser" className={styles.button}>Sign Up</Link>
                <Link to="/login" className={styles.button}>Log In</Link>
            </div>
        </div>
        </div>
    );
};

export default LandingPage;