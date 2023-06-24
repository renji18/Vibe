import { takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import * as userMiddleware from "./userSaga";
import * as postMiddleware from "./postSaga";

export default function* mySaga() {
  yield takeLatest(
    actionTypes.GET_SINGLE_USER,
    userMiddleware.mainLoaderSagaCall
  );
  yield takeLatest(
    actionTypes.REGISTER_LOGIN_SIGNOUT_USER,
    userMiddleware.registerLoginSignOutSagaCall
  );
  yield takeLatest(
    actionTypes.SAVE_USER_DATA,
    userMiddleware.saveUserDataSagaCall
  );
  yield takeLatest(
    actionTypes.CREATE_POST,
    postMiddleware.createUserPostSagaCall
  );
  yield takeLatest(
    actionTypes.THEME_SWITCH,
    userMiddleware.themeSwitchSagaCall
  );
  yield takeLatest(
    actionTypes.COMMENT_ON_POST,
    postMiddleware.commentOnPostSagaCall
  );
  yield takeLatest(
    actionTypes.LIKE_POST,
    postMiddleware.likeUnlikePostSagaCall
  );
  yield takeLatest(
    actionTypes.SAVE_POST,
    postMiddleware.saveUnsavePostSagaCall
  );
}
