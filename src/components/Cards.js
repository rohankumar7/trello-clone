import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined"
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined'
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined'
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Draggable } from 'react-beautiful-dnd'

const Badges = styled.div`
height:auto;
width:auto;
margin:4px 0 0 0;
max-width:100%;
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:flex-start;
align-items:center;
`
const Badge = styled.div`
height:20px;
width:auto;
max-width:100%;
margin: 0px 4px 4px 0;
padding:2px;
background:#fff;
min-height:20px;
border-radius:3px;
`
const DueDateBadge = styled.div`
height:20px;
width:auto;
max-width:100%;
margin: 0 4px 4px 0;
padding:2px;
background:${props => props.color};
min-height:20px;
border-radius:3px;
`
const SpanCount = styled.span`
font-size:12px;
vertical-align:top;
white-space:nowrap;
line-height:20px;
word-spacing:0px;
padding:0 4px 0 2px;
display:inline;
color:#5e6c84;
`
const DueDateSpanCount = styled.span`
font-size:12px;
vertical-align:top;
white-space:nowrap;
line-height:20px;
word-spacing:0px;
padding:0 4px 0 2px;
display:inline;
color:${props => props.dueDate === '' ? '#5e6c84' : '#fff'};
`
const SpanIcon = styled.span`
font-size:16px;
line-height:20px;
vertical-align:bottom;
word-spacing:0px;
text-align:center;
color:#6b778c;
height:20px;
width:20px;
display:inline-block;
`
const DueDateSpanIcon = styled.span`
font-size:16px;
line-height:20px;
vertical-align:bottom;
word-spacing:0px;
text-align:center;
color:${props => props.dueDate === '' ? '#6b778c' : '#fff'};
height:20px;
width:20px;
display:inline-block;
`
const Label = styled.span`
min-height:8px;
min-width:40px;
margin:0 4px 4px 0;
max-width:40px;
min-width:40px;
border-radius:6px;
background:${props => props.color};
`
const LabelContainer = styled.div`
height:auto;
width:100%;
display:flex;
margin: 2px 0 -2px 0;
flex-direction:row;
flex-wrap:wrap;
justify-content:flex-start;
`
const Title = styled.div`
font-size:14px;
line-height:20px;
word-break:break-all;
white-space:pre-wrap;
hyphens:auto;
color:#172b4d;
padding:2px 0;
text-decoration:none;
margin:0 0 4px 0;
`
const CoverImage = styled.div`
min-height:180px;
width:100%;
background-image:${props => props.link ? `url(${props.link})` : ''};
background-position : center;
background-size: cover;
background-repeat: no-repeat;
margin-bottom:4px;
`
const CoverColor = styled.div`
height:32px;
min-height:32px;
max-height:32px;
width:100%;
background:${props => props.color};
`
const Container = styled.div`
margin:0 0 8px 0;
`
function Cards({ title, card, id, index }) {

  const month = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };
  const location = useLocation()

  const activityOrder = card.activities
  let activities = useSelector(state => state.activities)
  activities = activities.filter(activity => activity.type !== 'log')
  let comment = 0
  activityOrder.map(activityID => {
    const cardActivities = activities.find(activity => activity.id === activityID)
    if (cardActivities) {
      comment = comment + 1
    }
  })

  const CardChecklist = card.checklists.length
  const checklists = useSelector(state => state.checklists)
  const labels = useSelector(state => state.labels.labels)

  let total = 0
  let completed = 0
  if (CardChecklist > 0) {
    const checklistOrder = card.checklists
    checklistOrder.map(checkID => {
      const checklist = checklists.find(checklist => checklist.id === checkID)
      if (checklist) total = total + checklist.list.length
    })
    checklistOrder.map(checkID => {
      const checklist = checklists.find(checklist => checklist.id === checkID)
      if (checklist) return completed = completed + checklist.list.filter(list => list.selected !== false).length
    })
  }
  let timeDiff = 0
  let dayDiff = 0
  if (Object.entries(card.dueDate).length !== 0) {
    const date = new Date(card.dueDate.date)
    const today = new Date()
    timeDiff = date.getTime() - today.getTime()
    dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24))
  }
  const [color, setColor] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    statusChange()
  }, [card.dueDate.selected, card.dueDate.date])

  const statusChange = () => {
    if (card.dueDate.selected) {
      setColor('#5aac44')
      setText('green')
    } else {
      setColor('')
      setText('')
    }
    if (card.dueDate.selected === false) {
      console.log(dayDiff)
      if (dayDiff === 0) {
        setColor('#f2d600')
        setText('yellow')
        return
      }
      else {
        setColor('')
        setText('')
      }
      if (dayDiff < 0) {
        setColor('#ec9488')
        setText('red')
      } else {
        setColor('')
        setText('')
      }
    }
  }
  return (
    <Draggable draggableId={id} index={index}>
      {
        (provided) => (
          <Container
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}>
          <Card>
            <CardContent style={{ padding: '0px' }}>
              <Link key={id} style={{ textDecoration: 'none', color: '#172b4d' }}
                to={{
                  pathname: `/C/${id}`,
                  state: { background: location, title }
                }}
              >
                {card.cover.link && <CoverImage link={card.cover.link} />}
                {card.cover.color && <CoverColor color={card.cover.color} />}

                <div style={{ padding: '4px 8px 2px 8px' }}>
                  {card.labels.length !== 0 &&
                    < LabelContainer >
                      {
                        card.labels.map(labelID => {
                          const label = labels.find(label => label.id === labelID)
                          if (label) {
                            return (
                              <Label key={label.id} color={label.color} />
                            )
                          }
                        })
                      }
                    </LabelContainer>
                  }
                  <Title>{card.title}</Title>
                  <Badges>
                    {
                      card.watch &&
                      <Badge>
                        <SpanIcon>
                          <VisibilityOutlinedIcon style={{ fontSize: '14px' }} />
                        </SpanIcon>
                      </Badge>
                    }
                    {
                      Object.entries(card.dueDate).length !== 0 &&
                      <DueDateBadge color={color}>
                        <DueDateSpanIcon dueDate={text}>
                          <WatchLaterOutlinedIcon style={{ fontSize: '16px' }} />
                        </DueDateSpanIcon>
                        <DueDateSpanCount dueDate={text}>
                          {`${month[new Date(card.dueDate.date).getMonth()]} ${new Date(card.dueDate.date).getDate()}`}
                        </DueDateSpanCount>
                      </DueDateBadge>
                    }
                    {
                      card.description !== '' &&
                      <Badge>
                        <SpanIcon>
                          <SubjectOutlinedIcon style={{ fontSize: '16px' }} />
                        </SpanIcon>
                      </Badge>
                    }
                    {
                      comment !== 0 &&
                      <Badge>
                        <SpanIcon>
                          <ModeCommentOutlinedIcon style={{ fontSize: '14px' }} />
                        </SpanIcon>
                        <SpanCount>{comment}</SpanCount>
                      </Badge>
                    }
                    {
                      card.attachments.length !== 0 &&
                      <Badge>
                        <SpanIcon>
                          <AttachmentOutlinedIcon style={{ fontSize: '14px', transform: 'rotate(-45deg)' }} />
                        </SpanIcon>
                        <SpanCount>{card.attachments.length}</SpanCount>
                      </Badge>
                    }
                    {card.checklists.length !== 0 &&
                      <Badge>
                        <SpanIcon>
                          <CheckBoxOutlinedIcon style={{ fontSize: '14px' }} />
                        </SpanIcon>
                        <SpanCount>{`${completed}/${total}`}</SpanCount>
                      </Badge>
                    }
                  </Badges>
                </div>
              </Link>
            </CardContent>
          </Card>
          </Container>
        )
      }
    </Draggable>
  )
}

export default Cards