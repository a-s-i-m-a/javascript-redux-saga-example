import { call, put, takeEvery } from "redux-saga/effects";

import {
  CREATE_CARD,
  DELETE_CARD,
  FETCH_CARDS, GET_CARD_STATUSES,
  UPDATE_CARD
} from "./actionTypes";
import {
  apiError,
  createCardSuccess,
  deleteCardSuccess,
  fetchCardSuccess,
  updateCardSuccess,
} from "./actions";
import {
  deleteCard,
  getCards, getCardStatuses,
  storeCard,
  updateCard
} from "../../services/cards/cards";
import cardStatus from "../../pages/card/cardStatus";

function* fetchCards() {
  try {
    const { data } = yield call(getCards);
    yield put(fetchCardSuccess(data));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* storeCardSaga({ payload }) {
  try {
    const response = yield call(storeCard, payload);
    yield put(createCardSuccess(response));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateCardSaga({ payload }) {
  try {
    const response = yield call(updateCard, payload.id, payload);
    yield put(updateCardSuccess(response));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* deleteCardSaga({ payload }) {
  try {
    const response = yield call(deleteCard, payload);
    console.log(response);
    yield put(deleteCardSuccess(payload));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* getCardStatusesSaga({ payload }) {
  try {
    const response = yield call(getCardStatuses, payload);
    console.log(response);
    yield put(fetchCardSuccess(payload));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* cardsSaga() {
  yield takeEvery(FETCH_CARDS, fetchCards);
  yield takeEvery(CREATE_CARD, storeCardSaga);
  yield takeEvery(DELETE_CARD, deleteCardSaga);
  yield takeEvery(UPDATE_CARD, updateCardSaga);
  yield takeEvery(GET_CARD_STATUSES, getCardStatusesSaga);
}

export default cardsSaga;
