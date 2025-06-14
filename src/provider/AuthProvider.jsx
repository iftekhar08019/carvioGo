import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
export const AuthContext = createContext();
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";


const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };
  const forgetPassword=(email) =>{
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = () => {
    return signOut(auth);
  };
  const googleSignIn =() =>{
    return signInWithPopup(auth, provider);
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    logOut,
    signIn,
    loading,
    setLoading,
    updateUser,
    forgetPassword,
    googleSignIn,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
