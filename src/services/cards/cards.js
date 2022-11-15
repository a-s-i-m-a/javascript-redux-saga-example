import { del, get, post, put } from "../../helpers/api_helper";
import { CARDS, DELETE_CARD, UPDATE_CARD,CARD_STATUSES } from "./CONSTANTS";

export async function getCards() {
  return get(CARDS, { params: { pageSize: 1000 } }).then(r => r);
}

export function storeCard(
  payload = {
    name: null,
    startDate: null,
    endDate: null,
    price: null,
    typeId: null,
    statusId: null,
  }
) {
  return post(CARDS, payload).then(r => r);
}

export function updateCard(id, payload) {
  return put(UPDATE_CARD(id), payload).then(r => r);
}

export function deleteCard(id) {
  return del(DELETE_CARD(id)).then(r => r);}

// statuses
export function getCardStatuses(){
  return get(CARD_STATUSES(id)).then(r=>r)
}

