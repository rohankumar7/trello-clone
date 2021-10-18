import { ADD_BOARD, ADD_LIST, MOVE_LIST, SORT_LIST } from '../constants'

const initialState = []

const boardsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_LIST: {
      const { boardID, listID } = payload
      const newBoard = state.find(board => board.id === boardID)
      newBoard.lists = [...newBoard.lists, listID]
      const boards = state.map(board => board.id === boardID ? newBoard : board)
      return boards
    }

    case SORT_LIST: {
      const { boardID, destination, source, draggableId } = payload;
      const newBoard = state.find(board => board.id === boardID)
      const newLists = newBoard.lists

      newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, draggableId);
      newBoard.lists = newLists
      const boards = state.map(board => board.id === boardID ? newBoard : board)
      return boards
    }
    case MOVE_LIST : {
      const { boardID, listID, index,listIndex} = payload
      const newBoard = state.find(board => board.id === boardID)
      const newLists = newBoard.lists
      newLists.splice(index,1);
      newLists.splice(listIndex, 0, listID);
      newBoard.lists = newLists
      const boards = state.map(board => board.id === boardID ? newBoard : board)
      return boards
    }
   /* case CONSTANTS.DELETE_LIST: {
      const { listID, boardID } = action.payload;
      const board = state[boardID];
      const lists = board.lists;
      const newLists = lists.filter(id => id !== listID);
      board.lists = newLists;
      return { ...state, [boardID]: board };
    }*/

    case ADD_BOARD: {
  const { title, boardID } = payload;
  const newBoard = {
    id: boardID,
    title,
    lists: []
  };

  return [...state, newBoard];
}

    default:
return state;
  }
};

export default boardsReducer;
