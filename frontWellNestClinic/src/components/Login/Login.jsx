import React, { useState } from "react";
import style from "./Login.module.css";
import { loginUser, getUser } from "../../redux/action/actions";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {useAuth} from "../../Authenticator/AuthPro";
import Loading from "../Loading/Loading"

//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth()

  if (auth.isAuthenticated) {
    return(
      <Navigate to="/home"></Navigate>
    )
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleDniChange = (e) => {
    setDni(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const loginResponse = await dispatch(loginUser(email, password, dni));
      if (loginResponse.data.pass) {
        dispatch(getUser(loginResponse.data.id));
        auth.getAccess()
        navigate("/home");
      } else if (loginResponse.status === 403) {
        if (loginResponse.data.message) {
          messageError(loginResponse.data.message);
        } else {
          messageError(loginResponse.data.error);
        }
      } else {
        messageError(loginResponse.data.error);
      }
    } catch (error) {
      setError("Internal error");
    } finally {
      setIsLoading(false);
    }
  };

  const messageError = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className={style.page}>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div>
          <h1 id={style.title} className={style.heading}>
            Welcome
          </h1>
          <div className={style.container}>
            <h3 id={style.titleForm}>Sign in</h3>
            <form className={style.Form} onSubmit={handleSubmit}>
              <div className={style.form}>
                <div>
                  {" "}
                  <label className={style.label}>Email address</label>
                </div>
                <input
                  type="text"
                  className={style.input}
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className={style.form}>
                <div>
                  {" "}
                  <label className={style.label}>ID number</label>
                </div>
                <input
                  type="text"
                  className={style.input}
                  placeholder="Enter ID"
                  value={dni}
                  onChange={handleDniChange}
                />
              </div>
              <div>
                {" "}
                <div>
                  <label className={style.label}>Password </label>
                </div>
                <input
                  type="password"
                  className={`${style.input} ${
                    isVisible ? style.isVisible : ""
                  }`}
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>{" "}
              <button className={style.button} type="submit">
                Submit
              </button>
              {error && <p className={style.error}>{error}</p>}
              <h4>Or log in with Google</h4>
              <h5>
                Don't have an account?{" "}
                <a
                  className={style.signup}
                  href="/checkUser"
                  onClick={() => navigate("/checkUser")}
                >
                  Register
                </a>
              </h5>
            </form>
          </div>
        </div>
      )}

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;
