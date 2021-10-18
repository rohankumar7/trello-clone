import React ,{ useState } from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import styled from 'styled-components'
import ClearIcon from "@material-ui/icons/Clear"
import Button from "@material-ui/core/Button"
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import CoverImage from './CoverImage'
import CoverColor from './CoverColor'

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
  max-width: 320px;
  min-width:320px;
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
const ColorDiv = styled.div`
display:flex;
flex-direction:row;
justify-content:flex-start;
flex-wrap:wrap;
padding : 4px;
margin : 4px -4px;
height: auto;
width: auto;
`
const Colors = styled.div`
height:24px;
width: 30px;
border-radius:3px;
padding: 6px 12px;
background-color:${props => props.color};
cursor:pointer;
`
const BorderWhite = styled.div`
border : 2px solid #fff;
border-radius: 3px;
`
const BorderBlue = styled.div`
border:${props => props.select ? '2px solid #0079bf' : '2px solid #fff'};
border-radius: 6px;
margin:1px;
`
const AttachDiv = styled.div`
display:flex;
flex-direction:row;
justify-content:flex-start;
flex-wrap:wrap;
padding:8px 0;
`
const AttachImage = styled.div`
height:50px;
width:96px;
border-radius:3px;
background-image:${props => props.link ? `url(${props.link})` : ''};
background-position : center;
background-size: contain;
background-repeat: no-repeat;
cursor:pointer;
`

export default function CoverModal({ cover, open, handleClose, cardID }) {
    const dispatch = useDispatch()
    const deleteCover = () =>{
        dispatch({
            type:'DELETE_COVER',
            payload : { cardID }
        })
    }
    return (
        <Dialog open={open} scroll='body'
            onClose={() => {
                handleClose()
            }}
            maxWidth={'xs'}
            hideBackdrop={true}
        >
            <DialogContent>
                <ColumnFlex>
                    <RowFlex>
                        <Title>Cover</Title>
                        <IconButton onClick={handleClose} size='small'>
                            <ClearIcon fontSize='small' />
                        </IconButton>
                    </RowFlex>
                    <Divider />
                    <br />
                    <CoverColor cardID={cardID}/>
                    <CoverImage cardID={cardID}/>
                    { Object.entries(cover).length !== 0 &&
                    <><Button
                        variant="contained"
                        disableElevation
                        color='inherit'
                        onClick={() => {deleteCover()}}
                    >
                        remove cover
                    </Button><br/></> }
                </ColumnFlex>
            </DialogContent>
        </Dialog>
    );
}
