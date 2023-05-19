import { put } from "redux-saga/effects";
import * as actionCreators from "../actions";
import {
  registerLoginSignOutSagaAsyncHandler,
  saveUserDataSagaAsyncHandler,
  createUserPostSagaAsyncHandler,
} from "./services";
import { toast } from "react-toastify";

//.success, info, error, warn

// Simple main api loader
export function* mainLoaderSagaCall(action) {
  yield put(actionCreators.toggleMainLoader(false));
}

// Registration, Login and Signout saga
export function* registerLoginSignOutSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true));
    yield registerLoginSignOutSagaAsyncHandler(
      action.method,
      action.profile,
      action.email,
      action.password,
      action.dispatch
    );
    yield put(actionCreators.toggleFirebaseLoader(false));
  } catch (error) {
    yield put(actionCreators.toggleFirebaseLoader(false));
    toast.error(error);
  }
}

// Save User Data saga
export function* saveUserDataSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true));
    yield saveUserDataSagaAsyncHandler(
      action.profile,
      action.userData,
      action.user,
      action.dispatch,
      action.setUser
    );
    yield put(actionCreators.toggleFirebaseLoader(false));
  } catch (error) {
    yield put(actionCreators.toggleFirebaseLoader(false));
    toast.error(error);
  }
}

// create user post saga
export function* createUserPostSagaCall(action) {
  try {
    // yield put(actionCreators.toggleFirebaseLoader(true));
    yield createUserPostSagaAsyncHandler(action.dispatch, action.profile, action.postData);
    // yield put(actionCreators.toggleFirebaseLoader(false));
  } catch (error) {
    // yield put(actionCreators.toggleFirebaseLoader(false));
    toast.error(error);
  }
}
