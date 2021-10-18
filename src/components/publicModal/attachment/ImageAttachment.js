import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import ImageModal from '../ImageModal'
//import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import CallMadeOutlinedIcon from '@material-ui/icons/CallMadeOutlined'
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
function ImageAttachment({ attachment }) {
    const [open, setOpen] = React.useState(false)
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
                        <SpanTitle>
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
                                Added {moment(attachment.time).fromNow()}
                            </SpanDesc>
                    </ColFlex>
                </AttachmentDetails>
            </RowFlexMain>
        </Container>
    )
}

export default ImageAttachment
