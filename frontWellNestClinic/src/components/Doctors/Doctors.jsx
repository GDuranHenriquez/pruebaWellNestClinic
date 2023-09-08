import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Doctors.module.css";
import { getDoctors, getSpecialties } from '../../redux/action/actions';
import Loading from "../Loading/Loading"

const Doctors = () => {
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    const doctors = useSelector(state => state.doctors);
    const specialities = useSelector(state => state.specialities);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(false);
        dispatch(getDoctors());
        dispatch(getSpecialties());
    }, [isLoading]);


    const filteredDoctors = doctors.filter(doctor => {
        if (!selectedSpecialty) {
            return true;
        }
        return doctor.specialities.some(speciality => speciality.name === selectedSpecialty);
    });


    return (
        
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                    <option value="">All specialties</option>
                    {specialities.map(speciality => (
                        <option key={speciality.id} value={speciality.name}>
                            {speciality.name.charAt(0).toUpperCase() + speciality.name.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.doctorcards}>
                {filteredDoctors.map(doctor => (
                    <div key={doctor.id} className={styles.doctorcard}>
                        <h2>{doctor.name} {doctor.lastName}</h2>
                        <h3>Specialty:</h3>
                        <ul>
                            {doctor.specialities.map(speciality => (
                                <li key={speciality.id}>{speciality.name.charAt(0).toUpperCase() + speciality.name.slice(1)}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            {isLoading && (
       <Loading></Loading>
      )}
        </div>
    );
};

export default Doctors;
