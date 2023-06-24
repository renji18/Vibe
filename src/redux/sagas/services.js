import {
  handleCommentOnPost,
  handleCreateUserPost,
  handleLikeUnlikePost,
  handleRegistration,
  handleSaveRegistrationData,
  handleSaveUnsavePost,
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
export async function createUserPostSagaAsyncHandler(
  dispatch,
  profile,
  postData
) {
  const res = await handleCreateUserPost(dispatch, profile, postData);
  return res;
}

// comment on post handler
export async function commentOnPostSagaAsyncHandler(
  dispatch,
  profile,
  postId,
  comment
) {
  const res = await handleCommentOnPost(dispatch, profile, postId, comment);
  return res;
}

// like unlike post handler
export async function likeUnlikePostSagaAsyncHandler(
  dispatch,
  profile,
  postId
) {
  const res = await handleLikeUnlikePost(dispatch, profile, postId);
  return res;
}

// save unsave post handler
export async function saveUnsavePostSagaAsyncHandler(
  dispatch,
  profile,
  postId
) {
  const res = await handleSaveUnsavePost(dispatch, profile, postId);
  return res;
}
