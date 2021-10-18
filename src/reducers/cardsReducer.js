import { 
  ADD_CARD, 
  DELETE_CARD, 
  EDIT_CARD_TITLE,
  EDIT_WATCH, 
  EDIT_DESCRIPTION,
  EDIT_COVER,DELETE_COVER,
  ADD_ACTIVITY,
  ADD_DUEDDATE, DELETE_DUEDATE,DUEDATE_SELECTED,
  ADD_ATTACHMENT,DELETE_ATTACHMENT,
  ADD_CHECKLIST,DELETE_CHECKLIST,
  ADD_LABEL,REMOVE_LABEL, DELETE_ACTIVITY } from "../constants";

const initialState = []
const cardsReducer = (state = initialState, {type,payload}) => {
  switch (type) {

    case ADD_CARD: {
      const { cardID, title } = payload
      const newCard = {
        id:cardID,
        cover:{},
        title,
        description : '',
        watch:false,
        dueDate:{},
        labels:[],
        checklists:[],
        attachments:[],
        activities:[],
        creationDate : new Date()
      }
      return [...state,newCard]
    }
    case EDIT_WATCH:{
      const { cardID } = payload
      const newCard = state.find(card => card.id === cardID)
      const watch = newCard.watch
      newCard.watch = !watch
      const cards = state.map(card => card.id === cardID ? newCard : card)
      return cards
    }
    case DUEDATE_SELECTED:{
      const { cardID } = payload
      const newCard = state.find(card => card.id === cardID)
      const selected = newCard.dueDate.selected
      newCard.dueDate.selected = !selected
      const cards = state.map(card => card.id === cardID ? newCard : card)
      return cards
    }
    case ADD_DUEDDATE:{
      const { dueDate, cardID } = payload
      const newCard = state.find(card => card.id === cardID)
      newCard.dueDate = dueDate
      const cards = state.map(card => card.id === cardID ? newCard : card)
      return cards
    }

    case DELETE_DUEDATE:{
      const { cardID } = payload
      const newCard = state.find(card => card.id === cardID)
      newCard.dueDate = {}
      const cards = state.map(card => card.id === cardID ? newCard : card)
      return cards
    }

    case EDIT_CARD_TITLE: {
      const { id, newText } = payload
      const newCard = state.find(card => card.id === id)
      newCard.title = newText
      const cards = state.map(card => card.id === id ? newCard : card)
      return cards
    }

    case EDIT_COVER:{
      const { cardID,cover } = payload
      const newCard = state.find(card => card.id === cardID)
      newCard.cover = cover
      const cards = state.map(card => card.id === cardID ? newCard : card)
      return cards
    }
    case DELETE_COVER:{
      const { cardID } = payload
      const newCard = state.find(card => card.id === cardID)
      newCard.cover = {}
      const cards = state.map(card => card.id === cardID ? newCard : card)
      return cards
    }

    case EDIT_DESCRIPTION: {
      const { id, text } = payload
      const newCard = state.find(card => card.id === id)
      newCard.description = text
      const cards = state.map(card => card.id === id ? newCard : card)
      return cards
    }

    case ADD_ATTACHMENT:{
      const { id, attachmentID } = payload
      const newCard = state.find(card => card.id === id)
      newCard.attachments.unshift(attachmentID)
      const cards = state.map(card => card.id === id ? newCard : card)
      return cards
    }
    
    case DELETE_ATTACHMENT:{
      const { id, attachmentID } = payload
      const newCard = state.find(card => card.id === id)
      const newAttachments = newCard.attachments.filter(attachID => attachID !== attachmentID)
      newCard.attachments =newAttachments
      const cards = state.map(card => card.id === id ? newCard : card)
      return cards
    }

    case ADD_LABEL:{
      const { id, labelID } = payload
      const newCard = state.find(card => card.id === id)

      newCard.labels.push(labelID)

      const cards = state.map(card => card.id === id ? newCard : card)
      return cards
    }

    case REMOVE_LABEL:{
      const { id, labelID } = payload
      const newCard = state.find(card => card.id === id)

      const newLabels = newCard.labels.filter(label => label !== labelID)
      console.log(newLabels)
      newCard.labels = newLabels
      const cards = state.map(card => card.id === id ? newCard : card)
      return cards
    }

    case ADD_ACTIVITY:{
      const { cardID, activityID } = payload
      const newCard = state.find(card => card.id === cardID)
      newCard.activities.unshift(activityID)
      const cards = state.map(card => card.id === cardID ? newCard : card)
      return cards
    }

    case DELETE_ACTIVITY:{
      const { cardID, activityID } = payload
      const newCard = state.find(card => card.id === cardID)
      const newAct = newCard.activities.filter(actID => actID !== activityID)
      newCard.activities =newAct
      const cards = state.map(card => card.id === cardID ? newCard : card)
      return cards
    }

    case ADD_CHECKLIST:{
      const { id, checklistID } = payload
      const newCard = state.find(card => card.id === id)
      newCard.checklists.push(checklistID)
      const cards = state.map(card => card.id === id ? newCard : card)
      return cards
    }

    case DELETE_CHECKLIST:{
      const { id, checklistID } = payload
      const newCard = state.find(card => card.id === id)
      const newChecklists = newCard.checklists.filter(checkID => checkID !== checklistID)
      newCard.checklists =newChecklists
      const cards = state.map(card => card.id === id ? newCard : card)
      return cards
    }

    case DELETE_CARD: {
      const { id } = payload;
      const newCard = state.filter(card => card.id !== id)
      return newCard
    }

    default:
      return state;
  }
};

export default cardsReducer;
