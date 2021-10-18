import { ADD_ATTACHMENT, EDIT_ATTACHMENT, DELETE_ATTACHMENT } from '../constants'
const initialState = []
const attachmentReducer = (state = initialState, {type,payload} ) =>{
    switch(type){
        case ADD_ATTACHMENT:{
            return [payload.attachment,...state]
        }
        case EDIT_ATTACHMENT:{
            const { id, name } = payload
            const newAttachment = state.find(attachment => attachment.id === id)
            newAttachment.name = name
            const attachments = state.map(attachment => attachment.id === id ? newAttachment : attachment)
            return attachments
        }
        case DELETE_ATTACHMENT:{
            const { attachmentID } =payload
            const newAttachment = state.filter(attach => attach.id !== attachmentID)
            return newAttachment
        }
        default : 
            return state
    }
}
export default attachmentReducer