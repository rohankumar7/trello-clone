import { combineReducers } from "redux"
import cardsReducer from "./cardsReducer"
import labelReducer from './labelReducer'
import activityReducer from './activityReducer'
import checklistReducer from './checklistReducer'
import attachmentReducer from './attachmentReducer'
import listReducer from './listReducer'
import activeBoardReducer from './activeBoardReducer'
import boardOrderReducer from './boardOrderReducer'
import boardReducer from './boardReducer'

export default combineReducers({
  activeBoard : activeBoardReducer,
  boardOrder : boardOrderReducer,
  boards : boardReducer,
  labels: labelReducer,
  activities: activityReducer,
  cards: cardsReducer,
  checklists: checklistReducer,
  lists: listReducer,
  attachments: attachmentReducer
});