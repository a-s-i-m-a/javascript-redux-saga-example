import { all, fork } from "redux-saga/effects";

import LayoutSaga from "./layout/saga";
import AuthSaga from "./auth/login/saga";
import CardsSaga from "./cards/saga";

export default function* rootSaga() {
  yield all([LayoutSaga(), fork(AuthSaga), fork(CardsSaga)]);
}
