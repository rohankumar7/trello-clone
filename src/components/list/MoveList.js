import React from 'react'
import './MoveList.css'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ClearIcon from "@material-ui/icons/Clear"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import { moveList } from '../../actions/boardActions'
import {useDispatch} from 'react-redux'

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
const Button = styled.button`
font-size:14px;
line-height:20px;
text-align:center;
white-space:pre;
border:none;
color:#fff;
border-radius:3px;
word-spacing:0px;
background-color:#5aac44;
height:32px;
padding:6px 12px;
min-height:auto;
min-width:auto;
outline:none;
display:block;
cursor:pointer;
&:hover{
    background-color:#61bd4f;
}
`

const useStyles = makeStyles((theme) => ({
    divider: {
        margin: '4px 0'
    }
}));

function MoveList({ index,setMoveListOpen,handleClose,list }) {
    
    const lIndex = index
    const classes = useStyles();
    const dispatch = useDispatch()
    const [listIndex, setListIndex] = React.useState(index)
    const { boardID } = useParams()
    const listOrder = useSelector(state => state.boards).find(board => board.id === boardID).lists

    const handleChange = (e) => {
        setListIndex(e.target.value)
    }
    const handleSubmit = () =>{
        if(!(index === listIndex)) dispatch(moveList(boardID,list.id,index,Number(listIndex)))
        handleClose()
    }
    return (
        <div>
            <RowFlex>
                <ArrowBackIosIcon onClick={() => { setMoveListOpen(false) }} style={{ fontSize: '14px', cursor: 'pointer' }} />
                <Title>Move List</Title>
                <ClearIcon onClick={handleClose} style={{ fontSize: '16px', cursor: 'pointer' }} />
            </RowFlex>
            <Divider className={classes.divider} />
            <div style={{padding:'8px'}}>
            <select value={listIndex} onChange={handleChange} style={{margin:'16px 0'}}>
                {
                    listOrder.map((listID, index) => {
                        const selected = lIndex === index ? '(current)' : ''
                        return <option value={index}>{`positon ${index + 1} ${selected}`}</option>
                    })
                }
            </select>
            <Button onClick={()=>{handleSubmit()}}>Move</Button>
            </div>
        </div>
    )
}

export default MoveList
