import { put, takeEvery } from "redux-saga/effects";
import * as actionType from "../actions/actionTypes";
import * as actionCreators from "../actions";
import {
  registerLoginSignOutSagaAsyncHandler,
  saveUserDataSagaAsyncHandler,
} from "./services";
import { toast } from "react-toastify";


// Simple main api loader
export function* mainLoaderSagaCall(action) {
  yield put(actionCreators.toggleMainLoader(false));
}

// Simple main api loader
export function* themeSwitchSagaCall(action) {
  yield put(actionCreators.themeSwitchAction(action.data));
}

function* updateThemeSaga(action) {
  try {
    // Perform any additional logic or API calls if needed
    // Here, we simply put the theme update action in the store
    yield put({ type: actionType.THEME_SWITCH, data: action.isDarkTheme });
  } catch (error) {
    // Handle any errors
    console.error("Error updating theme:", error);
  }
}

export function* watchThemeSaga() {
  yield takeEvery(actionType.UPDATE_THEME, updateThemeSaga);
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


