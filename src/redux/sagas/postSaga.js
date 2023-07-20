import { put } from "redux-saga/effects"
import * as actionCreators from "../actions"
import { toast } from "react-toastify"
import {
  handleCommentOnPost,
  handleCreateUserPost,
  handleDeleteComment,
  handleDeletePost,
  handleLikeUnlikePost,
  handleSaveUnsavePost,
} from "../../firebase/utility"

// create user post saga
export function* createUserPostSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true))
    yield handleCreateUserPost(action.profile, action.postData)
    yield put(actionCreators.toggleFirebaseLoader(false))
  } catch (error) {
    yield put(actionCreators.toggleFirebaseLoader(false))
    toast.error(error)
  }
}

// comment on post saga
export function* commentOnPostSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true))
    yield handleCommentOnPost(action?.profile, action?.post, action?.comment)
  } catch (error) {
    toast.error(error)
  }
}

// like unlike post saga
export function* likeUnlikePostSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true))
    yield handleLikeUnlikePost(action?.profile, action?.post)
    yield put(actionCreators.toggleFirebaseLoader(false))
  } catch (error) {
    yield put(actionCreators.toggleFirebaseLoader(false))
    toast.error(error)
  }
}

// save unsave post saga
export function* saveUnsavePostSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true))
    yield handleSaveUnsavePost(action?.profile, action?.postId)
    yield put(actionCreators.toggleFirebaseLoader(false))
  } catch (error) {
    yield put(actionCreators.toggleFirebaseLoader(false))
    toast.error(error)
  }
}

// delete post saga
export function* deletePostSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true))
    yield handleDeletePost(action?.profile, action?.post)
    yield put(actionCreators.toggleFirebaseLoader(false))
  } catch (error) {
    yield put(actionCreators.toggleFirebaseLoader(false))
    toast.error(error)
  }
}

// delete post comment saga
export function* deletePostCommentSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true))
    yield handleDeleteComment(action?.profile, action?.post, action?.comment)
    yield put(actionCreators.toggleFirebaseLoader(false))
  } catch (error) {
    yield put(actionCreators.toggleFirebaseLoader(false))
    toast.error(error)
  }
}
