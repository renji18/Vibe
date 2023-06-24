import { put } from "redux-saga/effects";
import * as actionCreators from "../actions";
import {
  commentOnPostSagaAsyncHandler,
  createUserPostSagaAsyncHandler,
  likeUnlikePostSagaAsyncHandler,
  saveUnsavePostSagaAsyncHandler,
} from "./services";
import { toast } from "react-toastify";

// create user post saga
export function* createUserPostSagaCall(action) {
  try {
    // yield put(actionCreators.toggleFirebaseLoader(true));
    yield createUserPostSagaAsyncHandler(
      action.dispatch,
      action.profile,
      action.postData
    );
    // yield put(actionCreators.toggleFirebaseLoader(false));
  } catch (error) {
    // yield put(actionCreators.toggleFirebaseLoader(false));
    toast.error(error);
  }
}

// comment on post saga
export function* commentOnPostSagaCall(action) {
  try {
    yield commentOnPostSagaAsyncHandler(
      action?.dispatch,
      action?.profile,
      action?.postId,
      action?.comment
    );
  } catch (error) {
    toast.error(error);
  }
}

// like unlike post saga
export function* likeUnlikePostSagaCall(action) {
  try {
    yield likeUnlikePostSagaAsyncHandler(
      action?.dispatch,
      action?.profile,
      action?.postId
    );
  } catch (error) {
    toast.error(error);
  }
}

// save unsave post saga
export function* saveUnsavePostSagaCall(action) {
  try {
    yield saveUnsavePostSagaAsyncHandler(
      action?.dispatch,
      action?.profile,
      action?.postId
    );
  } catch (error) {
    toast.error(error);
  }
}
