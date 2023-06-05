import * as actionType from "./actionTypes";

// create user post
export const createUserPost = (dispatch,profile, postData) => {
  return {
    type: actionType.CREATE_POST,
    dispatch,
    profile,
    postData,
  };
};

// get all posts
export const getAllPosts = (data) => {
  return {
    type: actionType.GET_POSTS,
    data,
  };
};
