import { SET_ACTIVE_BOARD } from "../constants";

const initialState = null;

const activeBoardReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_ACTIVE_BOARD: {
      return payload;
    }

    default:
      return state;
  }
};

export default activeBoardReducer;
