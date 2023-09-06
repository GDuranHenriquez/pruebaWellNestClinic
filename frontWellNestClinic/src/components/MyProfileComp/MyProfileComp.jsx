import  { useState, useEffect } from 'react';
import axios from 'axios';
import {  useSelector } from 'react-redux';
import defaultProfile from '../../assets/perfil.png';
import style from './MyProfile.module.css'

function MyProfileComp() {
  const userClient = useSelector((state) => state.user)
  const [newPassword, setNewPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 

  useEffect(() => {
    
  }, []);

  const cambiarFotoDePerfil = () => {
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

        const response = await axios.post('https://serverwellnestclinic.onrender.com/api/change-profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        updateProfilePicture(response.data.imageUrl);
      } catch (error) {
        console.error('Error al cambiar la foto de perfil:', error);
      }
    });

    input.click();
  };

  const cambiarContraseña = async () => {
    if (!newPassword || !confirmPassword) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.put('https://serverwellnestclinic.onrender.com/api/change-password', {
        newPassword: newPassword,
      });

      updatePassword(response.data.newPassword);
      alert('Contraseña cambiada exitosamente.');
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      alert('No se pudo cambiar la contraseña.');
    }
  };

  const cambiarDireccion = async () => {
    const newAddress = prompt('Ingrese la nueva dirección:');

    if (!newAddress) {
      return;
    }

    try {
      const response = await axios.put('https://serverwellnestclinic.onrender.com/api/change-address', {
        newAddress: newAddress,
      });

      updateAddress(response.data.newAddress);
      alert('Dirección cambiada exitosamente.');
    } catch (error) {
      console.error('Error al cambiar la dirección:', error);
      alert('No se pudo cambiar la dirección.');
    }
  }

  const cambiarContacto = async () => {
    const newContact = prompt('Ingrese el nuevo contacto:');

    if (!newContact) {
      return;
    }

    try {
      const response = await axios.put('https://serverwellnestclinic.onrender.com/api/change-contact', {
        newContact: newContact,
      });

      updateContact(response.data.newContact);
      alert('Contacto cambiado exitosamente.');
    } catch (error) {
      console.error('Error al cambiar el contacto:', error);
      alert('No se pudo cambiar el contacto.');
    }
  }

  const cancelarMembresia = async () => {
    const confirmation = window.confirm('¿Estás seguro de que deseas cancelar tu membresía? Esta acción es irreversible.');

    if (!confirmation) {
      return;
    }

    try {
      await axios.post('https://serverwellnestclinic.onrender.com/api/cancel-membership');
      cancelMembership();
      alert('Membresía cancelada exitosamente.');
    } catch (error) {
      console.error('Error al cancelar la membresía:', error);
      alert('No se pudo cancelar la membresía.');
    }
  };

  return (
    <div className={style.containerPerfil}>
      <div className={style.dataPerfil}>
        <h1 id={style.nombrePerfil}>{userClient.name} {userClient.lastName}</h1>
        <img id={style.imgProfile} src={!userClient.imageUrl? defaultProfile : defaultProfile} alt="Foto de perfil" />
        <p>{userClient.email}</p>
        <p>DNI: {userClient.dni}</p>
        <p>Tipo de DNI: {userClient.dniType}</p>
        <p>Date of birth: {userClient.birthDate}</p>
        <p>Address: {userClient.address}</p>
        <p>Contact: {userClient.backupContact}</p>
        <p>Membership status: {userClient.activePlan}</p>
        <p>Next payment date: {userClient.nextPaymentDate}</p>
      </div>
      
      <div className={style.accionsUsers}>
        <button onClick={cambiarFotoDePerfil}>Change profile picture</button>
      <div>
        <input type="password" placeholder="Nueva Contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <input type="password" placeholder="Confirmar Contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button onClick={cambiarContraseña}>Change password</button>
      </div>
      <button onClick={cancelarMembresia}>Cancel membership</button>
      <button onClick={cambiarDireccion}>Change address</button>
      <button onClick={cambiarContacto}>Change contact</button>
      </div>

      
    </div>
  );
}



export default MyProfileComp;