import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import style from "./MyProfile.module.css";
import ImageUpload from "../ImageUpload/ImageUpload";
import validation from "../SignUp/Validation";
import { useAuth } from "../../Authenticator/AuthPro";
import { uploadImage } from "../../redux/action/actions";

function MyProfileComp() {
  const [isChangingProfilePicture, setIsChangingProfilePicture] =
    useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const imageUrl = useSelector((state) => state.imageUrl);
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
      alert("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const errors = validationPassword({ password: newPassword });
      setError(errors);

      if (Object.keys(errors).length === 0) {
        const data = {
          id: auth.user.id,
          password: currentPassword,
          newPassword: newPassword,
        };
        dispatch(uploadImage(data));
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Unable to change password.");
    } finally {
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
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
        <h1 id={style.fullName}>
          {userClient.name} {userClient.lastName}
        </h1>
        <div className={style.imageCont}>
        {imageUrl && (
          <img
            className={style.previewImage}
            src={imageUrl}
            alt="Uploaded image"
          />
          )}
          </div>

        <div className={style.contenedorProperties}>
          <p className={style.propert}>Email address </p>
          <p className={style.valor}>: {userClient.email}</p>{" "}
        </div>
        <div className={style.contenedorProperties}>
          <p className={style.propert}> DNI </p>
          <p className={style.valor}>: {userClient.dni}</p>
        </div>
        <div className={style.contenedorProperties}>
          <p className={style.propert}>Date of Birth</p>
          <p className={style.valor}>: {userClient.birthDate}</p>
        </div>
        <div className={style.contenedorProperties}>
          <p className={style.propert}> Address</p>
          <p className={style.valor}>: {userClient.address}</p>
        </div>
        <div className={style.contenedorProperties}>
          <p className={style.propert}> Contact </p>
          <p className={style.valor}>: {userClient.backupContact}</p>
        </div>
        <div className={style.contenedorProperties}>
          <p className={style.propert}>Plan & Status </p>
          <p className={style.valor}>
            : {userClient.UserClient_Plan.name} &{" "}
            {userClient.activePlan ? "active" : "not active"}
          </p>
        </div>
        <div className={style.contenedorProperties}>
          <p className={style.propert}>Next Payment Date </p>
          <p className={style.valor}>: {userClient.upToDate}</p>
        </div>
      </div>

      <div className={style.configOptions}>
        <h1>Configuration options</h1>
        {/* Cambiar foto de perfil */}
        {isChangingProfilePicture ? (
          <div className={style.containerFoto}>
            <ImageUpload
              toggleChangeProfilePicture={toggleChangeProfilePicture}
            ></ImageUpload>
            {/* <div className={style.botonn}>
            <button
              className={style.cancelButton}
              onClick={toggleChangeProfilePicture}
            >
              Cancel
            </button>
            </div> */}
          </div>
        ) : (
          <button
            id={style.chpic}
            className={style.changePP}
            onClick={toggleChangeProfilePicture}
          >
            Change profile picture
          </button>
        )}
        {/* Cambiar contraseña */}
        {isChangingPassword ? (
          <div className={style.containerPass}>
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
              <button className={style.saveChange} onClick={changePassword}>
                Save
              </button>
              <button className={style.cancel} onClick={toggleChangePassword}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button id={style.chpass} onClick={toggleChangePassword}>
            Change Password
          </button>
        )}
      </div>
    </div>
  );
}

export default MyProfileComp;
