import React from 'react'
import styled from "styled-components"
import FormatAlignLeftRoundedIcon from '@material-ui/icons/FormatAlignLeftRounded'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { useSelector, useDispatch } from 'react-redux'
import Comment from './Comment'
import AttachmentComment from './AttachmentComment'
import Log from './Log'
import ClearIcon from '@material-ui/icons/Clear'
import { addActivities } from '../../../actions/activityActions'

const Container = styled.div`
position: relative;
height:100%;
width:100%;
margin:0 0 24px 0;
`
const IconSpan = styled.span`
text-align:center;
height:32px;
color:#42526e;
justify-content:center;
display:flex;
width:32px;
vertical-align:bottom;
word-spacing : 0px;
align-items:center;
margin:0 12px 0 0;
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
display:inline-block;
`
const LogButton = styled.div`
font-size:14px;
line-height:20px;
text-align:center;
color:#091e42;
float:right;
font-weight:400;
background:#eaecef;
width:auto;
margin:8px 0 0 0;
padding:6px 12px;
border:none;
border-radius:3px;
cursor:pointer;
&:hover{
    background:#e1e4e9;
}
`
const RowFlex = styled.div`
display: flex;
width:100%;
flex-direction: row; 
justify-content: flex-start;
align-items:center;
`
const RowFlexStart = styled.div`
display: flex;
width:100%;
flex-direction: row; 
justify-content: flex-start;
align-items:flex-start;
margin:0 0 8px 0;
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
height:30px;
width:30px;
padding:2px 4px;
border-radius:50%;
background:#e0e3e8;
color:#172b4d;
margin:0 4px 0 0;
`
const textareaStyle = {
    fontSize: '14px',
    fontFamily: 'roboto',
    background: '#fff',
    lineHeight: '20px',
    verticleAlign: 'baseline',
    padding: '8px 12px',
    fontWeight: '400',
    color: '#5e6c84',
    display: 'block',
    width: '99%',
    border: '1px solid #dde0e6',
    outline: 'none',
    resize: 'none',
    borderRadius: '3px',
    '&::placeholder': {
        fontFamily: 'roboto',
        fontSize: '14px',
        letterSpacing: 'normal',
        fontWeight: '400',
        color: '#5e6c84',
    },
}
const textareaStyleExpand = {
    fontSize: '14px',
    fontFamily: 'roboto',
    background: '#fff',
    lineHeight: '20px',
    verticleAlign: 'baseline',
    padding: '8px 4px',
    fontWeight: '400',
    color: '#172b4d',
    display: 'block',
    marginBottom: '8px',
    width: '100%',
    border: 'none',
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
const ExpandedTextArea = styled.div`
width:100%;
background:#fff;
padding:0px 8px 8px 8px;
border-radius:3px;
border:1px solid #dde0e6;
box-shadow: 0px 6px 10px rgba(0,0,0,0.1);
`
const ButtonSave = styled.button`
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
padding:6px 12px;
min-height:auto;
outline:none;
min-width:auto;
display:block;
cursor:pointer;
&:hover{
    background-color:#61bd4f;
}
`

export default function Activity({ activityOrder, cardID }) {

    const dispatch = useDispatch()
    const activitiesState = useSelector(state => state.activities)
    const [open, setOpen] = React.useState(false)
    const [text, setText] = React.useState('')
    const [filter,setFilter] = React.useState(false)

    const closeCommentBox = () => {
        setText('')
        setOpen(false)
    }
    const addComment = () => {
        if (!text) {
            setOpen(true)
        }
        if (text) {

            const id = `activity-${Date.now()}`
            const time = new Date()
            const activity = {
                id, type: 'comment', name: 'Rohan Kumar', text, time
            }
            dispatch(addActivities(id, cardID, activity))
            setText('')
            setOpen(false)
        }
    }
    const activities = React.useMemo(()=>{
        let filteredData = activitiesState
        if(filter){
        filteredData = filteredData.filter(activity => activity.type !== 'log')
        }
        return filteredData
    },[filter,activitiesState])
    return (
        <div>
            <Container>
                <RowFlex>
                    <IconSpan><FormatAlignLeftRoundedIcon /></IconSpan>
                    <div style={{ width: '100%' }}><Title>Activity</Title><LogButton onClick={e => setFilter(!filter)}>{filter ? 'Show Details' : 'Hide Details'}</LogButton></div>
                </RowFlex>
                <RowFlexStart>
                    <Avatar>RK</Avatar>
                    {!open && <TextareaAutosize
                        rows={1}
                        placeholder='Write a comment...'
                        style={textareaStyle}
                        onClick={(e) => { setOpen(true) }}
                        onBlur={(e) => { setOpen(false) }}
                    >
                    </TextareaAutosize>}
                    {open && <ExpandedTextArea>
                        <TextareaAutosize
                            rows={1}
                            value={text}
                            autoFocus
                            placeholder='Write a comment...'
                            style={textareaStyleExpand}
                            onChange={e => setText(e.target.value)}
                        >
                        </TextareaAutosize>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: '8px' }}>
                            <ButtonSave onMouseDown={addComment}>
                                Save
                            </ButtonSave>
                            <IconSpan><ClearIcon style={{ cursor: 'pointer', color: '#71909a', margin: '0 0 0 8px' }} onMouseDown={closeCommentBox} /></IconSpan>
                        </div>
                    </ExpandedTextArea>}
                </RowFlexStart>
                {
                    activityOrder.length !== 0 && activityOrder.map(activityID => {
                        const activity = activities.find(activity => activity.id === activityID)
                        if (activity) {
                            const name = activity.name
                            const avatarName = name.match(/\b(\w)/g).join('').toUpperCase()
                            if (activity.type === 'comment') {
                                return (<Comment
                                    key={activity.id}
                                    id={activity.id}
                                    avatar={avatarName}
                                    name={activity.name}
                                    text={activity.text}
                                    time={activity.time}
                                    cardID={cardID} />)
                            }
                            if (activity.type === 'attachment') {
                                return (<AttachmentComment
                                    key={activity.id}
                                    id={activity.id}
                                    avatar={avatarName}
                                    name={activity.name}
                                    text={activity.text}
                                    time={activity.time}
                                    cardID={cardID} />)
                            }
                            if (activity.type === 'log')
                                return (<Log
                                    key={activity.id}
                                    avatar={avatarName}
                                    name={activity.name}
                                    text={activity.text}
                                    time={activity.time}
                                    link={activity.link} />)
                        }
                    })
                }
            </Container>
        </div>
    )
}
