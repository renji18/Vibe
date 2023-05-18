import { put } from "redux-saga/effects";
import * as actionCreators from "../actions";
import {
  registerLoginSignOutSagaAsyncHandler,
  saveUserDataSagaAsyncHandler,
} from "./services";

// Simple main api loader
export function* mainLoaderSagaCall(action) {
  yield put(actionCreators.toggleMainLoader(false));
}

// Registration, Login and Signout saga
export function* registerLoginSignOutSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true));
    const res = yield registerLoginSignOutSagaAsyncHandler(
      action.method,
      action.profile,
      action.email,
      action.password
    );
    yield put(actionCreators.toggleFirebaseLoader(false));
    if (res) return console.log("error: ", res);
  } catch (error) {
    yield console.log(error);
  }
}

// Save User Data saga
export function* saveUserDataSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true));
    const res = yield saveUserDataSagaAsyncHandler(
      action.profile,
      action.userData,
      action.user,
      action.dispatch,
      action.getSingleUser,
      action.setUser
    );
    yield put(actionCreators.toggleFirebaseLoader(false));
    if (res) return console.log("error: ", res);
  } catch (error) {
    yield console.log(error);
  }
}
