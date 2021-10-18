import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import styled from 'styled-components'
import ClearIcon from "@material-ui/icons/Clear"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { moveAllCards } from '../../actions/listsActions'

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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '280px',
        maxWidth: 360,
        padding: 0,
        height: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    list: {
        padding: '6px 8px',
        fontSize: '14px',
        borderRadius: '3px'
    },
    listContainer: {
        padding: '0 8px',
    },
    divider: {
        margin: '4px 0'
    }
}));

function MoveAll({ listID,index, setMoveAllOpen, handleClose }) {
    const listIndex = index
    const { boardID } = useParams()
    const classes = useStyles()
    const dispatch = useDispatch()
    const lists = useSelector(state => state.lists)
    const listOrder = useSelector(state => state.boards).find(board => board.id === boardID).lists

    const handleSubmit = (id) => {
        dispatch(moveAllCards(listID, id))
        handleClose()
    }

    return (
        <div>
            <RowFlex>
                <ArrowBackIosIcon onClick={() => { setMoveAllOpen(false) }} style={{ fontSize: '14px', cursor: 'pointer' }} />
                <Title>Move All Cards in List</Title>
                <ClearIcon onClick={handleClose} style={{ fontSize: '16px', cursor: 'pointer' }} />
            </RowFlex>

            <Divider className={classes.divider} />

            <List component="nav" className={classes.listContainer}>
                {
                    listOrder.map((listID, index) => {
                        const current = listIndex === index ? '(current)' : ''
                        const list = lists.find(list => list.id === listID)
                        if (list) {
                            return (
                                <ListItem button onClick={()=>{handleSubmit(list.id)}} className={classes.list} disabled={listIndex === index}>
                                    {list.title} {current}
                                </ListItem>
                            )
                        }
                    })
                }
            </List>
        </div>
    )
}

export default MoveAll
