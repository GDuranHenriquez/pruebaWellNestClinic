import React, { useState } from "react";
import style from "./SignUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../redux/action/actions";
import validation from "./Validation";
import Loading from "../Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin } from '@react-oauth/google';

//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpComponent = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const IsMember = useSelector((state) => state.verifyIsMember);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const errors = validation({ email, password });
    setError(errors);
    if (Object.keys(errors).length === 0) {
      try {
        //esto cambiarlo por props
        const signUpResponse = await signUp(email, password, IsMember.id, null);

        setEmail("");
        setPassword("");
        if (signUpResponse.status == 200) {
          messageSuccess("Your account was created successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else if (signUpResponse.status == 403) {
          messageError(signUpResponse.data.error);
        } else {
          let message = signUpResponse.data.message;
          if (!message) {
            messageError(signUpResponse.data.error);
          }
          const errorServer = { server: message };
          setError(errorServer);
        }
      } catch (error) {
        const errorServer = { server: "There is a server error" };
        setError(errorServer);
      } finally {
        setIsLoading(false);
      }
    } else {
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

  const messageSuccess = (message) => {
    toast.success(message, {
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

  const googleResponse = async (response) => {
    try {
      if(response.credential){
        setIsLoading(true);    
        //esto cambiarlo por props
        const signUpResponse = await signUp(null, null, IsMember.id, response.credential);
        setEmail("");
        setPassword("");

        if (signUpResponse.status == 200) {
          messageSuccess("Your account was created successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else if (signUpResponse.status == 403) {
            messageError(signUpResponse.data.error);
        } else {
          let message = signUpResponse.data.message;
          if (!message) {
            messageError(signUpResponse.data.error);
          }
          const errorServer = { server: message };
          setError(errorServer);
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      const errorServer = { server: "There is a server error" };
      setError(errorServer);
    } finally {
      setIsLoading(false);
    }
  }

  const googleResponseError = (erros) => {
    console.log('Register faile');
  }

  return (
    <div>
        {isLoading && <Loading></Loading>}
        <div>
          <h1 className={style.heading}>Welcome</h1>
          <div className={style.container}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} >
              <div className={style.form}>
                <div>
                  <label className={style.label}>Email address</label>
                </div>
                <input
                  type="text"
                  className={style.input}
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error.email && <p className={style.error}>{error.email}</p>}
              </div>
              <div>
                <label className={style.label}>Password </label>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={style.input}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className={style.toggle}
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
              {error.password && (
                <p className={style.error}>{error.password}</p>
              )}
              <button className={style.button} type="submit">
                Submit
              </button>
              {error.server && <p className={style.error}>{error.server}</p>}
              <h4>Or sign up with Google</h4>
              <h5>
                Already have an account?{" "}
                <a
                  className={style.login}
                  href="/login"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </a>
              </h5>
            </form>
            <br/> <br/>
            <GoogleLogin
              useOneTap
              clientId={import.meta.env.VITE_CLIENT_ID_GOOGLE}
              onSuccess={googleResponse}
              onError={googleResponseError}
              text = "Sign in with Google"
              shape = 'circle'
              logo_alignment = "center"
              
              />;
          </div>
        </div>
      )
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default SignUpComponent;
