import React from "react";
import styles from "./About.module.css"

const AboutUs = () => {
   return ( 
    <div className={styles.container}>
   <h1 className={styles.about}>About us</h1>
<div className={styles.texto}>


   <div className={styles.containerSub1}><h3 className={styles.subt}>Our mission</h3>
   <p className={styles.p}>At WellNest Clinic, we are driven by a single mission: Above all else, we are committed to the care and improvement of human life.
 We strive to provide patient-centered healthcare with excellence in quality, service, and access. <br></br>
 We want to be a community in which all people achieve their full potential for health and well-being across the lifespan.  We work to be trusted by patients, a valued partner in the community, and creators of positive change.
 </p></div>

   <div className={styles.containerSub2}>   <h3 className={styles.subt2}>Our story</h3>
   <p className={styles.p}>Many things set WellNest Clinic apart from other healthcare organizations; however, at our core, our greatest strength is our people.
   <br></br>
   As a learning health system, WellNest Clinic analyzes data from more than 37 million patient encounters each year. This data helps develop technologies and best practices that improve patient care.
   <br></br>
   We are proud of the impact we have in our communities through employment, investment and charitable giving.
   <br></br>
   In 2022, we spent $4.4 billion on capital investment in land, buildings and equipment. In addition, WellNest Clinic pays significant taxes that help revitalize communities.
 
   <br></br>
   We also provided charity care, uninsured discounts and other uncompensated care at an estimated cost of $3.5 billion in 2022.
   <br></br>
   At WellNest Clinic, we are excited about the future of medicine. We believe we are uniquely positioned to play a leading role in the transformation of care.
   </p></div>

   </div>
   </div>
   )
}
export default AboutUs;