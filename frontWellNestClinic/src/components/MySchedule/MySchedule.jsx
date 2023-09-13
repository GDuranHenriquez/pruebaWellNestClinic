import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './MySchedule.module.css';
import { useSelector } from 'react-redux';

const MySchedule = () => {
    const [schedule, setSchedule] = useState([]);
    const user = useSelector((state) => state.user)
    const userId = user.id;

    useEffect(() => {
        const fetchAppointments = async () => {
            try {

                const response = await axios.get(`https://serverwellnestclinic.onrender.com/appointment/byUser/?userId=${userId}`);
                if (Array.isArray(response.data)) {
                    setSchedule(response.data);
                } else {
                    setSchedule([]);
                }

            } catch (error) {
                console.error('Error al obtener las citas médicas:', error);
            }
        };

        fetchAppointments();
    }, [userId]);

    const handleCancelSchedule = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas cancelar esta cita?');

        if (confirmDelete) {
            try {
                await axios.delete(`https://serverwellnestclinic.onrender.com/appointment/${id}`);
                const updatedSchedule = schedule.filter((item) => item.id !== id);
                setSchedule(updatedSchedule);
            } catch (error) {
                console.error('Error al cancelar la cita médica:', error);
            }
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>My Schedule</h2>
            {schedule.length === 0 ? (
                <div className={styles.containerSection}>
                    <p className={styles.noAppointments}>You don't have any scheduled appointments</p>
                </div>
            ) : (

                <div className={styles.containerSection}>
                    <ul className={styles.scheduleList}>


                        <li className={styles.appointment}>
                            <span className={styles.date}>Date</span>
                            <span className={styles.date}>Schedule</span>
                            <span className={styles.date}>Doctor</span>
                            <span className={styles.date}>Specialty</span>
                            <span className={styles.date}></span>


                        </li>

                    </ul>
                    <ul className={styles.scheduleList}>

                        {schedule.map((appointment) => (
                            <li key={appointment.id} className={styles.appointment}>
                                <span className={styles.date}>{appointment.date}</span>
                                <span className={styles.time}>{appointment.startTime}</span>
                                <span className={styles.doctor}>
                                    {`${appointment.Appointment_Doctor.name} ${appointment.Appointment_Doctor.lastName}`}
                                </span>
                                <span className={styles.specialty}>{appointment.Appointment_Doctor.specialty}</span>
                                <button
                                    className={styles['cancel-button']}
                                    onClick={() => handleCancelSchedule(appointment.id)}
                                >
                                    Cancel appointment
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className={styles.buttons}>
                <Link to="/makeAppointment" className={styles.newScheduleButton}>
                    Make a new appointment
                </Link>

                <Link to="/home" className={styles.newScheduleButton}>
                    Back to home
                </Link>
            </div>
        </div>
    );
};

export default MySchedule;
