import { useContext, createContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  getAccess: () => {},
  // getAccessToken: () => {},
  // saveUser: (userData: AuthResponse) => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const [accessToken, setAccessToken] = useState<string>("")
  // const [refreshToken, setRefreshToken] = useState<string>("")

  // function getAccessToken() {
  //   return accessToken;
  // }

  // function saveUser(userData: AuthResponse) {
  //   setAccessToken(userData.body.accessToken);
  //   setRefreshToken(userData.body.refreshToken)

  //   localStorage.setItem("token", JSON.stringify(userData.body.refreshToken));
  // setIsAuthenticated(true);
  // }

  function getAccess() {
    setIsAuthenticated(true);
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getAccess }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
