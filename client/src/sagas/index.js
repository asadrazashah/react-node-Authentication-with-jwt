import { put, all, takeLatest } from "redux-saga/effects";

import axios from "axios";

function* postUser(action) {
  const user = action.payload;
  const res = yield axios
    .post("http://localhost:5000/api/user", user)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });

  //   yield put({ type: "SIGNUP_SUCCESS" });
  //   yield put({ type: "SIGNUP_FAILED" });
  console.log(user);
}

function* actionWatcher() {
  yield takeLatest("ADD_USER", postUser);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
