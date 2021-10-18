import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import ClearIcon from '@material-ui/icons/Clear'
import Divider from '@material-ui/core/Divider'

const RowFlex = styled.div`
    display:flex;
    color : #71909a;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
    padding:0 8px 6px 8px;
`;
const Title = styled.span`
  text-align: center;
  color: #71909a;
  font-size:14px;
  font-weight: 300;
  margin: auto;
`;
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
const useStyles = makeStyles((theme) => ({
    divider: {
        margin: '4px 0'
    }
}));
const InputLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 2px;
`;
function ShareMenu({cardID,handleClose}) {
    const classes = useStyles()
    return (
        <div style={{minWidth:'280px'}}>
            <RowFlex>
                <Title>Share</Title>
                <ClearIcon onClick={handleClose} style={{ fontSize: '16px', cursor: 'pointer' }} />
            </RowFlex>
            <Divider className={classes.divider} />
            <div style={{padding:'8px'}}>
                <InputLabel>Link to this card</InputLabel>
                <CreateInput type="text" onFocus={(e) => e.target.select()} value={`localhost:3000/C/${cardID}`} />
            </div>
        </div>
    )
}

export default ShareMenu
