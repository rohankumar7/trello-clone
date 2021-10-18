import { ADD_ACTIVITY, EDIT_ACTIVITY, DELETE_ACTIVITY } from '../constants'
const initialState = []

const activityReducer = (state = initialState, {type,payload} ) =>{
    switch(type){
        case ADD_ACTIVITY:{
            const { activity } = payload
            return [activity,...state]
        }
        case EDIT_ACTIVITY:{
            const { id, text } = payload
            const newActivity = state.find(activity => activity.id === id)
            newActivity.text = text
            const activities = state.map(activitiy => activitiy.id === id ? newActivity : activitiy)
            return activities
        }
        case DELETE_ACTIVITY:{
            const { activityID } = payload
            const newActivities = state.filter(activity => activity.id !== activityID)
            return newActivities
        }
        default : 
            return state
    }
}
export default activityReducer