/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpecialties, doctorFiltering, allSchedule, createAppointment } from "../../redux/action/actions";
import { useAuth } from "../../Authenticator/AuthPro";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styles from "./makeAppoiment.module.css";
import dayjs from "dayjs";

const MakeAppoiment = () => {
  const lastMonday = dayjs().startOf('week');
  const nextSunday = dayjs().endOf('week').startOf('day');
  const tomorrow = dayjs().add(1, 'day');

  const dispach = useDispatch();
  const speciality = useSelector((state) => state.specialities);
  const filteredDoctors = useSelector((state) => state.filteredDoctors);
  const schedule = useSelector((state) => state.schedule)
  const auth = useAuth();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    specialty: "dontSelect",
    physician: "dontSelect",
    date: "",
    schedule: 'dontSelect'
  });
  const [selectedName, setSelectedName] = useState({
    specialty: "",
    physician: "",
  }); 
  
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    dispach(getSpecialties());
  }, []);

  const handleDateChange = (newDate) => {
    setFormData({ ...formData, date: newDate.$d });
  };

  useEffect(() => {
    const fullDate = new Date(formData.date);
    const month = fullDate.getMonth() + 1;
    const thisFormattedDate = `${fullDate.getFullYear()} ${month} ${fullDate.getDate()}`;
    setFormattedDate(thisFormattedDate)
  }, [formData]);  

  const nextStep = () => {
    if (step === 1 && formData.specialty === "dontSelect") {
      alert("You must select a specialty");
    } else if (step === 2 && formData.physician === "dontSelect") {
      alert("You must select a physician");
    }else {
      dispach(doctorFiltering(formData.specialty.name));
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  }; 

  const prevStepSchedule = () => {
    if (step === 3 && formData.date === "") {
      alert("You must select a date");
    } else {
      dispach(allSchedule({doctor: formData.physician.id,
        userClient: auth.user.id,
        date: formattedDate
      })).then((data) => {
        nextStep();        
      })
    }
  }

  const nextStepFinal = () => {
    setStep(step + 1);
  }

  const confirmAppointment = () => {
    if (formData.schedule) {
      const año = formData.date.getFullYear(); 
      const mes = formData.date.getMonth() + 1; 
      const dia = formData.date.getDate(); 
      const dateAppointment = `${año}-${mes}-${dia}`
      const data = {
        doctor: formData.physician.id,
        userClient: auth.user.id,
        date: dateAppointment,
        startTime: formData.schedule,
        speciality: formData.specialty.id
      }
      dispach(createAppointment(data));
    }
    setStep(step + 1);
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target;    
    if(name === 'specialty' || name === 'physician'){
      const idOpcionSeleccionada = e.target.options[e.target.selectedIndex].id;
      const selected = {name: value, id: idOpcionSeleccionada}
      setSelectedName({ ...selectedName, [name]: value });
      setFormData({ ...formData, [name]: selected });
    }else{
      setSelectedName({ ...selectedName, [name]: value });
      setFormData({ ...formData, [name]: value });
    }        
  };

  const isWeekend = (date) => {
    const today = new Date();
    if(date){
      var endWek = date.day();
    }    
    //return day === 0 || day === 6;
    return  endWek === 0 || endWek === 6;
  };

  /* const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.containerData}>
            <h1>Choose a specialty</h1>
            <select
              name="specialty"
              value={selectedName.specialty}
              onChange={handleSelectChange}
            >
              <option value="dontSelect">Select specialty</option>
              {speciality.map((data) => {
                return (
                  <option key={data.id} value={data.name}>
                    {data.name}
                  </option>
                );
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
              id = {selectedName}
            >
              <option value="dontSelect">Select Physician</option>
              {filteredDoctors.map((doctor) => {
                return (
                  <option
                    key={doctor.id}
                    value={`${doctor.id}`}
                  >{`${doctor.name} ${doctor.lastName}`}</option>
                );
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Basic date picker"
                  shouldDisableDate={isWeekend}
                  value={new Date('')}
                  onChange={handleDateChange}
                  minDate={tomorrow}
                />
              </DemoContainer>
            </LocalizationProvider>
            <div className={styles.containerSelectButtons}>
              <button className={styles.buttonBackNext} onClick={prevStep}>
                Back
              </button>
              <button className={styles.buttonBackNext} onClick={prevStepSchedule}>
                Next
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className={styles.containerData}>
            <h1>Confirm Date</h1>
            <h2>Specialty: {formData.specialty}</h2>
            <h2>Physician: {formData.physician}</h2>
            <h2>Choose a date: {formData.date.toLocaleDateString()}</h2>
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
  }; */

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.containerData}>
            <h1>Choose a specialty</h1>
            <select
              name="specialty"
              value={selectedName.specialty}
              onChange={handleSelectChange}
            >
              <option value="dontSelect">Select specialty</option>
              {speciality.map((data) => {
                return (
                  <option key={data.id} value={data.name} id={data.id}>
                    {data.name}
                  </option>
                );
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
            <h1>Choose a doctor</h1>
            <select
              name="physician"
              value={selectedName.physician}
              onChange={handleSelectChange}
            >
              <option value="dontSelect">Doctors</option>
              {filteredDoctors.map((doctor) => {
                return (
                  <option
                    key={doctor.id}
                    value={`${doctor.name} ${doctor.lastName}`}
                    id={doctor.id}
                  >{`${doctor.name} ${doctor.lastName}`}</option>
                );
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Basic date picker"
                  shouldDisableDate={isWeekend}
                  value={new Date('')}
                  onChange={handleDateChange}
                  minDate={tomorrow}
                />
              </DemoContainer>
            </LocalizationProvider>
            <div className={styles.containerSelectButtons}>
              <button className={styles.buttonBackNext} onClick={prevStep}>
                Back
              </button>
              <button className={styles.buttonBackNext} onClick={prevStepSchedule}>
                Next
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className={styles.containerData}>
            <h1>Select Schedule</h1>
            <select
              name="schedule"
              value={selectedName.schedule}
              onChange={handleSelectChange}
            >
              <option value="dontSelect">Select Schedule</option>
              {schedule.scheduleString?.map((data, index) => {
                return (
                  <option
                    key={index}
                    value={`${data}`}
                  >{`${data}`}</option>
                );
              })}
            </select>
            <div className={styles.containerSelectButtons}>
              <button className={styles.buttonBackNext} onClick={prevStep}>
                Back
              </button>
              <button className={styles.buttonBackNext} onClick={nextStepFinal}>
                Next
              </button>
            </div>
          </div>
        )
      case 5:
        return (
          <div className={styles.containerData}>
            <h1>Confirm Date</h1>
            <h2>Specialty: {formData.specialty.name}</h2>
            <h2>Physician: {formData.physician.name}</h2>
            <h2>Choose a date: {formData.date.toLocaleDateString()}</h2>
            <h2>Schedule: {formData.schedule}hs</h2>
            <div className={styles.containerSelectButtons}>
              <button className={styles.buttonBackNext} onClick={prevStep}>
                Back
              </button>
              <button className={styles.buttonBackNext} onClick={confirmAppointment}>
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
          <h1>Schedule an appointment</h1>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default MakeAppoiment;
