import React from 'react'
import styled from 'styled-components'
import ClearIcon from '@material-ui/icons/Clear';
import { useDispatch,useSelector } from 'react-redux'
import { addList } from '../actions/listsActions'

const inputStyle = {
    fontSize: '14px',
    fontFamily: 'roboto',
    background: '#fff',
    lineHeight: '20px',
    padding: '6px 12px',
    fontWeight: '400',
    color: '#172b4d',
    display: 'block',
    whiteSpace: 'pre-wrap',
    width: '244px',
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

const flexMargin = { display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: '4px' }
const iconStyle = { cursor: 'pointer', color: '#71909a', margin: '0 0 0 8px' }
const container = { background: '#ebecf0', padding: '4px', width: '272px', height: '72px', borderRadius: '3px' }

function AddListForm({setOpen}) {

    const dispatch = useDispatch()
    const [text, setText] = React.useState('')

    const handleAddList = () => {
        if(!text){
            setOpen(false)
            return
        }
        dispatch(addList(text))
        setOpen(false)
    }
    return (
        <div style={container}>
            <input
                placeholder='Enter an title for this list...'
                value={text}
                style={inputStyle}
                autoFocus
                onChange={e => setText(e.target.value)}
                onBlur={() => { handleAddList() }}
            />
            <div style={flexMargin}>
                <ButtonSave onMouseDown={() => { handleAddList() }}>
                    Add List
                </ButtonSave>
                <IconSpan>
                    <ClearIcon style={iconStyle} onMouseDown={() => {
                        setText('')
                        setOpen(false)
                    }} />
                </IconSpan>
            </div>
        </div>
    )
}

export default AddListForm
