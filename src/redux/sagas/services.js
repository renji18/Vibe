import {
  handleCreateUserPost,
  handleRegistration,
  handleSaveRegistrationData,
  handleSignIn,
  hanldeSignOut,
} from "../../firebase/utility";

// register, login, signout handler
export async function registerLoginSignOutSagaAsyncHandler(
  method,
  profile,
  email,
  password,
  dispatch
) {
  if (method === "register") {
    const res = await handleRegistration(profile, email, password);
    return res;
  } else if (method === "login") {
    const res = await handleSignIn(dispatch, profile, email, password);
    return res;
  } else if (method === "signout") {
    const res = await hanldeSignOut(profile);
    return res;
  } else {
    return "NO METHOD FOUND";
  }
}

// save user data handler
export async function saveUserDataSagaAsyncHandler(
  profile,
  userData,
  user,
  dispatch,
  setUser
) {
  const res = await handleSaveRegistrationData(
    profile,
    userData,
    user,
    dispatch,
    setUser
  );
  return res;
}

// create user post handler
export async function createUserPostSagaAsyncHandler(dispatch, profile, postData) {
  const res = await handleCreateUserPost(dispatch, profile, postData);
  return res;
}
