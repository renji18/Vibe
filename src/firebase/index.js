import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { handleAuthStateChange } from "./utility";
import { firebaseAuth } from "./config";
import {
  registerLoginSignOutUser,
  saveUserData,
} from "../redux/actions";

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
      handleAuthStateChange(data, dispatch,  setUser)
    );
  }, [dispatch]);

  // registration
  const signUpUserUsingEmailAndPassword = async (email, password) => {
    dispatch(registerLoginSignOutUser("register", profile, email, password));
  };

  // sign in email/pw
  const signInUserUsingEmailAndPassword = async (email, password) => {
    dispatch(registerLoginSignOutUser("login", profile, email, password));
  };

  // saving user data on registration
  const saveUserDataOnRegistration = async (userData) => {
    dispatch(
      saveUserData(profile, userData, user, dispatch, setUser)
    );
  };

  // signout
  const signOutUser = async () => {
    dispatch(registerLoginSignOutUser("signout", profile));
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
