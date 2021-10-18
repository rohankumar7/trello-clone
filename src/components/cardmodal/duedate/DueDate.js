import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux'
import DueDateModal from "./DueDateModal";
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { toggleDate } from '../../../actions/dueDateActions'
import { addActivities } from '../../../actions/activityActions'

const RowFlex = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:center;
  margin:0 0 16px 0;
`
const Content = styled.span`
  height: 16px;
  line-height: 16px;
  font-size:14px;
  padding: 8px;
  background: #eaecef;
  color: #5e6c84;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:3px;
  &:hover{
    background:#e1e4e9;
  }
`
const Status = styled.span`
font-size: 12px;
padding: 1px 4px;
border-radius: 3px;
background:${props => props.status.color};
color: white;
margin:0 0 0 4px;
display : ${props => props.status.text === '' ? 'none' : 'inline'};
`
const Title = styled.h3`
font-size:12px;
line-height:20px;
vertical-align:baseline;
letter-spacing:0.48px;
word-spacing:0px;
margin:0px 8px 4px 0px;
padding:0px;
font-weight:500;
font-style:normal;
font-variant:normal;
text-transform:uppercase;
text-decoration:none solid rgb(94, 108, 132);
text-align:start;
text-indent:0px;
color:#5e6c84;
`
const Container = styled.div`
padding: 0 0 0 40px;
@media(max-width:960px){
  padding:0
}
`

function DueDate({ dueDate, cardID, open, handleOpen, handleClose }) {

  const dispatch = useDispatch()
  const [status, setStatus] = useState({ text: '', color: '' })

  useEffect(() => {
    statusChange()
  }, [dueDate.selected, dueDate.date])

  const statusChange = () => {
    if (dueDate.selected) {
      setStatus({ text: 'COMPLETE', color: '#5aac44' })
    } else {
      setStatus('')
    }
    if (dueDate.selected === false) {
      console.log(dayDiff)
      if (dayDiff === 0) {
        setStatus({ text: 'DUE SOON', color: '#f2d600' })
        return
      }
      else {
        setStatus('')
      }
      if (dayDiff < 0) {
        setStatus({ text: 'OVERDUE', color: '#ec9488' })
      } else {
        setStatus('')
      }
    }
  }
  const handleChange = () => {
    dispatch(toggleDate(cardID))
    let text = ''
    if (dueDate.selected === true)
      text = `marked the due date complete`
    if (dueDate.selected === false)
      text = `marked the due date incomplete`
    const activity = {
      id: `activity-${Date.now()}`,
      type: 'log',
      name: 'Rohan Kumar',
      text,
      time: new Date()
    }
    dispatch(addActivities(activity.id, cardID, activity))
  }
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
  const date = new Date(dueDate.date)
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  const today = new Date()
  const timeDiff = date.getTime() - today.getTime()
  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24))

  return (
    <div>
      <DueDateModal dueDate={dueDate} cardID={cardID} open={open} handleClose={handleClose} />
      { dueDate.date && <Container>
        <Title>due date</Title>
        <RowFlex>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checked={dueDate.selected}
            onChange={() => { handleChange() }}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
          />
          <Content style={{ cursor: "pointer" }} onClick={handleOpen}>
            {`${month[new Date(dueDate.date).getMonth()]} ${new Date(dueDate.date).getDate()} at ${strTime}`}
            <Status status={status}>
              {status.text}
            </Status>
            <ExpandMoreIcon style={{ fontSize: '24px', color: '#71909a' }} />
          </Content>
        </RowFlex>
      </Container>}
    </div>
  )
}

export default DueDate
