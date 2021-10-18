import React from "react";
import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import { useSelector } from 'react-redux'
import CardTitle from './title/CardTitle'
import Label from './label/Labels'
import DueDate from './duedate/DueDate'
import Attachment from './attachment/Attachment'
import Description from './description/Description'
import Activity from './activity/Activity'
import Checklist from './checklist/Checklist'
import Cover from "./cover/Cover";
import { useParams, useHistory } from 'react-router-dom'

const Close = styled.div`
position:absolute;
top:12px;
right:16px;
z-index:100;
`

export default function Modal({ listTitle }) {
  
  const { id } = useParams()
  const history = useHistory()
  const cards = useSelector(state => state.cards)
  const card = cards.find(card=>card.id === id)
  const boardID = useSelector(state => state.activeBoard)
  
  const back = e => {
    e.stopPropagation();
    history.push(`/B/${boardID}`);
  };

  return (
      <Dialog
        open={true}
        maxWidth={'sm'}
        fullWidth={true}
        onClose={back}
        scroll='body'
        hideBackdrop={false}
      >
        <DialogContent style={{ backgroundColor: '#f4f5f7',minHeight:'550px' }}>
          <Close>
            <IconButton onClick={back}>
              <ClearIcon />
            </IconButton>
          </Close>
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Cover cover={card.cover}/>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <CardTitle listTitle={listTitle} watch={card.watch} title={card.title}/>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <div style={{ paddingRight: '8px' }} >
                
              <Grid container justify='space-between' direction='row' item xs={12} sm={12} md={12}>
                <Label labelOrder={card.labels}/>
                <DueDate dueDate={card.dueDate}/>
              </Grid>
                <Description description={card.description}/>
                <Attachment attachmentOrder={card.attachments}/>
                <Checklist checklistOrder={card.checklists}/>
                <Activity activityOrder={card.activities}/>

              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
  );
}

