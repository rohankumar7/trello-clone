import { ADD_BOARD, SET_ACTIVE_BOARD, SORT_LIST, MOVE_LIST } from "../constants";
import uuid from "uuid/v4";

export const setActiveBoard = boardID => {
  return {
    type: SET_ACTIVE_BOARD,
    payload: boardID
  };
};

export const addBoard = title => {
  const boardID = `board-${uuid()}`;
  return {
    type: ADD_BOARD,
    payload: { title, boardID }
  };
};

export const sortList = (boardID,destination,source,draggableId) =>{
  return {
    type : SORT_LIST,
    payload : { boardID, destination, source, draggableId }
  }
}
export const moveList = (boardID,listID,index,listIndex) =>{
  return {
    type : MOVE_LIST,
    payload : { boardID, listID, index,listIndex }
  }
}