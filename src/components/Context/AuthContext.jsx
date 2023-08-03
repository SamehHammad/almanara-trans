import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
const AuthCnx = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);
  const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
  };
  // Login function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Logout function
  const logout = () => {
    return signOut(auth);
  };
  const values = { currentUser, signup, login, logout };
  return <AuthCnx.Provider value={values}>{children}</AuthCnx.Provider>;
}

export default AuthProvider;
export const useAuth = () => {
  return useContext(AuthCnx);
};
