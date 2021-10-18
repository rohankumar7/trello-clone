import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import styled from 'styled-components'
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import { useDispatch } from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import { addAttachments } from '../../../actions/attachmentActions'
import { addActivities } from '../../../actions/activityActions'
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

export default function AttachmentModal({ cardID, open, handleClose }) {

  const dispatch = useDispatch()

  const [link, setLink] = useState('')
  const [nameOpen, setNameOpen] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')

  const setNameFun = () => {
    if (link) {
      const parts = link.split('/')
      const withParamenter = parts[parts.length - 1]
      const withoutParamenter = withParamenter.split('?')
      const name = withoutParamenter[0]
      setName(name)
    }
  }
  const addAttachment = () => {
    if (!link) {
      setError('Link is empty...')
      return
    }

    const types = ['jpg', 'jpeg', 'png', 'tiff', 'gif', 'bmp']
    const parts = link.split('.')
    const ext = parts[parts.length - 1]
    const extension = ext.split('?')
    const e = extension[0]
    if (!types.includes(e)) {
      setError('Opps! only image is accepted...')
      return
    }
    if (link) {
      const id = `attachment-${Date.now()}`
      const attachment = {
        id,
        name,
        link,
        time: new Date()
      }
      dispatch(addAttachments(cardID, attachment))
      const log = `attached ${name} to this card.`
      const activity = {
        id: `activity-${Date.now()}`,
        type: 'log',
        name: 'Rohan Kumar',
        text: log,
        link,
        time: new Date()
      }
      dispatch(addActivities(activity.id, cardID, activity))
      setLink('')
      setName('')
      setError('')
      handleClose()
    }
  }

  return (
    <div>
      <Dialog open={open} scroll='body' onClose={() => {
        setLink('')
        setName('')
        setError('')
        setNameOpen(false)
        handleClose()
      }} maxWidth={'xs'} fullWidth={true} hideBackdrop={true}>
        <DialogContent>
          <ColumnFlex>
            <RowFlex>
              <Title>Attach From...</Title>
              <IconButton onClick={handleClose} size='small'>
                <ClearIcon fontSize='small' />
              </IconButton>
            </RowFlex>
            <Divider />
            <br />
            <InputLabel>Attach a link</InputLabel>
            <CreateInput type="text" value={link} onBlur={setNameFun} onChange={(e) => setLink(e.target.value)} onFocus={() => setNameOpen(true)} placeholder='Paste any link here...' />
            {nameOpen &&
              <><InputLabel>Name</InputLabel>
                <CreateInput type="text" value={name} onChange={e => setName(e.target.value)} placeholder='Name of file...' /></>
            }
            <span style={{ fontSize: '14px', color: 'red', fontWeight: '300' }}>{error}</span>
            <br />
            <Button variant="contained" onClick={addAttachment} disableElevation color='secondary'>
              attach
                            </Button>
            <br />
          </ColumnFlex>
        </DialogContent>
      </Dialog>
    </div>
  );
}
