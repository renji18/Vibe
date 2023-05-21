import * as actionType from "./actionTypes";

// Getting single user data after login or registration
export const getSingleUser = (data) => {
  return {
    type: actionType.GET_SINGLE_USER,
    data,
  };
};

// Register and Login user
export const registerLoginSignOutUser = (
  method,
  profile,
  email,
  password,
  dispatch
) => ({
  type: actionType.REGISTER_LOGIN_SIGNOUT_USER,
  method,
  profile,
  email,
  password,
  dispatch,
});

// Save user data
export const saveUserData = (profile, userData, user, dispatch, setUser) => ({
  type: actionType.SAVE_USER_DATA,
  profile,
  userData,
  user,
  dispatch,
  setUser,
});

// Get user names
export const getUserNamesData = (data) => ({
  type: actionType.GET_USER_NAMES,
  data,
});
