import { ADD_BOARD } from "../constants";
import uuid from "uuidv4";

const initialState = [];

const boardOrderReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ADD_BOARD: {
    	const { boardID } = payload
      return [...state, boardID];
    }
    default:
      return state;
  }
};

export default boardOrderReducer;
