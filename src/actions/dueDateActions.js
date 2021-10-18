import { ADD_DUEDDATE,DELETE_DUEDATE, DUEDATE_SELECTED } from '../constants'

export const dueDateAdd = (date,cardID) => {
    const dueDate = {
        date,
        selected:false
    }
    return dispatch => {
        dispatch({
            type: ADD_DUEDDATE,
            payload: { dueDate, cardID }
        })
    }
}
export const dueDateDelete = (cardID) => {
    return dispatch => {
        dispatch({
            type: DELETE_DUEDATE,
            payload: { cardID }
        })
    }
}
export const toggleDate = cardID =>{
    return dispatch =>{
        dispatch({
            type: DUEDATE_SELECTED,
            payload : { cardID }
        })
    }
}