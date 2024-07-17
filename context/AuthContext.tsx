import { FIREBASE_AUTH } from "@/lib/firebase/FirebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextInterface {
  user: any;
  setUser: any;
  isAuthenticated: any;
  setIsAuthenticated: any;
}

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );
  useEffect(() => {
    // TODO: Check if user is authenticated
    const checkAuth = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    return () => {
      checkAuth();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const vlue = useContext(AuthContext);
  if (!vlue)
    throw new Error("useAuth must be used inside an AuthContextProvider");
  return vlue;
};
