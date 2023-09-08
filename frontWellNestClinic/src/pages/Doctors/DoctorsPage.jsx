import Doctors from "../../components/Doctors/Doctors";
import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import styles from "./DoctorsPage.module.css"

function DoctorsPage() {
  return (
    <div className={styles.divContainer}>
      <BackGroundGlobal imgBackGround="https://gacetamedica.com/wp-content/uploads/2021/10/GettyImages-1201500582.jpg"></BackGroundGlobal>
      <Doctors></Doctors>
    </div>
  );
}

export default DoctorsPage;