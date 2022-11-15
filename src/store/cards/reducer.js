import {
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS,
  API_ERROR,
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  CREATE_CARD_SUCCESS,
  DELETE_CARD_SUCCESS,
  UPDATE_CARD_SUCCESS,
} from "./actionTypes";

const initialState = {
  cards: [],
  error: "",
  loading: false,
};

const cards = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARDS:
      return { ...state, loading: true };
    case FETCH_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        cards: action.payload,
      };
    case CREATE_CARD:
      return { ...state };
    case CREATE_CARD_SUCCESS:
      return {
        ...state,
        cards: state.cards.concat([action.payload]),
      };
    case UPDATE_CARD:
      return { ...state };
    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        cards: state.cards.map(card =>
          card.id === action.payload.id ? { ...card, ...action.payload } : card
        ),
      };
    case DELETE_CARD:
      return { ...state };
    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        cards: state.cards.filter(c => c.id !== action.payload),
      };
    case API_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default cards;
