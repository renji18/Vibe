// import { call, put } from "redux-saga/effects";

export function* userProfileSagaCall(action) {
  try {
    yield console.log(action.data, 'data');
  } catch (error) {
    // yield console.log(error);
  }
}
