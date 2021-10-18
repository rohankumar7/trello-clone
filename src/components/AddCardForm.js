import React from 'react'
import styled from 'styled-components'
import ClearIcon from '@material-ui/icons/Clear';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { useDispatch } from 'react-redux'
import { addCard } from '../actions/cardsActions'


const inputStyle = {
    fontSize: '14px',
    fontFamily: 'roboto',
    background: '#fff',
    lineHeight: '20px',
    padding: '6px 8px',
    fontWeight: '400',
    color: '#172b4d',
    display: 'block',
    whiteSpace: 'pre-wrap',
    width: '244px',
    border: '1px solid #fff',
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

const flexMargin = { display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: '8px' }
const iconStyle = { cursor: 'pointer', color: '#71909a', margin: '0 0 0 8px' }

function AddForm({listID,setOpen,position}) {
    
    const dispatch = useDispatch()
    const [text, setText] = React.useState('')

    const handleSubmit = () =>{
        if(!text){
            setOpen(false)
            return
        }
        dispatch(addCard(listID,text,position))
        setOpen(false)
    }
    return (
        <div style={{margin:'0 0 4px 0'}}>
            <Card>
                <CardContent style={{padding:'0px'}}>
                    <TextareaAutosize
                        placeholder='Enter a title for this card...'
                        value={text}
                        rows={3}
                        style={inputStyle}
                        autoFocus
                        onChange={e => setText(e.target.value)}
                        onBlur={() => {handleSubmit()}}
                    />
                </CardContent>
            </Card>
            <div style={flexMargin}>
                <ButtonSave onMouseDown={() => {handleSubmit()}}>
                    Add Card
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

export default AddForm
