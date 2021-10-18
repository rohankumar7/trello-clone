import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import styled from 'styled-components'
import ClearIcon from "@material-ui/icons/Clear"
import CheckIcon from "@material-ui/icons/Check"
import { useDispatch } from 'react-redux'

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

export default function ListMenuOptions({ setMoveAllOpen, setMoveListOpen, setSortOpen, setAddCardOpen, handleClose, list }) {

    const dispatch = useDispatch()
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <RowFlex>
                <Title>List Actions</Title>
                <ClearIcon onClick={handleClose} style={{ fontSize: '16px', cursor: 'pointer' }} />
            </RowFlex>

            <Divider className={classes.divider} />

            <List component="nav" className={classes.listContainer}>

                <ListItem button
                    onClick={async () => {
                        await handleClose()
                        setAddCardOpen(true)
                    }}
                    className={classes.list}>
                    Add Cards...
            </ListItem>

                <ListItem button className={classes.list} onClick={()=>{setMoveListOpen(true)}}>
                    Move List...
            </ListItem>

                <ListItem button className={classes.list} onClick={() => {
                    dispatch({
                        type: 'WATCH_TOGGLE',
                        payload: { listID: list.id }
                    })
                }}>
                    Watch {list.watch && <CheckIcon style={{ fontSize: '12px ', margin: '0 0 0 8px' }} />}
                </ListItem>

                <Divider className={classes.divider} />
                {list.cards.length !== 0 && <><ListItem button className={classes.list} onClick={() => setSortOpen(true)}>
                    Sort By...
            </ListItem>

                    <Divider className={classes.divider} /></>}
                {list.cards.length !== 0 && <ListItem button className={classes.list} onClick={()=>{setMoveAllOpen(true)}}>
                    Move All Cards in This List...
            </ListItem>}

                <ListItem button className={classes.list}>
                    Delete List
            </ListItem>

            </List>
        </div>
    )
}