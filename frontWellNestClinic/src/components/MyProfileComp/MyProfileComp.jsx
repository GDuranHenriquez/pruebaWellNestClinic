import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import style from './MyProfile.module.css';
import ImageUpload from '../ImageUpload/ImageUpload';

function MyProfileComp() {
  const [isChangingProfilePicture, setIsChangingProfilePicture] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [confirmAddress, setConfirmAddress] = useState('');
  const [isChangingAddress, setIsChangingAddress] = useState(false);
  const [currentContact, setCurrentContact] = useState('');
  const [newContact, setNewContact] = useState('');
  const [confirmContact, setConfirmContact] = useState('');
  const [isChangingContact, setIsChangingContact] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const userClient = useSelector((state) => state.user);

  const takePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.createElement('video');
      document.body.appendChild(videoElement);
      videoElement.srcObject = stream;
      videoElement.play();
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera.');
    }
  };

  const changeProfilePicture = () => {

  };

  const uploadFromFile = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', async (e) => {
      const file = e.target.files[0];

      if (!file) {
        return;
      }

      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append('profilePicture', file);

        const response = await axios.post(
          'https://serverwellnestclinic.onrender.com/api/change-profile-picture',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        alert('Profile picture changed successfully.');
      } catch (error) {
        console.error('Error changing profile picture:', error);
        alert('Unable to change profile picture.');
      } finally {
        setIsUploading(false);
        setIsChangingProfilePicture(false);
        setProfilePictureFile(null);
      }
    });

    input.click();
  };

  const saveProfilePicture = async () => {
    if (!profilePictureFile) {
      alert('Please select a profile picture to upload.');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('profilePicture', profilePictureFile);

      const response = await axios.post(
        'https://serverwellnestclinic.onrender.com/api/change-profile-picture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert('Profile picture changed successfully.');
    } catch (error) {
      console.error('Error changing profile picture:', error);
      alert('Unable to change profile picture.');
    } finally {
      setIsUploading(false);
      setIsChangingProfilePicture(false);
      setProfilePictureFile(null);
    }
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
      const response = await axios.put(
        'https://serverwellnestclinic.onrender.com/api/change-password',
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        }
      );
      alert('Password changed successfully.');
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

  const changeAddress = async () => {
    if (!currentAddress || !newAddress || !confirmAddress) {
      alert('Please fill in all fields.');
      return;
    }

    if (newAddress !== confirmAddress) {
      alert('Addresses do not match.');
      return;
    }

    try {
      const response = await axios.put(
        'https://serverwellnestclinic.onrender.com/api/change-address',
        {
          currentAddress: currentAddress,
          newAddress: newAddress,
        }
      );
      alert('Address changed successfully.');
    } catch (error) {
      console.error('Error changing address:', error);
      alert('Unable to change address.');
    } finally {
      setIsChangingAddress(false);
      setCurrentAddress('');
      setNewAddress('');
      setConfirmAddress('');
    }
  };

  const changeContact = async () => {
    if (!currentContact || !newContact || !confirmContact) {
      alert('Please fill in all fields.');
      return;
    }

    if (newContact !== confirmContact) {
      alert('Contacts do not match.');
      return;
    }

    try {
      const response = await axios.put(
        'https://serverwellnestclinic.onrender.com/api/change-contact',
        {
          currentContact: currentContact,
          newContact: newContact,
        }
      );
      alert('Contact changed successfully.');
    } catch (error) {
      console.error('Error changing contact:', error);
      alert('Unable to change contact.');
    } finally {
      setIsChangingContact(false);
      setCurrentContact('');
      setNewContact('');
      setConfirmContact('');
    }
  };

  const cancelMembership = async () => {
    const confirmation = window.confirm(
      'Are you sure you want to cancel your membership? This action is irreversible.'
    );

    if (!confirmation) {
      return;
    }

    try {
      await axios.post(
        'https://serverwellnestclinic.onrender.com/api/cancel-membership'
      );
      alert('Membership canceled successfully.');
    } catch (error) {
      console.error('Error canceling membership:', error);
      alert('Unable to cancel membership.');
    }
  };

  const toggleChangeProfilePicture = () => {
    setIsChangingProfilePicture(!isChangingProfilePicture);
    setIsChangingPassword(false);
    setIsChangingAddress(false);
    setIsChangingContact(false);
  };

  const toggleChangePassword = () => {
    setIsChangingPassword(!isChangingPassword);
    setIsChangingAddress(false);
    setIsChangingContact(false);
  };

  const toggleChangeAddress = () => {
    setIsChangingAddress(!isChangingAddress);
    setIsChangingPassword(false);
    setIsChangingContact(false);
  };

  const toggleChangeContact = () => {
    setIsChangingContact(!isChangingContact);
    setIsChangingPassword(false);
    setIsChangingAddress(false);
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
