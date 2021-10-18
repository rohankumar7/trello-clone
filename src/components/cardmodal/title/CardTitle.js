import React from 'react'
import styled from 'styled-components'
import ViewCompactOutlinedIcon from '@material-ui/icons/ViewCompactOutlined';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import { useDispatch } from 'react-redux'
import { editTitle } from '../../../actions/cardsActions'

const ListName = styled.div`
margin:8px 0 0 40px;
font-size:14px;
line-height:20px;
vertical-align:bottom;
color:#71909a;
height:20px;
display:flex;
align-items:center;
justify-content:flex-start;
`
const Container = styled.div`
position: relative;
height:auto;
width:auto;
margin:-16px 0 16px 0;
`
const IconSpan = styled.span`
text-align:center;
height:32px;
color:#42526e;
justify-content:center;
display:flex;
width:32px;
margin: 10px 8px 0 0;
vertical-align:bottom;
word-spacing : 0px;
align-items:center;
`
const Title = styled.div`
font-size:20px;
line-height:24px;
width:90%;
font-weight:500;
padding:16px 0px 0 0;
display:block;
cursor:pointer;
color:#091e42;
word-break:break-all;
white-space:pre-wrap;
hyphens:auto;
`
const RowFlex = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:flex-start;
`
const textareaStyle = {
    fontFamily: 'roboto',
    whiteSpace: 'pre-wrap',
    verticalAlign: 'baseline',
    width: '90%',
    padding: '4px 8px',
    fontSize: '19px',
    fontWeight: '500',
    lineHeight: '24px',
    color: '#172b4d',
    display: 'block',
    border: '2px solid #0079bf',
    outline: 'none',
    borderRadius: '3px',
    resize: 'none',
    background: '#fff',
    margin: '16px 0 0 0'
}
const CardTitle = React.memo(({listTitle,watch,title,id}) =>{

    const [open, setOpen] = React.useState(false)
    const [text, setText] = React.useState(title)
    const dispatch = useDispatch()
    const editCardTitle = () => {
        if(!text){
            setOpen(false)
            setText(title)
            return
        }
        dispatch(editTitle(id,text))
        setOpen(false)
    }

    return (
        <Container>
            <RowFlex>
                <IconSpan><ViewCompactOutlinedIcon /></IconSpan>
                {!open && <Title onClick={() => setOpen(true)}>{text}</Title>}
                {open &&
                    <TextareaAutosize
                        rows={1}
                        value={text}
                        autoFocus
                        style={textareaStyle}
                        onBlur={editCardTitle}
                        onChange={e => { setText(e.target.value) }}
                    >
                    </TextareaAutosize>
                }
            </RowFlex>
            <ListName>In list {listTitle} { watch && <VisibilityOutlinedIcon
                style={{
                    fontSize: '16px',
                    lineHeight: '20px',
                    marginLeft: '4px',
                    textAlign: 'center',
                    verticalAlign: 'baseline'
                }}
            />}</ListName>
        </Container>
    )
})
export default CardTitle