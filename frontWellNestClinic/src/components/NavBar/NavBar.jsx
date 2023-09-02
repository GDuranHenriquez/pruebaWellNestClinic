import { Link } from 'react-router-dom';
import styles from "./NavBar.module.css";
import {IconLogout, IconUserDown} from "@tabler/icons-react";
import logo from '../../assets/logo.png'

function NavBar() {
  return (<div className={styles.containerNav}>
    <nav className={styles.navSup}>

      <img className={styles.logo} src={logo} alt="logo" />

      <div className={styles.menu}>        
        <Link id={styles.links} to="/home">Home</Link>
        <Link id={styles.links} to="/makeAppoiment">Make an appointment</Link>
        <Link id={styles.links} to="/appointments">My medical appointments</Link>
        <Link id={styles.links} to="/pharmacy">Pharmacy</Link>
        <Link id={styles.links} to="/my-profile" className={styles.iconUserDownLink}>
        <IconUserDown className={styles.iconUserDown}/>
        </Link>
        <IconLogout className={styles.iconLogout}/>
      </div>
      
    </nav>
  </div>
    
  );
}

export default NavBar;