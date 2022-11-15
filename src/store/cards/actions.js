import {
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS,
  API_ERROR,
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  CREATE_CARD_SUCCESS,
  DELETE_CARD_SUCCESS,
  UPDATE_CARD_SUCCESS, GET_CARD_STATUSES
} from "./actionTypes";

export const fetchCards = cards => {
  return {
    type: FETCH_CARDS,
    payload: { cards },
  };
};

export const fetchCardsStatus = statuses => {
  return {
    type: GET_CARD_STATUSES,
    payload: { statuses },
  };
};

export const fetchCardSuccess = cards => {
  return {
    type: FETCH_CARDS_SUCCESS,
    payload: cards,
  };
};

export const createCard = payload => {
  return {
    type: CREATE_CARD,
    payload,
  };
};

export const createCardSuccess = payload => {
  return {
    type: CREATE_CARD_SUCCESS,
    payload,
  };
};

export const updateCard = payload => {
  return {
    type: UPDATE_CARD,
    payload,
  };
};

export const updateCardSuccess = payload => {
  return {
    type: UPDATE_CARD_SUCCESS,
    payload,
  };
};

export const deleteCardAction = payload => {
  return {
    type: DELETE_CARD,
    payload,
  };
};

export const deleteCardSuccess = payload => {
  return {
    type: DELETE_CARD_SUCCESS,
    payload,
  };
};

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
