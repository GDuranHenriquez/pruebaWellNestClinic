import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfilePicture, updateUserPassword, payMembership, cancelMembership } from '../../redux/actions'
import styles from "./MyProfile.module.css";

function MyProfile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user); 

  const handleChangeProfilePicture = () => {

    const newProfilePicture = 'new-profile-picture.jpg'; 
    dispatch(updateUserProfilePicture(newProfilePicture)); 
  };

  const handleChangePassword = () => {
    const newPassword = 'newPassword123'; 
    dispatch(updateUserPassword(newPassword)); 
  };

  const handlePayMembership = () => {
    dispatch(payMembership()); 
  };

  const handleCancelMembership = () => {
    dispatch(cancelMembership());
  };

  return (
    <div className={styles.profileContainer}>
      <h2>Mi Perfil</h2>
      <div className={styles.profileInfo}>
        <div className={styles.profilePicture}>
          <img src={user.profilePicture} alt="Foto de perfil" />
          <button onClick={handleChangeProfilePicture}>Change Profile Picture</button>
        </div>
        <div className={styles.profileDetails}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email Address:</strong> {user.email}</p>
          <p><strong>Bitrhdate:</strong> {user.birthDate}</p>
          <p><strong>Membership Status:</strong> {user.membershipStatus}</p>
          <button onClick={handleCancelMembership}>Cancel Membership</button>
          <button onClick={handleChangePassword}>Change Password</button>
          <button onClick={handlePayMembership}>Pay Membership</button>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;