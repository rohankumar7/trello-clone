import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import moment from 'moment'

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


export default function AttachmentComment({ avatar, name, text, time }) {
    
    return (
        <div>
        <RowFlexStart>
            <Avatar>{avatar}</Avatar>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', height: '100%' }}>
                <RowFlex>
                    <Name>{name}</Name>
                    <Time>{moment(time).fromNow()}</Time>
                </RowFlex>
                    <CommentDiv>
                        <Link to={text.match(/\(([^)]+)\)/)[1]} target='_blank'>
                            {text.match(/\[(.*?)\]/)[1]}
                        </Link>
                    </CommentDiv>
            </div>
        </RowFlexStart>
        </div>
    )
}
