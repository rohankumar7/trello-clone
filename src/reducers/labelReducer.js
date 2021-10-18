import { CREATE_LABEL, EDIT_LABEL, DELETE_LABEL, CURRENT_LABEL } from '../constants'

const initialState ={labels:[
    { id: 'label-1', color: "#61bd4f", colorName :'green' ,text: '' },
    { id: 'label-2', color: "#f2d600", colorName :'yellow',text: '' },
    { id: 'label-3', color: "#ffa01a", colorName :'orange',text: '' },
    { id: 'label-4', color: "#eb5a46", colorName :'red',text: '' },
    { id: 'label-5', color: "#c277e0", colorName :'purple',text: '' },
    { id: 'label-6', color: "#0079bf", colorName :'blue',text: '' }
    ],
    currentLabel : {}
}

const labelReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_LABEL: {
            const { id, color,colorName, text } = payload
            const newLabel = { id: `label-${id}`, color,colorName, text }
            return {
                ...state,
                labels:[...state.labels,newLabel]
            }
        }
        case EDIT_LABEL: {
            const { id, color,colorName, text } = payload
            const newLabel = { id, color, colorName, text }
            const labels = state.labels.map(label => label.id === id ? newLabel : label)
            return {
                ...state,
                labels:labels
            }
        }

        case DELETE_LABEL: {
            const { id } = payload
            const newLabels = state.labels.filter(label => label.id !== id)
            return {
                ...state,
                labels:newLabels
            }
        }
        case CURRENT_LABEL: {
            const { id } = payload
            const label = state.labels.find(label => label.id === id)
            return {
                ...state,
                currentLabel : label
            }
        }
        default:
            return state
    }
}
export default labelReducer