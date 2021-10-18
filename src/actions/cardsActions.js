import { ADD_CARD, EDIT_CARD_TITLE,DELETE_CARD } from "../constants"
import uuid from 'uuid/v4'
export const addCard = (listID, title,position) => {
  const cardID = `card-${uuid()}`
  return {
    type: ADD_CARD,
    payload: { listID, cardID, title,position }
  };
};

export const editTitle = (id, newText) => {
  return {
    type: EDIT_CARD_TITLE,
    payload: { id, newText }
  };
};

export const deleteCard = (id) => {
  return {
    type: DELETE_CARD,
    payload: { id }
  };
};
