import { ADD_ATTACHMENT, DELETE_ATTACHMENT } from '../constants'

export const addAttachments = (cardID,attachment) => {
    return dispatch => {
        dispatch({
            type:ADD_ATTACHMENT,
            payload: { id:cardID, attachmentID:attachment.id, attachment }
        })
    }
}
export const deleteAttachments = (id,attachmentID) =>{
    return dispatch => {
        dispatch({
            type:DELETE_ATTACHMENT,
            payload: { id, attachmentID}
        })
    }
}