import React from 'react'
import styled from 'styled-components'
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import ClearIcon from '@material-ui/icons/Clear'
import { useDispatch } from 'react-redux'
import { addActivities } from '../../../actions/activityActions'

const List = styled.div`
display: flex;
width:100%;
flex-direction: row; 
justify-content: flex-start;
align-items:center;
border-radius:3px;
&:hover{
    background:#eaecef;
}
`
const ListTitle = styled.span`
font-size:14px;
color:${props => props.check ? '#71909a' : 'rgb(23,43,77)'};
line-height:20px;
height:auto;
cursor:pointer;
text-decoration:${props => props.check ? 'line-through' : ''};
width:100%;
min-width:40px;
min-height:18px;
display:inline-block;
`
const Clear = styled.span`
display:none;
float:right;
width:20px;
margin-right:-20px;
color:#71909a;
padding:2px 0px 0 0;
line-height:20px;
text-align:center;
opacity: 0.8;
${List}:hover & {
  display: block;
  cursor: pointer;
}
&:hover {
  opacity: 1;
}
`
const ListIcon = styled.span`
text-align:center;
height:32px;
color:#dfe1e6;
justify-content:center;
display:flex;
width:32px;
cursor:pointer;
margin-right: 8px;
vertical-align:bottom;
word-spacing : 0px;
align-items:center;
`
const inputList = {
    fontSize: '14px',
    fontFamily: 'roboto',
    background: '#eaecef',
    lineHeight: '20px',
    padding: '6px 12px',
    fontWeight: '400',
    color: '#172b4d',
    display: 'block',
    whiteSpace: 'pre-wrap',
    width: '100%',
    border: '1px solid #c5cad2',
    outline: 'none',
    resize: 'none',
    borderRadius: '3px',
    '&::placeholder': {
        fontFamily: 'roboto',
        fontSize: '14px',
        letterSpacing: 'normal',
        fontWeight: '400',
        color: '#5e6c84',
    }
}
const ButtonSave = styled.button`
font-size:14px;
line-height:20px;
text-align:center;
white-space:pre;
border:none;
color:#fff;
border-radius:3px;
word-spacing:0px;
background-color:#5aac44;
height:32px;
width:52px;
padding:6px 12px;
min-height:auto;
min-width:auto;
display:block;
cursor:pointer;
&:hover{
    background-color:#61bd4f;
}
`
const IconSpan = styled.span`
text-align:center;
height:32px;
color:#42526e;
justify-content:center;
display:flex;
width:32px;
margin-right: 8px;
vertical-align:bottom;
word-spacing : 0px;
align-items:center;
`

function ChecklistBodyLoop({ id, list, cardID }) {

    const dispatch = useDispatch()
    const [check, setCheck] = React.useState(list.selected)
    const [text, setText] = React.useState(list.text)
    const [listTextArea, setListTextArea] = React.useState(false)

    const editList = () => {
        if (!text) {
            setListTextArea(false)
            return
        }
        dispatch({
            type: 'EDIT_LIST_ITEM',
            payload: { checkID: id, id: list.id, text, selected: list.selected }
        })
        setListTextArea(false)
    }
    const deleteList = () => {
        dispatch({
            type: 'DELETE_LIST_ITEM',
            payload: { checkID: id, id: list.id }
        })
        percent()
    }
    const toggleCheck = () => {
        dispatch({
            type: 'EDIT_LIST_ITEM',
            payload: { checkID: id, id: list.id, text, selected: !check }
        })
        percent()
        let log = ''
        if (check === false) {
            log = `marked completed ${text} on this card.`
        }
        if (check === true) {
            log = `marked incomplete ${text} this card.`
        }
        const activity = {
            id: `activity-${Date.now()}`,
            type: 'log',
            name: 'Rohan Kumar',
            text:log,
            time: new Date()
        }
        dispatch(addActivities(activity.id, cardID, activity))
        setCheck(!check)
    }
    const percent = () => {
        dispatch({
            type: 'EDIT_PERCENT',
            payload: { checkID: id }
        })
    }
    return (
        <div>
            <List>
                <ListIcon>
                    {check ?
                        <DoneOutlinedIcon
                            style={{ color: '#0079bf' }}
                            onClick={toggleCheck} /> :
                        <CheckBoxOutlineBlankOutlinedIcon
                            style={{ color: '#dfe1e6' }}
                            onClick={toggleCheck} />}
                </ListIcon>
                {!listTextArea &&
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '0 24px 0 0' }}>
                        <div style={{ width: '100%' }}>
                            <ListTitle
                                check={check}
                                onClick={() =>
                                    setListTextArea(true)}>
                                {list.text}
                            </ListTitle>
                        </div>
                        <Clear>
                            <ClearIcon onClick={deleteList} style={{ fontSize: '16px' }} />
                        </Clear>
                    </div>
                }
                {listTextArea &&
                    <div style={{ width: '100%', padding: '0 26px 8px 0' }}><input
                        placeholder='Add an item'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        style={inputList}
                        autoFocus
                        onFocus={(e) => e.target.select()}
                        onBlur={() => editList()}
                    />
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: '8px' }}>
                            <ButtonSave
                                onMouseDown={() => editList()}
                            >
                                Save
                        </ButtonSave>
                            <IconSpan><ClearIcon style={{ cursor: 'pointer' }} onMouseDown={() => {
                                setText(list.text)
                                setListTextArea(false)
                            }} /></IconSpan>
                        </div>
                    </div>}
            </List>
        </div>
    )
}

export default ChecklistBodyLoop
