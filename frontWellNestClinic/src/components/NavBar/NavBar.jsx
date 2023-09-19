import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { IconLogout, IconUserDown } from "@tabler/icons-react";
import { useAuth } from "../../Authenticator/AuthPro";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { IconShoppingCart } from "@tabler/icons-react";
import PropTypes from "prop-types";


function NavBar() {
  const location = useLocation();
  const routespages = ["pharmacy", "product", "my-cart"];
  const [isFarmacy, setIsFarmacy] = useState(0);


  const navBarCondition = (arr, location) => {
    for (let i = 0; i < arr.length; i++) {
      if (location.includes(arr[i])) {
        setIsFarmacy(1)
        return;
      }
    }
    setIsFarmacy(0);
    return;
  };

  const auth = useAuth();
  const logout = async () => {
    try {
      const endPoint = import.meta.env.VITE_BASENDPOINT_BACK + "/sing-out";
      const refreshToken = auth.getRefreshToken();
      const response = await axios.delete(endPoint, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        data: null,
      });
      if (response.status === 200) {
        auth.signOut();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    navBarCondition(routespages, location.pathname);
  }, [location])

  return (
    <>
      {isFarmacy === 1 ? (
        <NavBarPharmacy logout={logout} />
      ) : (
        <NavBarPrincipal logout={logout} />
      )}
    </>
  );
}

function NavBarPrincipal({ logout }) {
  return (
    <nav className={styles.navSup}>
      <Link to="/home">
        <img className={styles.logo} src="/imagenes/Logo.jpg" alt="logo" />
      </Link>
      <div className={styles.menu}>
        <Link to="/home" className={styles.linkNoUnderline}>
          Home{" "}
        </Link>
        <Link to="/makeAppointment" className={styles.linkNoUnderline}>
          Make an appointment
        </Link>
        <Link to="/appointments" className={styles.linkNoUnderline}>
          My appointments
        </Link>
        <Link to="/doctors" className={styles.linkNoUnderline}>
          Doctors
        </Link>
        <Link to="/pharmacy" className={styles.linkNoUnderline}>
          Pharmacy
        </Link>
        <Link to="/about-us" className={styles.linkNoUnderline}>
          About Us
        </Link>
        <Link to="/my-profile" className={styles.iconUserDownLink}>
          <IconUserDown className={styles.iconUserDown} />
        </Link>
        <Link onClick={logout} to="#">
          <IconLogout className={styles.iconLogout} />
        </Link>
      </div>
    </nav>
  );
}

NavBarPrincipal.propTypes = {
  logout: PropTypes.func.isRequired,
};

NavBarPharmacy.propTypes = {
  logout: PropTypes.func.isRequired,
};

function NavBarPharmacy({ logout }) {
  return (
    <nav className={styles.navSup}>
      <Link to="/pharmacy">
        <img className={styles.logo} src="/imagenes/Logo.jpg" alt="logo" />
      </Link>
      <div className={styles.menu}>
        <Link to="/pharmacy" className={styles.linkNoUnderline}>
          Pharmacy{" "}
        </Link>
        <Link to="/my-orders" className={styles.linkNoUnderline}>
          My Orders
        </Link>
        <Link to="/home" className={styles.linkNoUnderline}>
          WellNest Clinic
        </Link>
        <Link to="/my-cart" className={styles.iconUserDownLink}>
          <IconShoppingCart className={styles.iconUserDown} />
        </Link>
        <Link onClick={logout} to="#">
          <IconLogout className={styles.iconLogout} />
        </Link>
      </div>
    </nav>
  );
}
export default NavBar;
