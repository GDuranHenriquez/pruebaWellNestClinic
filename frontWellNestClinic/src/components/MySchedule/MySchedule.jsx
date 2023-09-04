import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./MySchedule.module.css";

const MySchedule = () => {
    const [schedule, setSchedule] = useState([
        { id: 1, date: '2023-09-12', doctor: 'Jorge Fernandez', especialidad: "Endocrinologia" },
        { id: 2, date: '2023-09-11', doctor: 'Dr. Johnson', especialidad: "Cardiólogo" },
        { id: 3, date: '2023-09-11', doctor: 'Dr. Johnson', especialidad: "Oftalmólogo" },
        { id: 4, date: '2023-09-11', doctor: 'Dr. Johnson', especialidad: "Urólogo" }
    ]);

    const handleCancelSchedule = (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas cancelar esta cita?');

        if (confirmDelete) {
            const updatedSchedule = schedule.filter(schedule => schedule.id !== id);
            setSchedule(updatedSchedule);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>My Schedules</h2>
            {schedule.length === 0 ? (
                <div className={styles.containerSection}>
                    <p className={styles.noAppointments}>Usted no posee citas agendadas</p>
                </div>
            ) : (
                <div className={styles.containerSection}>
                    <ul className={styles.scheduleList}>
                        {schedule.map(schedule => (
                            <li key={schedule.id} className={styles.appointment}>
                                <span className={styles.date}>{schedule.date}</span>
                                <span className={styles.doctor}>{schedule.doctor}</span>
                                <span className={styles.specialty}>{schedule.especialidad}</span>
                                <button className={styles['cancel-button']} onClick={() => handleCancelSchedule(schedule.id)}>
                                    Cancelar Cita
                                </button>
                            </li>
                        ))}
                    </ul>



                </div>
            )}

            <div className={styles.buttons}>
                <Link  to="/makeAppoiment" className={styles.newScheduleButton}>
                    Make a new appointment
                </Link>

                <Link  to="/home" className={styles.newScheduleButton}>
                    Back to home
                </Link>
            </div>           

        </div>
    );
};

export default MySchedule;