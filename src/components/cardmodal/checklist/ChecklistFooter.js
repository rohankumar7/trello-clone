import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import ClearIcon from '@material-ui/icons/Clear';

const Button = styled.div`
font-size:14px;
line-height:20px;
text-align:center;
color:#091e42;
font-weight:400;
background:#eaecef;
width:auto;
margin:8px 0 0 40px;
padding:6px 12px;
border:none;
border-radius:3px;
cursor:pointer;
display:inline-block;
&:hover{
    background:#e1e4e9;
}
`
const inputStyle = {
    fontSize: '14px',
    fontFamily: 'roboto',
    background: '#fff',
    lineHeight: '20px',
    padding: '6px 12px',
    fontWeight: '400',
    color: '#172b4d',
    margin: '16px 0 0 0',
    display: 'block',
    whiteSpace: 'pre-wrap',
    width: '100%',
    border: '2px solid #0079bf',
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
outline:none;
color:#fff;
border-radius:3px;
word-spacing:0px;
background-color:#5aac44;
height:32px;
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

function ChecklistFooter({ id }) {

    const dispatch = useDispatch()
    const [textOpen, setTextOpen] = React.useState(false)
    const [text, setText] = React.useState('')
    const handleEnter = e => {
        if (e.key === 'Enter') {
            if (!text) {
                setTextOpen(true)
                return
            }
            const listID = Date.now()
            dispatch({
                type: 'ADD_LIST_ITEM',
                payload: { checkID: id, id: listID, text, selected: false }
            })
            percent()
            setText('')
        }
    }
    const addList = () => {
        if (!text) {
            setTextOpen(false)
            return
        }
        const listID = Date.now()
        dispatch({
            type: 'ADD_LIST_ITEM',
            payload: { checkID: id, id: listID, text, selected: false }
        })
        percent()
        setText('')
        setTextOpen(false)
    }
    const percent = () => {
        dispatch({
            type: 'EDIT_PERCENT',
            payload: { checkID: id }
        })
    }

    return (
        <div>
            <div style={{ padding: '0 30px 0 40px' }} >
                {textOpen && <div>
                    <input
                        placeholder='Add an item'
                        value={text}
                        style={inputStyle}
                        autoFocus
                        onChange={e => setText(e.target.value)}
                        onBlur={()=>addList()}
                        onKeyPress={e => handleEnter(e)}
                    />
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: '8px' }}>
                        <ButtonSave
                            onMouseDown={()=>addList()}
                        >
                            Save
                        </ButtonSave>
                        <IconSpan><ClearIcon style={{ cursor: 'pointer',color:'#71909a',margin:'0 0 0 8px' }} onMouseDown={() => {
                            setText('')
                            setTextOpen(false)
                        }} /></IconSpan>
                    </div>
                </div>
                }
            </div>
            {!textOpen && <Button onClick={() => setTextOpen(true)}>Add an item</Button>}
        </div>
    )
}

export default ChecklistFooter
