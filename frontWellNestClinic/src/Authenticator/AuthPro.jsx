import { useContext, createContext, useState, useEffect } from "react";
import { getUser } from "../redux/action/actions";
import { useDispatch } from "react-redux";

const AuthContext = createContext({
  isAuthenticated: false,
  getAccess: () => {},
  getAccessToken: () => {},
  saveUser: (AuthResponse) => {},
  getRefreshToken: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [accessToken, setAccessToken] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  async function requestNewAccessToken(refreshToken) {
    try {
      const endpoint =
        import.meta.env.VITE_BASENDPOINT_BACK + "/token/refresh-token";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(endpoint, config);
      if (response.ok) {
        return response.data.accessToken;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async function checkAuth() {
    if (accessToken) {
    } else {
      const token = getRefreshToken();
      if (token) {
        const newAccessToken = await requestNewAccessToken(token)
        if (newAccessToken) {
          dispatch(getUser)
          
        }
      }
    }
  }

  function getAccessToken() {
    return accessToken;
  }

  function getRefreshToken() {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    }
    return null;
  }

  function saveUser(AuthResponse) {
    setAccessToken(AuthResponse.data.accessToken);

    localStorage.setItem(
      "token",
      JSON.stringify(AuthResponse.data.refreshToken)
    );
    setIsAuthenticated(true);
  }

  function getAccess() {
    setIsAuthenticated(true);
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
