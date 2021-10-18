import { ADD_ACTIVITY, DELETE_ACTIVITY } from '../constants'

export const addActivities = (activityID,cardID,activity) => {
    return dispatch => {
        dispatch({
            type: ADD_ACTIVITY,
            payload: { activityID, cardID, activity }
        })
    }
}

export const deleteActivities = (activityID,cardID) => {
    return dispatch => {
        dispatch({
            type: DELETE_ACTIVITY,
            payload: { activityID, cardID }
        })
    }
}