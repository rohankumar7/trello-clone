import { ADD_LIST, EDIT_LIST_TITLE, DELETE_LIST, ADD_CARD, SORT_CARD, MOVE_ALL_CARDS, SORT } from '../constants'

const initialState = []

const listReducer = (state = initialState, { type, payload }) =>{
    switch(type){
        case ADD_LIST : {
            const { title, listID } = payload
            const newList = {
                id:listID,
                title,
                cards:[],
                watch:false
            }
            return [...state,newList]
        }
        case ADD_CARD : {
            const { listID, cardID, position } = payload
            const newList = state.find(list => list.id === listID)
            
            if(position === 'bottom') newList.cards.push(cardID)
            if(position === 'top') newList.cards.unshift(cardID)

            const lists = state.map(list => list.id === listID ? newList : list)
            return lists
        }
        case SORT_CARD : {
            const { destination, source, draggableId } = payload

            const start = state.find(list => list.id === source.droppableId)
            const finish = state.find(list => list.id === destination.droppableId)

            if(start === finish){
                const newCards = start.cards
                newCards.splice(source.index,1)
                newCards.splice(destination.index,0,draggableId)
                start.cards = newCards
                const lists = state.map(list => list.id === source.droppableId ? start : list)
                return lists
            }

            const startCards = start.cards
            startCards.splice(source.index,1)
            start.cards = startCards

            const finishCards = finish.cards
            finishCards.splice(destination.index,0,draggableId)
            finish.cards = finishCards
            
            const newlists = state.map(list => list.id === source.droppableId ? start : list)
            .map(list => list.id === destination.droppableId ? finish : list)
            return newlists

        }

        case MOVE_ALL_CARDS : {

            const { srcListID, destListID } = payload
            const srcList = state.find(list => list.id === srcListID)
            const srcCards = srcList.cards
            const destList = state.find(list => list.id === destListID)
            const destCards = destList.cards
            const newCards = destCards.concat(srcCards)

            destList.cards = newCards
            srcList.cards = []

            const newlists = state.map(list => list.id === destListID ? destList : list)
            .map(list => list.id === srcListID ? srcList : list)
            return newlists

        }
        case SORT :{
            const { cardIDs, listID} = payload
            const newList = state.find(list => list.id === listID)
            newList.cards = cardIDs
            const lists = state.map(list => list.id === listID ? newList : list)
            return lists
        }
        case EDIT_LIST_TITLE : {

            const { listID, title } = payload
            const newList = state.find(list => list.id === listID)
            newList.title = title
            const lists = state.map(list => list.id === listID ? newList : list)
            return lists

        }
        case 'WATCH_TOGGLE' : {

            const { listID } = payload
            const newList = state.find(list => list.id === listID)
            const watch = newList.watch
            newList.watch = !watch
            const lists = state.map(list => list.id === listID ? newList : list)
            return lists

        }
        case DELETE_LIST:{
            return state
        }
        default:
            return state
    }
}
export default listReducer