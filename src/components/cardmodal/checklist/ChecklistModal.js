import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import styled from 'styled-components'
import ClearIcon from "@material-ui/icons/Clear"
import Button from "@material-ui/core/Button"
import { useDispatch } from 'react-redux'
import { addChecklists } from '../../../actions/checklistActions'
import { addActivities } from '../../../actions/activityActions'
import IconButton from '@material-ui/core/IconButton';
const CreateInput = styled.input`
  height: 40px;
  font-size: 14px;
  padding: 8px 12px;
  box-sizing: border-box;
  color: #172b4d;
  border-radius: 3px;
  border: 2px solid #dfe1e6;
  background: #fafbfc;
  width: 100%;
  font-weight: 300;
  outline: none;
  align-self: center;
  &:hover{
    background: #ebecf0;
  }
  &:focus {
    background: #fff;
    border: 2px solid #0079bf;
  }
`;
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
  flex-direction: column;
`;
const Divider = styled.div`
  background-color: #eaecef;
  height: 1px;
  border: none;
  margin-top: 5px;
`;
const InputLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 2px;
`;


export default function ChecklistModal({ open, handleClose, cardID }) {
  const dispatch = useDispatch()
  const [title, setTitle] = React.useState('Checklist')
  const [error, setError] = React.useState('')

  const createChecklist = () => {
    if (!title) {
      setError('Name is required')
      return
    }
    if (title) {
      const id = `checklist-${Date.now()}`
      dispatch(addChecklists(cardID, id, title))
      const text = `added ${title} to this card.`
      const activity = {
        id: `activity-${Date.now()}`,
        type: 'log',
        name: 'Rohan Kumar',
        text,
        time: new Date()
      }
      dispatch(addActivities(activity.id, cardID, activity))
      setError('')
      handleClose()
    }
  }

  return (
    <Dialog
      open={open}
      scroll='body'
      onClose={() => {
        setError('')
        setTitle('Checklist')
        handleClose()
      }}
      maxWidth={'xs'}
      fullWidth={true}
      hideBackdrop={true}
    >
      <DialogContent>
        <ColumnFlex>
          <RowFlex>
            <Title>Add Checklist</Title>
            <IconButton onClick={handleClose} size='small'>
              <ClearIcon fontSize='small' />
            </IconButton>
          </RowFlex>
          <Divider />
          <br />
          <InputLabel>Title</InputLabel>
          <CreateInput
            type="text"
            autoFocus
            onFocus={e => e.currentTarget.select()}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span style={{ fontSize: '14px', fontWeight: '400', color: 'red' }}>{error}</span>
          <br />
          <Button
            variant="contained"
            disableElevation
            color='secondary'
            onClick={createChecklist}
          >
            add checklist
                            </Button>
          <br />
        </ColumnFlex>
      </DialogContent>
    </Dialog>
  );
}
