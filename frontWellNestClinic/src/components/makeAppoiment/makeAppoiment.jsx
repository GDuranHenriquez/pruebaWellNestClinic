/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styles from "./makeAppoiment.module.css";

const MakeAppoiment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    specialty: "",
    physician: "",
    date: "",
  });

  const [selectedName, setSelectedName] = useState({
    specialty: "",
    physician: "",
  });

  const minDate = "2023-09-01";
  const maxDate = "2023-09-15";

  const handleDateChange = (e) => {
    const selected = new Date(e.target.value);

    if (selected.getDay() === 5 || selected.getDay() === 0) {
      alert("No puedes seleccionar sábados ni domingos.");
    } else {
      setFormData({ ...formData, date: e.target.value });
    }
  };

  const nextStep = () => {
    setStep(step + 1);
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
            <h1>Select Specialty</h1>
            <select
              name="specialty"
              value={selectedName.specialty}
              onChange={handleSelectChange}
            >
              <option value="">Select Specialty</option>
              <option value="General Practitioner">General Practitioner</option>
              <option value="Traumatology">Traumatology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Dentist">Dentist</option>
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
              <option value="">Select Physician</option>
              <option value="Doc 1">Doc 1</option>
              <option value="Doc 2">Doc 2</option>
              <option value="Doc 3">Doc 3</option>
              <option value="Doc 4">Doc 4</option>
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
              min={minDate}
              max={maxDate}
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
            <h1>Confirm Data</h1>
            <h2>{formData.specialty}</h2>
            <h2>{formData.physician}</h2>
            <h2>{formData.date}</h2>
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
            <span>Formulario completado</span>
            <button className={styles.buttonBackNext}>Home</button>
          </div>
        );
    }
  };

  return (
    <div className={styles.containerConfirmShit}>     
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