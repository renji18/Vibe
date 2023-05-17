import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getSingleUser } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAuthStateChange,
  handleRegistration,
  handleSaveRegistrationData,
  handleSignIn,
  hanldeSignOut,
} from "./utility";
import { firebaseAuth } from "./config";

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
      handleAuthStateChange(data, dispatch, getSingleUser, setUser)
    );
  }, [dispatch]);

  // signing up user using email and password
  const signUpUserUsingEmailAndPassword = async (email, password) => {
    handleRegistration(profile, email, password);
  };

  // sign in email/pw
  const signInUserUsingEmailAndPassword = async (email, password) => {
    handleSignIn(profile, email, password);
  };

  // saving user data on registration
  const saveUserDataOnRegistration = async (userData) => {
    handleSaveRegistrationData(
      profile,
      userData,
      user,
      dispatch,
      getSingleUser,
      setUser
    );
  };

  // signout
  const signOutUser = async () => {
    hanldeSignOut(profile);
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
