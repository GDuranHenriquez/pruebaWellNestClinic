import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import defaultProfile from '../../assets/perfil.png';
import style from './MyProfile.module.css';

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
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', async (e) => {
      const file = e.target.files[0];

      if (!file) {
        return;
      }

      setProfilePictureFile(file);
    });

    input.click();
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

      <div className={style.configOptions}>
      <h2>Configuration Options</h2>
      {/* Cambiar foto de perfil */}
      {isChangingProfilePicture ? (
          <div>
            <input type="file" accept="image/*" onChange={uploadFromFile} />
            <button onClick={takePhoto}>Tomar foto</button>
            <div>
              <button onClick={saveProfilePicture}>
                {isUploading ? 'Uploading...' : 'Guardar Cambio'}
              </button>
              <button className={style.cancelButton} onClick={toggleChangeProfilePicture}>
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button onClick={toggleChangeProfilePicture}>Cambiar foto de perfil</button>
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
              <button onClick={changePassword}>Guardar Cambio</button>
              <button className="cancel" onClick={toggleChangePassword}>
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button onClick={toggleChangePassword}>Change Password</button>
        )}

        {/* Cambiar dirección */}
        {isChangingAddress ? (
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
            <div>
              <button onClick={changeAddress}>Guardar Cambio</button>
              <button className="cancel" onClick={toggleChangeAddress}>
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button onClick={toggleChangeAddress}>Change Address</button>
        )}

        {/* Cambiar número de contacto */}
        {isChangingContact ? (
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
            <div>
              <button onClick={changeContact}>Guardar Cambio</button>
              <button className="cancel" onClick={toggleChangeContact}>
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button onClick={toggleChangeContact}>Change Contact</button>
        )}

        <button onClick={cancelMembership}>Cancel Membership</button>
    </div>
    </div>
  );
}

export default MyProfileComp;
