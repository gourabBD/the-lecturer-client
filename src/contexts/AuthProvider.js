import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { useQuery } from "@tanstack/react-query";
export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [dashUsers, setDashUsers] = useState([]);

  //array state for questions input

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    setLoading(true);

    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    fetch(`https://the-lecturer-server.vercel.app/users?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, [allUsers]);
  useEffect(() => {
    fetch(`https://the-lecturer-server.vercel.app/users`)
      .then((res) => res.json())
      .then((data) => setDashUsers(data));
  }, [dashUsers]);

  useEffect(() => {
    fetch("https://the-lecturer-server.vercel.app/allBlogs")
      .then((res) => res.json())
      .then((data) => setAllBlogs(data));
  }, [allBlogs]);

  //all test questions fetching

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUser,
    signIn,
    updateUser,
    logOut,
    user,
    loading,
    googleSignIn,
    setUser,
    allUsers,
    allBlogs,
    dashUsers,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
