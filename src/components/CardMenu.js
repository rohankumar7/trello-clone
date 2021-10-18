import React from 'react'
import styled from 'styled-components'
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import AttachmentIcon from "@material-ui/icons/Attachment";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import VideoLabelOutlinedIcon from '@material-ui/icons/VideoLabelOutlined';
import Grid from "@material-ui/core/Grid";

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
padding:0 48px 8px 8px;
@media(max-width:768px){
    padding:0 0 8px 0;
}
`

export default function CardMenu() {
    return (
        <Container>
            <Header>add to card</Header>
            <Grid container>
                <Grid item xs={6} sm={6} md={12}>
                    <Button>
                        <Icon><PersonOutlineOutlinedIcon style={{ fontSize: '16px' }} /></Icon>
                        <Text>Members</Text>
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={12}>
                    <Button>
                        <Icon><LabelOutlinedIcon style={{ fontSize: '16px' }} /></Icon>
                        <Text>Labels</Text>
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={12}>
                    <Button>
                        <Icon><CheckBoxOutlinedIcon style={{ fontSize: '16px' }} /></Icon>
                        <Text>Checklist</Text>
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={12}>
                    <Button>
                        <Icon><QueryBuilderIcon style={{ fontSize: '16px' }} /></Icon>
                        <Text>Due Date</Text>
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={12}>
                    <Button>
                        <Icon><AttachmentIcon style={{ fontSize: '16px' }} /></Icon>
                        <Text>Attachment</Text>
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={12}>
                    <Button>
                        <Icon><VideoLabelOutlinedIcon style={{ fontSize: '16px' }} /></Icon>
                        <Text>Cover</Text>
                    </Button>
                </Grid>
            </Grid>
            <Header>actions</Header>
            <Grid container>
                <Grid item xs={6} sm={6} md={12}>
                    <Button>
                        <Icon><ArrowForwardIcon style={{ fontSize: '16px' }} /></Icon>
                        <Text>Move</Text>
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={12}>
                    <Button>
                        <Icon><FileCopyOutlinedIcon style={{ fontSize: '16px' }} /></Icon>
                        <Text>Copy</Text>
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={12}>
                    <Button>
                        <Icon><VisibilityOutlinedIcon style={{ fontSize: '16px' }} /></Icon>
                        <Text>Watch</Text>
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={12}>
                    <Button>
                        <Icon><ShareOutlinedIcon style={{ fontSize: '16px' }} /></Icon>
                        <Text>Share</Text>
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}
