import { takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import * as userMiddleware from "./userSaga";

export default function* mySaga() {
  yield takeLatest(actionTypes.GET_ALL_USERS, userMiddleware.userSagaCall);
}
