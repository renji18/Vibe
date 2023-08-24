import * as actionType from "./actionTypes";

// create user post
export const createUserPost = (profile, postData) => {
  return {
    type: actionType.CREATE_POST,
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

// comment on post
export const commentOnPost = (profile, post, comment) => {
  return {
    type: actionType.COMMENT_ON_POST,
    profile,
    post,
    comment,
  };
};

// Like post
export const likePost = (profile, post) => {
  return {
    type: actionType.LIKE_POST,
    profile,
    post,
  };
};

// Save Post
export const savePost = (profile, postId) => {
  return {
    type: actionType.SAVE_POST,
    profile,
    postId,
  };
};

// delete post
export const deletePost = (profile, post) => {
  return {
    type: actionType.DELETE_POST,
    profile,
    post,
  };
};

// delete post comment
export const deletePostComment = (profile, post, comment) => {
  return {
    type: actionType.DELETE_POST_COMMENT,
    profile,
    post,
    comment,
  };
};
