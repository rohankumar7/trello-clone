import React from 'react'
import styled from "styled-components"
import FormatAlignLeftOutlinedIcon from '@material-ui/icons/FormatAlignLeftOutlined'
import { useSelector } from 'react-redux'
import Comment from './Comment'
import AttachmentComment from './AttachmentComment'
import Log from './Log'

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

export default function Activity({ activityOrder }) {

    const activitiesState = useSelector(state => state.activities)
    const [filter,setFilter] = React.useState(false)

    const activities = React.useMemo(()=>{
        let filteredData = activitiesState
        if(filter){
        filteredData = filteredData.filter(activity => activity.type !== 'log')
        }
        return filteredData
    },[filter])
    return (
        <div>
            <Container>
                <RowFlex>
                    <IconSpan><FormatAlignLeftOutlinedIcon /></IconSpan>
                    <div style={{ width: '100%' }}><Title>Activity</Title><LogButton onClick={e => setFilter(!filter)}>{filter ? 'Show Details' : 'Hide Details'}</LogButton></div>
                </RowFlex>
                {
                    activityOrder.length !== 0 && activityOrder.map(activityID => {
                        const activity = activities.find(activity => activity.id === activityID)
                        if (activity) {
                            const name = activity.name
                            const avatarName = name.match(/\b(\w)/g).join('').toUpperCase()
                            if (activity.type === 'comment') {
                                return (<Comment
                                    key={activity.id}
                                    avatar={avatarName}
                                    name={activity.name}
                                    text={activity.text}
                                    time={activity.time}
                                     />)
                            }
                            if (activity.type === 'attachment') {
                                return (<AttachmentComment
                                    key={activity.id}
                                    avatar={avatarName}
                                    name={activity.name}
                                    text={activity.text}
                                    time={activity.time}
                                     />)
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
