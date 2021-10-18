import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from 'react-redux'
import { dueDateAdd, dueDateDelete } from '../../../actions/dueDateActions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addActivities } from '../../../actions/activityActions'
import IconButton from '@material-ui/core/IconButton';
const Title = styled.span`
  text-align: center;
  color: #71909a;
  font-weight: 300;
  margin: auto;
`;
const RowFlex = styled.div`
    display:flex;
    color : #71909a;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
`;
const ColumnFlex = styled.div`
  display: flex;
  color: #71909a;
  font-weight: 500;
  flex-direction: column;
  height:auto;
`;
const Divider = styled.div`
  background-color: #eaecef;
  height: 1px;
  border: none;
  margin-top: 5px;
`;
const RowFlexAction = styled.div`
  display: flex;
  color: #71909a;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding:8px 0; 
`;

export default function DueDateModal({ dueDate, cardID, open, handleClose }) {

  const dispatch = useDispatch()
  const [time, setTime] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
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
  const addDueDate = (mode) => {
    dispatch(dueDateAdd(startDate, cardID))
    let text = ''
    if (mode === 'set')
      text = `set this catd to be due ${month[new Date(startDate).getMonth()]} ${new Date(startDate).getDate()} ${new Date(startDate).getFullYear()} at ${startDate.toLocaleString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true }).toUpperCase()}`
    if (mode === 'change')
      text = `changed the due date of this card to ${month[new Date(dueDate.date).getMonth()]} ${new Date(dueDate.date).getDate()} ${new Date(dueDate.date).getFullYear()} at ${startDate.toLocaleString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true }).toUpperCase()}`
    const activity = {
      id: `activity-${Date.now()}`,
      type: 'log',
      name: 'Rohan Kumar',
      text,
      time: new Date()
    }
    dispatch(addActivities(activity.id, cardID, activity))
    handleClose()
  }
  const deleteDueDate = () => {
    dispatch(dueDateDelete(cardID))
    const text = `removed the due date from this card`
    const activity = {
      id: `activity-${Date.now()}`,
      type: 'log',
      name: 'Rohan Kumar',
      text,
      time: new Date()
    }
    dispatch(addActivities(activity.id, cardID, activity))
    handleClose()
  }
  const addDueDateRender = () => {
    return (
      <RowFlexAction>
        <Button onClick={() => { addDueDate('set') }} variant="contained" color='inherit' disableElevation>
          save
              </Button>
      </RowFlexAction>
    )
  }
  const editDueDateRender = () => {
    return (
      <>
        {`Due Date : ${month[new Date(dueDate.date).getMonth()]} ${new Date(dueDate.date).getDate()} ${new Date(dueDate.date).getFullYear()} at ${startDate.toLocaleString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true }).toUpperCase()}`}
        <Divider />
        <RowFlexAction>
          <Button onClick={() => { addDueDate('change') }} variant="contained" color='inherit' disableElevation>
            save
              </Button>
          <Button onClick={() => { deleteDueDate() }} variant="contained" color="secondary" disableElevation>
            delete
              </Button>
        </RowFlexAction>
      </>
    )
  }
  return (
    <Dialog open={open} scroll="body" onClose={handleClose} maxWidth={"sm"} hideBackdrop={true}>
      <DialogContent>
        <ColumnFlex time={time}>
          <RowFlex>
            <Title>Change Due Date</Title>
            <IconButton onClick={handleClose} size='small'>
              <ClearIcon fontSize='small' />
            </IconButton>
          </RowFlex>
          <Divider />
          <br />
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            inline
          />
          {Object.entries(dueDate).length === 0 ? addDueDateRender() : editDueDateRender()}
        </ColumnFlex>
      </DialogContent>
    </Dialog>
  );
}
