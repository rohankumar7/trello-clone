import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import VideoLabelOutlinedIcon from '@material-ui/icons/VideoLabelOutlined'
import CallMadeOutlinedIcon from '@material-ui/icons/CallMadeOutlined'
import moment from 'moment'
import ImageModal from '../ImageModal'
import ClearIcon from '@material-ui/icons/Clear'
//import { useHistory } from 'react-router-dom'
import { deleteAttachments } from '../../../actions/attachmentActions'
import { addActivities } from '../../../actions/activityActions'
import { motion } from 'framer-motion'

const RowFlexMain = styled.div`
display: flex;
flex-direction: row; 
justify-content: flex-start;
align-items:center;
margin:0 0 8px 0;
height:auto;
opacity:0.8;
border-radius:3px; 
    &:hover{
        background:#eaecef;
    }
`
const Attach = styled.div`
    background:#e0e3e7;
    height: 80px;
    width:112px;
    text-align:center;
    font-size:18px;
    line-height:20px;
    word-spacing:0px;
    color:#5e6c84;
    font-weight:700;
    display:flex;
    border-radius:3px;
    justify-content:center;
    cursor:pointer;
    align-items:center;
    ${RowFlexMain}:hover &{
        background:#eae3e7;
    }
`
const AttachmentDetails = styled.div`
    height:auto;
    width:80%;
    margin: 0 0 0 16px;
    padding:8px 0;
`
const SpanTitle = styled.span`
font-size:14px;
font-weight:700;
line-height:20px;
display:inline;
cursor:pointer
`
const SpanDesc = styled.span`
font-size:14px;
line-height:20px;
text-decoration:none;
word-spacing:0px;
width:auto;
margin:0 0 4px 0;
display:block;
color:#5e6c84;
`
const SpanLink = styled.span`
    text-decoration : underline;
    cursor:pointer;
    color:#5e6c84;
    margin:0 4px;
    &:hover{
        color:#172b4d;
    }
`
const ColFlex = styled.div`
display: flex;
flex-direction: column; 
justify-content: flex-start;
align-items:flex-start;
`
const RowFlex = styled.div`
display: flex;
flex-direction: row; 
justify-content: flex-start;
align-items:center;
`
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
const Container = styled.div`
padding: 0 8px 0 40px;
@media(max-width:960px){
    padding: 0;
}
`
const ImgStyle = {
    height: '90%',
    maxWidth: '90%',
    borderRadius: '3px'
}
function ImageAttachment({ cardID, attachment }) {
    const [open, setOpen] = React.useState(false)
    const [textOpen, setTextOpen] = React.useState(false)
    const [name, setName] = React.useState(attachment.name)
    const dispatch = useDispatch()

    const cards = useSelector(state => state.cards)
    const card = cards.find(card => card.id === cardID)
    const cover = card.cover

    const deleteImageAttachment = id => {
        dispatch(deleteAttachments(cardID, id))
        const log = `deleted the ${attachment.name} attachment from this card.`
        const activity = {
            id: `activity-${Date.now()}`,
            type: 'log',
            name: 'Rohan Kumar',
            text: log,
            time: new Date()
        }
        dispatch(addActivities(activity.id, cardID, activity))
    }
    const editName = () => {
        if (!name) {
            setTextOpen(false)
            return
        }
        dispatch({
            type: 'EDIT_ATTACHMENT',
            payload: { id: attachment.id, name }
        })
        setTextOpen(false)
    }
    const makeCover = link => {
        const cover ={
            link,
            color:''
        }
        dispatch({
            type: 'EDIT_COVER',
            payload: { cardID, cover }
        })
    }
    const removeCover = () => {
        dispatch({
            type: 'DELETE_COVER',
            payload: { cardID }
        })
    }
    const addToComment = () => {
        const id = `activity-${Date.now()}`
        const time = new Date()
        const text = `[${attachment.name}](${attachment.link})`
        const activity = {
            id, type: 'attachment', name: 'Rohan Kumar', text, time
        }
        dispatch(addActivities(id, cardID, activity))
    }
    return (
        <Container>
            {open && <ImageModal open={open} setOpen={setOpen} imageUrl={attachment.link} name={attachment.name} />}
            <RowFlexMain>
                <Attach onClick={() => setOpen(true)}>
                    <motion.img alt='' src={attachment.link} 
                        style={ImgStyle} 
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1}}
                        transition={{ delay: 0.5 }} />
                </Attach>
                <AttachmentDetails>
                    <ColFlex>
                        {textOpen && <div style={{ width: '90%' }}>
                            <input
                                value={name}
                                autoFocus
                                style={textareaStyle}
                                onChange={(e) => { setName(e.target.value) }}
                                onFocus={(e) => { e.target.select() }}
                                onBlur={() => { editName() }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: '8px' }}>
                                <ButtonSave
                                    onMouseDown={() => { editName() }}
                                >
                                    Save
                        </ButtonSave>
                                <IconSpan><ClearIcon style={{ cursor: 'pointer', color: '#71909a', margin: '0 0 0 8px' }} onMouseDown={() => {
                                    setName(attachment.name)
                                    setTextOpen(false)
                                }} /></IconSpan>
                            </div>
                        </div>}
                        {!textOpen && <><SpanTitle>
                            <span onClick={() => setOpen(true)}>{attachment.name}</span>
                            <CallMadeOutlinedIcon
                                onClick={() => { }}
                                style={{
                                    fontSize: '16px',
                                    lineHeight: '20px',
                                    marginLeft: '8px',
                                    textAlign: 'center',
                                    verticalAlign: 'bottom',
                                    cursor: 'pointer'
                                }}
                            />
                        </SpanTitle>
                            <SpanDesc>
                                Added {moment(attachment.time).fromNow()} &#183;
                            <SpanLink onClick={() => addToComment()}>Comment</SpanLink> &#183;
                            <SpanLink onClick={() => deleteImageAttachment(attachment.id)}>Delete</SpanLink> &#183;
                            <SpanLink onClick={() => setTextOpen(true)}>Edit</SpanLink>
                            </SpanDesc>
                            <div>
                                <RowFlex>
                                    <VideoLabelOutlinedIcon style={{ fontSize: '16px', color: '#5e6c84', marginRight: '8px' }} />
                                    <SpanDesc>
                                        {cover.link === attachment.link ? <SpanLink onClick={() => removeCover()}>Remove Cover</SpanLink> : <SpanLink onClick={() => makeCover(attachment.link)}>Make Cover</SpanLink>}

                                    </SpanDesc>
                                </RowFlex>
                            </div></>}
                    </ColFlex>
                </AttachmentDetails>
            </RowFlexMain>
        </Container>
    )
}

export default ImageAttachment
