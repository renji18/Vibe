import * as actionType from "./actionTypes";

// Getting single user data after login or registration
export const getSingleUser = (data) => {
  return {
    type: actionType.GET_SINGLE_USER,
    data,
  };
};

// Main loader on route changes
export const toggleMainLoader = (data) => ({
  type: actionType.MAIN_LOADER,
  data,
});

// Loader for firebase functions
export const toggleFirebaseLoader = (data) => ({
  type: actionType.FIREBASE_LOADER,
  data,
});

// Register and Login user
export const registerLoginSignOutUser = (method, profile, email, password) => ({
  type: actionType.REGISTER_LOGIN_SIGNOUT_USER,
  method,
  profile,
  email,
  password,
});

// Save user data
export const saveUserData = (
  profile,
  userData,
  user,
  dispatch,
  setUser
) => ({
  type: actionType.SAVE_USER_DATA,
  profile,
  userData,
  user,
  dispatch,
  setUser,
});
