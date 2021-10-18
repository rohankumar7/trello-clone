import { ADD_CHECKLIST, DELETE_CHECKLIST } from '../constants'

export const addChecklists = (cardID,id,name) => {
    return dispatch =>{
        dispatch({
            type: ADD_CHECKLIST,
            payload: {id:cardID , checklistID:id , name}
        })
    }
}
export const deleteChecklists = (id,cardID) => {
    return dispatch =>{
        dispatch({
            type: DELETE_CHECKLIST,
            payload: { id:cardID, checklistID:id }
        })
    }
}