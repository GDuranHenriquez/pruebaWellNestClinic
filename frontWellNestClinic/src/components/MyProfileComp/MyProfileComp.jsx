import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import style from './MyProfile.module.css';
import ImageUpload from '../ImageUpload/ImageUpload';
import validation from "../SignUp/Validation";
import { useAuth } from '../../Authenticator/AuthPro';
import { uploadImage } from "../../redux/action/actions";

function MyProfileComp() {
  const [isChangingProfilePicture, setIsChangingProfilePicture] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [error, setError] = useState({});
  const auth = useAuth();
  const dispatch = useDispatch();

  const userClient = useSelector((state) => state.user);

  const validationPassword = (userData) => {
    const error = {};
  
    if (
      !/(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-/])/.test(
        userData.password
      )
    ) {
      error.password =
        "Password must contain at least one number, one letter, and one special character";
    }  
    if (!(userData.password.length >= 8 && userData.password.length <= 32)) {
      error.password = "Password must have between 8 and 32 characters";
    }
  
    return error;
  };

  const changePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const errors = validationPassword({ password: newPassword });
      setError(errors);

      if (Object.keys(errors).length === 0){ 
        const data = {
          id: auth.user.id,
          password: currentPassword,
          newPassword: newPassword
        }
        dispatch(uploadImage(data))      
      }

    } catch (error) {
      console.error('Error changing password:', error);
      alert('Unable to change password.');
    } finally {
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };
  
  const toggleChangeProfilePicture = () => {
    setIsChangingProfilePicture(!isChangingProfilePicture);
    setIsChangingPassword(false);
  };

  const toggleChangePassword = () => {
    setIsChangingPassword(!isChangingPassword);
  };

  


  return (
    <div className={style.profileContainer}>
      <div className={style.userProfile}>
        <h1 id={style.fullName}>{userClient.name} {userClient.lastName}</h1>
        <p>{userClient.email}</p>
        <p>DNI: {userClient.dni}</p>
        <p>Date of Birth: {userClient.birthDate}</p>
        <p>Address: {userClient.address}</p>
        <p>Contact: {userClient.backupContact}</p>
        <p>Plan type and Status: {userClient.UserClient_Plan.name} and {`it's`} {userClient.activePlan? 'Active': 'Not Active'}</p>
        <p>Next Payment Date: {userClient.upToDate}</p>
      </div>

      <div className={style.configOptions}>
        <h1>Configuration Options</h1>
        {/* Cambiar foto de perfil */}
        {isChangingProfilePicture ? (
          <div>
            <ImageUpload></ImageUpload>            
              <button className={style.cancelButton} onClick={toggleChangeProfilePicture}>
                Cancel
              </button>
          </div>
        ) : (
          <button onClick={toggleChangeProfilePicture}>Change Profile Picture</button>
        )}
        {/* Cambiar contraseña */}
        {isChangingPassword ? (
          <div>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div>
              <button onClick={changePassword}>Save Change</button>
              <button className="cancel" onClick={toggleChangePassword}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button onClick={toggleChangePassword}>Change Password</button>
        )}
      </div>
    </div>
  );
}

export default MyProfileComp;
