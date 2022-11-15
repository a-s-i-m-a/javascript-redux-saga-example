import { call, put, takeEvery } from "redux-saga/effects";

import { LOGIN_USER } from "./actionTypes";
import { apiError, loginSuccess } from "./actions";
import { login } from "../../../services/auth/login";

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(login, {
      email: user.email,
      password: user.password,
    });
    localStorage.setItem("authUser", JSON.stringify(response.user));
    localStorage.setItem("accessToken", response.token.accessToken);
    yield put(loginSuccess(response));
    history.push("/cards");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
}

export default authSaga;
