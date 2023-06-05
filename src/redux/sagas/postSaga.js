import { put } from "redux-saga/effects";
import * as actionCreators from "../actions";
import {
  createUserPostSagaAsyncHandler,
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