import React from 'react'
import styled from "styled-components"
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';
import ClearIcon from '@material-ui/icons/Clear';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useDispatch } from 'react-redux'

const Container = styled.div`
position: relative;
height:100%;
width:100%;
margin:0 0 8px 0;
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
const Title = styled.h3`
font-size:16px;
color:#172b4d;
font-weight:600;
line-height:20px;
height:20px;
width:83px;
min-width:40px;
min-height:18px;
display:block;
`
const DescButton = styled.div`
height:40px;
font-size:14px;
line-height:20px;
width:auto;
font-weight:400;
padding:8px 12px;
min-height:40px;
display:block;
cursor:pointer;
color:#091e42;
background:#eaecef;
`
const Button = styled.button`
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
const Delete = styled.div`
font-size:14px;
line-height:20px;
text-align:center;
color:#091e42;
float:right;
font-weight:400;
background:#eaecef;
width:auto;
margin:0 0 0 8px;
padding:6px 12px;
border:none;
border-radius:3px;
cursor:pointer;
&:hover{
    background:#e1e4e9;
}
`
const ContainerPadding = styled.div`
padding: 0 0 0 40px;
@media(max-width:960px){
    padding:0
  }
`
const ContainerPaddingText = styled.div`
padding: 0 16px 0 40px;
@media(max-width:960px){
    padding:0
  }
`
const textareaStyle = {
    fontSize: '14px',
    fontFamily: 'roboto',
    background: '#fff',
    lineHeight: '20px',
    padding: '6px 10px',
    fontWeight: '400',
    color: '#172b4d',
    display: 'block',
    whiteSpace: 'pre-wrap',
    width: '99%',
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
const flexStart = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
}
const flexCenter = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '8px'
}
const clearButton = {
    cursor: 'pointer',
    color: '#71909a',
    margin: '0 0 0 8px'
}
const DescP = styled.p`
font-size:14px;
line-height:20px;
word-spacing:0px;
color:#172b4d;
min-height:20px;
height:auto;
width:100%;
padding:0;
margin:0 0 8px 0;
cursor:pointer;
word-break:break-all;
white-space:pre-wrap;
hyphens:auto;
`

export default function Description({ description, cardID }) {
    const [open, setOpen] = React.useState(false)
    const [text, setText] = React.useState(description)
    const dispatch = useDispatch()

    const addDescription = () => {
       /* if (!text) {
            setOpen(false)
            setText(description)
            return
        }*/
        dispatch({
            type: 'EDIT_DESCRIPTION',
            payload: { id: cardID, text }
        })
        setOpen(false)
    }
    return (
        <div>
            <Container>
                <div style={flexStart}>
                    <IconSpan><SubjectRoundedIcon /></IconSpan>
                    <Title>Description</Title>{ !open && <span>{description && <Delete onClick={() => setOpen(true)}>Edit</Delete>}</span>}
                </div>
                    {!open && <ContainerPadding>
                        { !description ? <DescButton onClick={() => setOpen(true)}>Add a more detailed description...</DescButton> :
                        <DescP onClick={() => setOpen(true)}>{description}</DescP>}
                    </ContainerPadding>}
                {open &&
                    <ContainerPaddingText>
                        <TextareaAutosize
                            placeholder='Add a more detailed description...'
                            rows='5'
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            style={textareaStyle}
                            autoFocus
                            onBlur={() => { addDescription() }}></TextareaAutosize>
                        <div style={flexCenter}>
                            <Button
                                onMouseDown={() => { addDescription() }}
                                variant="contained"
                                disableElevation
                                color='inherit'
                            >
                                Save
                        </Button>
                            <IconSpan>
                                <ClearIcon style={clearButton}
                                    onMouseDown={() => {
                                        setText(description)
                                        setOpen(false)
                                    }} /></IconSpan>
                        </div>
                    </ContainerPaddingText>
                }
            </Container>
        </div>
    )
}
