/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpeciality, doctorFiltering } from "../../redux/action/actions";
import Footer from '../../components/Footer/Footer';
import styles from "./makeAppoiment.module.css";

const MakeAppoiment = () => {
  const dispach = useDispatch()
  const speciality = useSelector((state) => state.allSpeciality);
  const filteredDoctors = useSelector((state) => state.filteredDoctors);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    specialty: "dontSelect",
    physician: "dontSelect",
    date: "",
  });
  const [selectedName, setSelectedName] = useState({
    specialty: "",
    physician: "",
  });

  useEffect(() => {
    dispach(getSpeciality());
  }, []);

  const handleDateChange = (e) => {
    const selected = new Date(e.target.value);

    if (selected.getDay() === 5 || selected.getDay() === 0) {
      alert("No puedes seleccionar sábados ni domingos.");
    } else {
      setFormData({ ...formData, date: e.target.value });
    }
  };

  const nextStep = () => {
    if (step === 1 && formData.specialty === "dontSelect") {
      alert("I don't select a specialty");
    } else if(step === 2 && formData.physician === "dontSelect") {
      alert("I don't select a physician");
    } else if(step === 3 && formData.date === "") {
      alert("I don't select a date");
    }else {
      dispach(doctorFiltering(formData.specialty));
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelectedName({ ...selectedName, [name]: value });
    setFormData({ ...formData, [name]: value });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.containerData}>
            <h1>Select Speciality</h1>
            <select
              name="specialty"
              value={selectedName.specialty}
              onChange={handleSelectChange}
            >
              <option value="dontSelect">Select Speciality</option>
              {speciality.map((data) => {
                return(
                <option key={data.id} value={data.name}>{data.name}</option>
                )
              })}
            </select>
            <div className={styles.containerSelectButtons}>
              <button className={styles.buttonFirstBack}>Back</button>
              <button className={styles.buttonBackNext} onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.containerData}>
            <h1>Select Physician</h1>
            <select
              name="physician"
              value={selectedName.physician}
              onChange={handleSelectChange}
            >
              <option value="dontSelect">Select Physician</option>
              {filteredDoctors.map((doctor) => {
                return(
                  <option key={doctor.id} value={`${doctor.name} ${doctor.lastName}`}>{`${doctor.name} ${doctor.lastName}`}</option>
                )
              })}
            </select>
            <div className={styles.containerSelectButtons}>
              <button className={styles.buttonBackNext} onClick={prevStep}>
                Back
              </button>
              <button className={styles.buttonBackNext} onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={styles.containerData}>
            <h1>Choose a date</h1>
            <input
              type="date"
              name="date"
              value={formData.date}
              min="2023-09-01"
              max="2023-09-15"
              onChange={handleDateChange}
            />
            <div className={styles.containerSelectButtons}>
              <button className={styles.buttonBackNext} onClick={prevStep}>
                Back
              </button>
              <button className={styles.buttonBackNext} onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className={styles.containerData}>
            <h1>Confirm Date</h1>
            <h2>Speciality: {formData.specialty}</h2>
            <h2>Physician: {formData.physician}</h2>
            <h2>Choose a date: {formData.date}</h2>
            <div className={styles.containerSelectButtons}>
              <button className={styles.buttonBackNext} onClick={prevStep}>
                Back
              </button>
              <button className={styles.buttonBackNext} onClick={nextStep}>
                Confirm
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className={styles.containerData}>
            <h2>Scheduled Appointment</h2>
            <NavLink to={"/home"}>
              <button className={styles.buttonBackNext}>Home</button>
            </NavLink>
          </div>
        );
    }
  };

  return (
    <div className={styles.containerMakeAppoiment}>     
      <div className={styles.containerSection}>
        <div className={styles.containerTitle}>
          <h1>Make an appointment</h1>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default MakeAppoiment;