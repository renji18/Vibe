import { put, takeEvery } from "redux-saga/effects";
import * as actionType from "../actions/actionTypes";
import * as actionCreators from "../actions";
import { toast } from "react-toastify";
import {
  handleRegistration,
  handleSaveRegistrationData,
  handleSignIn,
  hanldeSignOut,
} from "../../firebase/utility";

// Simple main api loader
export function* mainLoaderSagaCall(action) {
  yield put(actionCreators.toggleMainLoader(false));
}

// theme switch
export function* themeSwitchSagaCall(action) {
  yield put(actionCreators.themeSwitchAction(action.data));
}

function* updateThemeSaga(action) {
  try {
    yield put({ type: actionType.THEME_SWITCH, data: action.isDarkTheme });
  } catch (error) {
    toast.error(error);
  }
}

export function* watchThemeSaga() {
  yield takeEvery(actionType.UPDATE_THEME, updateThemeSaga);
}

// Registration, Login and Signout saga
export function* registerLoginSignOutSagaCall(action) {
  try {
    yield put(actionCreators.toggleFirebaseLoader(true));
    if (action?.method === "register") {
      yield handleRegistration(
        action?.profile,
        action?.email,
        action?.password
      );
    } else if (action?.method === "login") {
      yield handleSignIn(
        action?.dispatch,
        action?.profile,
        action?.email,
        action?.password
      );
    } else if (action?.method === "signout") {
      yield hanldeSignOut(action?.profile);
    } else {
      return "NO METHOD FOUND";
    }
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
    yield handleSaveRegistrationData(
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
