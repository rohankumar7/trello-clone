import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import ImageModal from '../ImageModal'

const RowFlexStart = styled.div`
display: flex;
width:100%;
height:100%;
flex-direction: row; 
justify-content: flex-start;
align-items:flex-start;
margin:16px 0 24px 0;
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
const Text = styled.span`
font-size:14px;
color:#172b4d;
line-height:20px;
`
const Time = styled.span`
font-size:12px;
color:#71909a;
line-height:14px;
display:flex;
align-items:center;
`
const flex = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%'
}
export default function Log({avatar, name, text, time, link }) {
    const [open, setOpen] = React.useState(false)
    return (
        <>
            {open && <ImageModal setOpen={setOpen} imageUrl={link} time={time} name={''} />}
            <RowFlexStart>
                <Avatar>{avatar}</Avatar>
                <div style={flex}>
                    <Text>
                        <span style={{ fontWeight: '700' }}>{name}</span> {text}
                    </Text>
                    {link &&
                        <img
                            onClick={() => setOpen(true)}
                            style={{ cursor: 'pointer',borderRadius:'3px',margin:'8px 0 0 0' }}
                            src={link}
                            height='200px'
                            width='auto' />
                    }
                    <Time>{moment(time).fromNow()}</Time>
                </div>
            </RowFlexStart>
        </>
    )
}
