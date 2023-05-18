import {
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
  password
) {
  if (method === "register") {
    const res = await handleRegistration(profile, email, password);
    return res;
  } else if (method === "login") {
    const res = await handleSignIn(profile, email, password);
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
