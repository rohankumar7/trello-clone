import React from 'react'
import styled from 'styled-components'
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { useDispatch } from 'react-redux'
import ClearIcon from '@material-ui/icons/Clear'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { deleteActivities } from '../../../actions/activityActions'

const RowFlexStart = styled.div`
display: flex;
width:100%;
height:100%;
flex-direction: row; 
justify-content: flex-start;
align-items:flex-start;
margin:16px 0 0 0;
`
const Avatar = styled.div`
font-size:12px;
font-weight:700;
line-height:32px;
text-align:center;
display:flex;
justify-content:center;
align-items:center;
word-spacing:0px;
min-height:30px;
min-width:30px;
padding:1px 2px;
border-radius:50%;
background:#e0e3e8;
color:#172b4d;
margin:0 4px 0 0;
`
const CommentDiv = styled.div`
padding: 8px 12px;
background:#fff;
color:#172b4d;
border-radius:3px;
border:1px solid #dde0e6;
font-size:14px;
width:auto;
line-height:18px;
display:inline-block;
word-break:break-all;
white-space:pre-wrap;
hyphens:manual;
word-spacing:0px;
`
const Name = styled.span`
font-size:14px;
color:#172b4d;
font-weight:700;
line-height:20px;
display:flex;
align-items:center;
`
const Time = styled.span`
font-size:12px;
margin:0 0 0 8px;
color:#172b4d;
line-height:14px;
display:flex;
align-items:center;
`
const Actions = styled.div`
height:25px;
font-size:12px;
line-height:24px;
width:auto;
color:#71909a;
display:flex;
justify-content:start;
align-items:center;
`
const RowFlex = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:flex-start;
`;
const textareaStyle = {
    fontSize: '14px',
    fontFamily: 'roboto',
    background: '#fff',
    lineHeight: '20px',
    padding: '6px 12px',
    fontWeight: '400',
    color: '#172b4d',
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

export default function AttachmentComment({ id, avatar, name, text, time, cardID }) {
    
    const [open, setOpen] = React.useState(false)
    const [comment, setComment] = React.useState(text)
    const dispatch = useDispatch()

    const editComment = () => {
        if (!comment) {
            setOpen(false)
            return
        }
        dispatch({
            type: 'EDIT_ACTIVITY',
            payload: { id, text: comment }
        })
        setOpen(false)
    }

    const deleteComment = () => {
        dispatch(deleteActivities(id,cardID))
    }
    return (
        <div>
        <RowFlexStart>
            <Avatar>{avatar}</Avatar>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', height: '100%' }}>
                <RowFlex>
                    <Name>{name}</Name>
                    <Time>{moment(time).fromNow()}</Time>
                </RowFlex>
                {! open && <><div>
                    <CommentDiv>
                        <Link to={text.match(/\(([^)]+)\)/)[1]} target='_blank'>
                            {text.match(/\[(.*?)\]/)[1]}
                        </Link>
                    </CommentDiv>
                </div>
                <Actions>
                    <EmojiEmotionsOutlinedIcon style={{ fontSize: '16px', margin: '0 4px 0 0' }} />
                &#183; <span onClick={() => setOpen(true)} style={{ textDecoration: 'underline', cursor: 'pointer', margin: '0 4px' }}>
                        Edit
                    </span> &#183;
                    <span onClick={deleteComment} style={{ textDecoration: 'underline', cursor: 'pointer', margin: '0 4px' }}>
                        Delete
                    </span>
                </Actions></>}
            </div>
        </RowFlexStart>
        {open && 
                <div style={{ padding: '0 28px 0 40px', marginTop:'-15px' }}>
                    <TextareaAutosize
                        rows={2}
                        value={comment}
                        autoFocus
                        style={textareaStyle}
                        readOnly
                        onChange={(e) => { setComment(e.target.value) }}
                        /*onFocus={(e)=>e.target.select()}*/
                        onBlur={() => editComment()}
                    >
                    </TextareaAutosize>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: '8px' }}>
                        <ButtonSave
                            onMouseDown={() => editComment()}
                        >
                            Save
                        </ButtonSave>
                        <IconSpan><ClearIcon style={{ cursor: 'pointer',color:'#71909a',margin:'0 0 0 8px' }} onMouseDown={() => {
                            setComment(text) 
                            setOpen(false)
                            }} /></IconSpan>
                    </div>
             </div>}
        </div>

    )
}
