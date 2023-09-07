import { useContext, createContext, useState} from "react";


const AuthContext = createContext({ 
    isAuthenticated: false,
    getAccess: () => {} 
});

export function AuthProvider({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  function getAccess () {
    setIsAuthenticated(true);
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, getAccess }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)