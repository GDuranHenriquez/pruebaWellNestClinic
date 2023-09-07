import { useState } from 'react';
import axios from 'axios';
import defaultProfile from '../../assets/perfil.png';
import style from './MyProfile.module.css';

function MyProfileComp() {
  const [isUploading, setIsUploading] = useState(false);
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
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', async (e) => {
      const file = e.target.files[0];

      if (!file) {
        return;
      }

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
      }
    });

    input.click();
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
      await axios.post('https://serverwellnestclinic.onrender.com/api/cancel-membership');
      alert('Membership canceled successfully.');
    } catch (error) {
      console.error('Error canceling membership:', error);
      alert('Unable to cancel membership.');
    }
  };

  return (
    <div className={style.profileContainer}>
      <div className={style.profileData}>
        <h1 id={style.fullName}>{userClient.name} {userClient.lastName}</h1>
        <img id={style.profileImage} src={!userClient.imageUrl ? defaultProfile : defaultProfile} alt="Profile" />
        <p>{userClient.email}</p>
        <p>DNI: {userClient.dni}</p>
        <p>DNI Type: {userClient.dniType}</p>
        <p>Date of Birth: {userClient.birthDate}</p>
        <p>Address: {userClient.address}</p>
        <p>Contact: {userClient.backupContact}</p>
        <p>Membership Status: {userClient.activePlan}</p>
        <p>Next Payment Date: {userClient.nextPaymentDate}</p>
      </div>

      <div className={style.userActions}>
        <h2>Configuration Options</h2>
        <button onClick={changeProfilePicture}>
        {isUploading ? 'Uploading...' : 'Change Profile Picture'}
        </button>
        <button onClick={takePhoto}>Take Photo</button>
      </div>

      <div className={style.userActions}>
      <div>
      <input
      type="text"
      placeholder="Current Contact"
      value={currentContact}
      onChange={(e) => setCurrentContact(e.target.value)}
    />
    <input
      type="text"
      placeholder="New Contact"
      value={newContact}
      onChange={(e) => setNewContact(e.target.value)}
    />
    <input
      type="text"
      placeholder="Confirm New Contact"
      value={confirmContact}
      onChange={(e) => setConfirmContact(e.target.value)}
    />
    <button onClick={changeContact}>
      {isChangingContact ? 'Changing...' : 'Change Contact'}
    </button>
  </div>
    </div>
    <div className={style.userActions}>
        <div>
          <input
            type="text"
            placeholder="Current Address"
            value={currentAddress}
            onChange={(e) => setCurrentAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="New Address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Confirm New Address"
            value={confirmAddress}
            onChange={(e) => setConfirmAddress(e.target.value)}
          />
          <button onClick={changeAddress}>
            {isChangingAddress ? 'Changing...' : 'Change Address'}
          </button>
        </div>
    </div>

    <div className={style.userActions}>
    <div>
    <input
      type="text"
      placeholder="Current Contact"
      value={currentContact}
      onChange={(e) => setCurrentContact(e.target.value)}
    />
    <input
      type="text"
      placeholder="New Contact"
      value={newContact}
      onChange={(e) => setNewContact(e.target.value)}
    />
    <input
      type="text"
      placeholder="Confirm New Contact"
      value={confirmContact}
      onChange={(e) => setConfirmContact(e.target.value)}
    />
    <button onClick={changeContact}>
      {isChangingContact ? 'Changing...' : 'Change Contact'}
    </button>
    </div>
    </div>

    <div className={style.userActions}>
    <button onClick={cancelMembership}>Cancel Membership</button>
    </div>
    </div>
  );
}

export default MyProfileComp;
