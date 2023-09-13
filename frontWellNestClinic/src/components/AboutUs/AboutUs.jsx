import React from "react";
import styles from "./About.module.css"

const AboutUs = () => {
   return ( 
    <div className={styles.container}>
   <div><h1 className={styles.h1}>About us</h1></div>

   <div><p className={styles.p}>WellNest Clinic cares for more than half a million patients a year, from across Kingston, Richmond, Elmbridge (Surrey), Merton, Wandsworth and Sutton. In 2018, we became the first acute hospital trust in London to be rated “Outstanding” for overall quality and leadership by the national Care Quality Commission regulator.</p></div>
   </div>
   )
}
export default AboutUs;