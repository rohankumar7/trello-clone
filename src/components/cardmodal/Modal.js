import React from "react";
import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
//import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
//import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import AttachmentIcon from "@material-ui/icons/Attachment";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import VideoLabelOutlinedIcon from '@material-ui/icons/VideoLabelOutlined';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useSelector,useDispatch } from 'react-redux'
import CardTitle from './title/CardTitle'
import Label from './label/Labels'
import DueDate from './duedate/DueDate'
import Attachment from './attachment/Attachment'
import Description from './description/Description'
import Activity from './activity/Activity'
import Checklist from './checklist/Checklist'
import Cover from "./cover/Cover";
import { useLocation, useParams, useHistory } from 'react-router-dom'
import Share from './Share'
const Icon = styled.span`
line-height:20px;
text-align:center;
vertical-align:bottom;
white-space:nowrap;
word-spacing:0px;
color:#42546e;
height:20px;
width:20px;
margin: 0 6px 0 -6px;
display:inline-block;
`
const Text = styled.span`
font-size:14px;
line-height:20px;
white-space:nowrap;
word-spacing:0px;
color:#091e42;
height:auto;
width:auto;
display:inline;
`
const Button = styled.div`
width:100%;
margin:8px 0 0 0;
padding:6px 12px;
background:#eaecef;
border-radius:3px;
cursor:pointer;
&:hover{
    background:#e1e4e9;
}
@media(max-width:960px){
    width:auto;
    max-width:auto;
    margin:8px 8px 0 0;
}
`
const Header = styled.h3`
font-size:12px;
line-height:20px;
font-weight:500;
letter-spacing:0.48px;
text-transform:uppercase;
word-spacing:0px;
color:#5e6c84;
height:20px;
width:168px;
margin: 16px 0 -4px 0;
display:block;
`
const Container = styled.div`
display:block;
padding:0 32px 8px 8px;
@media(max-width:768px){
    padding:0 0 8px 0;
}
`
const Close = styled.div`
position:absolute;
top:12px;
right:16px;
z-index:100;
`

export default function Modal({ listTitle, open, handleClose }) {
  
  const { id } = useParams()
  const history = useHistory()
  const location = useLocation()
  console.log(location)
  const cards = useSelector(state => state.cards)
  const card = cards.find(card=>card.id === id)
  const dispatch = useDispatch()

  const [membersOpen, setMemberOpen] = React.useState(false)
  const [labelsOpen, setLabelOpen] = React.useState(false)
  const [checklistsOpen, setChecklistOpen] = React.useState(false)
  const [dueDatesOpen, setDueDateOpen] = React.useState(false)
  const [attachmentsOpen, setAttachmentOpen] = React.useState(false)
  const [coversOpen, setCoverOpen] = React.useState(false)

  const back = e => {
    e.stopPropagation();
    history.goBack();
  };

  const memberOpen = () => {
    setMemberOpen(true);
  };
  const memberClose = () => {
    setMemberOpen(false);
  };

  const labelOpen = () => {
    setLabelOpen(true);
  };
  const labelClose = () => {
    setLabelOpen(false);
  };

  const checklistOpen = () => {
    setChecklistOpen(true);
  };
  const checklistClose = () => {
    setChecklistOpen(false);
  };

  const dueDateOpen = () => {
    setDueDateOpen(true);
  };
  const dueDateClose = () => {
    setDueDateOpen(false);
  };

  const attachmentOpen = () => {
    setAttachmentOpen(true);
  };
  const attachmentClose = () => {
    setAttachmentOpen(false);
  };

  const coverOpen = () => {
    setCoverOpen(true);
  };
  const coverClose = () => {
    setCoverOpen(false);
  };

  return (
    <div>
      <Dialog
        open={true}
        maxWidth={'md'}
        onClose={back}
        scroll='body'
        hideBackdrop={false}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ backgroundColor: '#f4f5f7',maxWidth:'732px',minHeight:'600px' }}>
          <Close>
            <IconButton onClick={back}>
              <ClearIcon />
            </IconButton>
          </Close>
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Cover cover={card.cover} cardID={id} open={coversOpen} handleOpen={coverOpen} handleClose={coverClose} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <CardTitle listTitle={listTitle} watch={card.watch} title={card.title} id={id}/>
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
              <div style={{ paddingRight: '8px' }} >
                
              <Grid container direction='row' item xs={12} sm={12} md={12}>
                <Label labelOrder={card.labels} id={id} open={labelsOpen} handleOpen={labelOpen} handleClose={labelClose} />
                <DueDate dueDate={card.dueDate} cardID={id} open={dueDatesOpen} handleOpen={dueDateOpen} handleClose={dueDateClose} />
              </Grid>
                <Description description={card.description} cardID={id} />
                <Attachment attachmentOrder={card.attachments} cardID={id} open={attachmentsOpen} handleOpen={attachmentOpen} handleClose={attachmentClose} />
                <Checklist checklistOrder={card.checklists} cardID={id} open={checklistsOpen} handleOpen={checklistOpen} handleClose={checklistClose} />
                <Activity activityOrder={card.activities} cardID={id}/>

              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Container>
                <Header>add to card</Header>
                <Grid container>
                  <Grid item xs={6} sm={6} md={12}>
                    <Button onClick={memberOpen}>
                      <Icon><PersonOutlineOutlinedIcon style={{ fontSize: '16px' }} /></Icon>
                      <Text>Members</Text>
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6} md={12}>
                    <Button onClick={labelOpen}>
                      <Icon><LabelOutlinedIcon style={{ fontSize: '16px' }} /></Icon>
                      <Text>Labels</Text>
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6} md={12}>
                    <Button onClick={checklistOpen}>
                      <Icon><CheckBoxOutlinedIcon style={{ fontSize: '16px' }} /></Icon>
                      <Text>Checklist</Text>
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6} md={12}>
                    <Button onClick={dueDateOpen}>
                      <Icon><QueryBuilderIcon style={{ fontSize: '16px' }} /></Icon>
                      <Text>Due Date</Text>
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6} md={12}>
                    <Button onClick={attachmentOpen}>
                      <Icon><AttachmentIcon style={{ fontSize: '16px',transform:'rotate(-45deg)' }} /></Icon>
                      <Text>Attachment</Text>
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6} md={12}>
                    <Button onClick={coverOpen}>
                      <Icon><VideoLabelOutlinedIcon style={{ fontSize: '16px' }} /></Icon>
                      <Text>Cover</Text>
                    </Button>
                  </Grid>
                </Grid>
                <Header>actions</Header>
                <Grid container>
{  /*                <Grid item xs={6} sm={6} md={12}>
                    <Button>
                      <Icon><ArrowForwardIcon style={{ fontSize: '16px' }} /></Icon>
                      <Text>Move (NF)</Text>
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6} md={12}>
                    <Button>
                      <Icon><FileCopyOutlinedIcon style={{ fontSize: '16px' }} /></Icon>
                      <Text>Copy (NF)</Text>
                    </Button>
  </Grid>*/}
                  <Grid item xs={6} sm={6} md={12}>
                    <Button onClick={()=>{dispatch({type:'EDIT_WATCH',payload:{cardID:id}})}}>
                      <Icon><VisibilityOutlinedIcon style={{ fontSize: '16px' }} /></Icon>
                      <Text>Watch</Text>
                      {card.watch && <CheckBoxIcon style={{float:'right',color:'#61bd4f',fontSize: '20px'}} />}
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6} md={12}>
                    <Share cardID={id}/>
                  </Grid>
                  <Grid item xs={6} sm={6} md={12}>
                    <Button>
                      <Icon><DeleteOutlineOutlinedIcon style={{ fontSize: '16px' }} /></Icon>
                      <Text>Delete</Text>
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

