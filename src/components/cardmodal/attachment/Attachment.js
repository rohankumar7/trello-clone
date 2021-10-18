import React from 'react'
import AttachmentModal from './AttachmentModal'
import styled from 'styled-components'
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';
import ImageAttachment from './ImageAttachment'
import {useSelector} from 'react-redux'

const AttachmentContainer = styled.div`
    height:100%;
    width:100%;
    margin:0 0 8px 0;
    padding: 0 0 8px 0;
    position: relative;
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
translate:rotate(45deg);
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
const RowFlex = styled.div`
display: flex;
flex-direction: row; 
justify-content: flex-start;
align-items:center;
`
const Button = styled.div`
font-size:14px;
line-height:20px;
text-align:center;
color:#091e42;
font-weight:400;
background:#eaecef;
width:124px;
margin:16px 0px 0px 40px;
padding:6px 12px;
border:none;
outline:none;
cursor:pointer;
display:block;
border-radius:3px;
&:hover{
    background:#e1e4e9;
}
@media(max-width:960px){
    margin:16px 0 0 0;
}
`

export default function Attachment({ attachmentOrder, cardID, open, handleOpen, handleClose }) {
    const attachments = useSelector(state => state.attachments)
    return (
        <div>
            <AttachmentModal cardID={cardID} open={open} handleClose={handleClose} />
            { attachmentOrder.length !== 0 && 
            <AttachmentContainer>
                <RowFlex>
                    <IconSpan><AttachmentOutlinedIcon style={{transform:'rotate(-45deg)'}}/></IconSpan>
                    <Title>Attachments</Title>
                </RowFlex>
                {
                    attachmentOrder.map(attachmentID => {
                        const attachment = attachments.find(attachment => attachment.id === attachmentID)
                        return(
                            <ImageAttachment key={attachment.id} cardID={cardID} attachment={attachment}/>
                        )
                    })
                }
                <Button onClick={handleOpen}>Add an attachment</Button>
            </AttachmentContainer> }
        </div>
    )
}
