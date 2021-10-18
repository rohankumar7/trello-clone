import { 
    ADD_CHECKLIST, 
    EDIT_CHECKLIST_NAME, 
    DELETE_CHECKLIST, 
    ADD_LIST_ITEM, 
    EDIT_LIST_ITEM, 
    DELETE_LIST_ITEM, 
    EDIT_PERCENT
} from '../constants'

const initialState = []

const checklistReducer =(state = initialState, {type,payload})=>{
    switch(type){
        case ADD_CHECKLIST:{
            const { checklistID, name } = payload
            const checklist = {
                id:checklistID,
                percent:0,
                name,
                list:[]
            }
            return [...state,checklist]
        }
        case EDIT_CHECKLIST_NAME:{
            const { checklistID, name } = payload
            const checklist = state.find(checklist => checklist.id === checklistID)
            checklist.name = name
            const checklists = state.map(check => check.id === checklistID ? checklist : check)
            return [...state,checklists]
        }
        case DELETE_CHECKLIST:{
            const { checklistID } =payload
            const newChecklist = state.filter(checklist => checklist.id !== checklistID)
            return newChecklist
        }
        case ADD_LIST_ITEM:{
            const { checkID, id, text, selected } = payload
            const list = { id, text, selected }
            const checklist = state.find(checklist => checklist.id === checkID)
            checklist.list.push(list)
            return [...state]
        }
        case EDIT_LIST_ITEM:{
            const { checkID, id, text, selected } = payload
            const checklist = state.find(checklist => checklist.id === checkID)
            const newList = { id, text, selected }
            const list = checklist.list.map(list => list.id === id ? newList : list)
            checklist.list = list
            return [...state]
        }
        case EDIT_PERCENT:{
            const { checkID } = payload
            const checklist = state.find(checklist => checklist.id === checkID)
            const length = checklist.list.length
            const count = checklist.list.filter(list=> list.selected).length
            const percentage = ((count / length) * 100).toFixed(0)
            checklist.percent = percentage
            return [...state]
        }
        case DELETE_LIST_ITEM:{
            const { checkID, id } = payload
            const checklist = state.find(checklist => checklist.id === checkID)
            const list = checklist.list.filter(list => list.id !== id)
            checklist.list = list
            return [...state]

        }
        default:
            return state
    }
}
export default checklistReducer