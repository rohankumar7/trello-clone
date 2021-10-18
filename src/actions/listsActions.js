import { ADD_LIST, EDIT_LIST_TITLE, MOVE_ALL_CARDS, SORT_CARD, SORT } from '../constants'
import uuid from "uuid/v4";

export const addList = title => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;
    const listID = `list-${uuid()}`;
    dispatch({
      type: ADD_LIST,
      payload: { title, listID, boardID }
    });
  };
};

export const editTitle = (listID, newTitle) => {
  return {
    type: EDIT_LIST_TITLE,
    payload: {
      listID,
      title:newTitle
    }
  };
};
export const sortCard = (destination,source,draggableId) =>{
  return {
    type : SORT_CARD,
    payload : { destination, source, draggableId }
  }
}
export const moveAllCards = (srcListID,destListID) =>{
  return {
    type : MOVE_ALL_CARDS,
    payload : { srcListID, destListID }
  }
}
export const sort = (cardIDs,listID) =>{
  return {
    type : SORT,
    payload : { cardIDs, listID }
  }
}

/*export const deleteList = listID => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;
    return dispatch({
      type: CONSTANTS.DELETE_LIST,
      payload: {
        listID,
        boardID
      }
    });
  };
};*/
