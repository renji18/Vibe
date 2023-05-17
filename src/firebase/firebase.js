import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getSingleUser } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAuthStateChange,
  handleRegistration,
  handleSaveRegistrationData,
  handleSignIn,
  hanldeSignOut,
} from "./utility";

// firebase config
import firebaseConfig from "./config";

// firebase services instance
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// firebase context
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

// react component for firebase providation
export const FirebaseProvider = (props) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userData);

  // states
  const [user, setUser] = useState(null);

  // useEffect to catch logins, registrations and logouts
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (data) =>
      handleAuthStateChange(data, firestore, dispatch, getSingleUser, setUser)
    );
  }, [dispatch]);

  // signing up user using email and password
  const signUpUserUsingEmailAndPassword = async (email, password) => {
    handleRegistration(profile, firestore, email, password, firebaseAuth);
  };

  // sign in email/pw
  const signInUserUsingEmailAndPassword = async (email, password) => {
    handleSignIn(profile, firestore, email, password, firebaseAuth);
  };

  // saving user data on registration
  const saveUserDataOnRegistration = async (userData) => {
    handleSaveRegistrationData(
      profile,
      userData,
      storage,
      firestore,
      user,
      dispatch,
      getSingleUser,
      setUser
    );
  };

  // signout
  const signOutUser = async () => {
    hanldeSignOut(profile, firebaseAuth);
  };

  return (
    <FirebaseContext.Provider
      value={{
        signUpUserUsingEmailAndPassword,
        signInUserUsingEmailAndPassword,
        saveUserDataOnRegistration,
        signOutUser,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
