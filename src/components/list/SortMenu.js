import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import styled from 'styled-components'
import ClearIcon from "@material-ui/icons/Clear"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useDispatch, useSelector } from 'react-redux'
import { sort } from '../../actions/listsActions'

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

function SortMenu({ list, setSortOpen, handleClose }) {

    const classes = useStyles()

    const dispatch = useDispatch()

    const cards = useSelector(state => state.cards)

    const cardOrder = list.cards

    const listCard = cardOrder.map(cardID => {
        const card = cards.find(card => card.id === cardID)
        if (card) {
            return card
        }
    })
    
    const sortCards = (type) => {

        if (type === 'new') {
            const cardIDs = listCard
                .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
                .map(card => (card.id))
            dispatch(sort(cardIDs, list.id))
        }
        if (type === 'old') {
            const cardIDs = listCard
                .sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime())
                .map(card => (card.id))
            dispatch(sort(cardIDs, list.id))
        }
        if (type === 'alphabet') {
            const cardIDs = listCard
                .sort((a, b) => (a.title > b.title) - (a.title < b.title))
                .map(card => (card.id))
            dispatch(sort(cardIDs, list.id))
        }
        handleClose()
    }

    return (
        <div>
            <RowFlex>
                <ArrowBackIosIcon onClick={() => { setSortOpen(false) }} style={{ fontSize: '14px', cursor: 'pointer' }} />
                <Title>Sort List</Title>
                <ClearIcon onClick={handleClose} style={{ fontSize: '16px', cursor: 'pointer' }} />
            </RowFlex>

            <Divider className={classes.divider} />

            <List component="nav" className={classes.listContainer}>
                <ListItem button onClick={() => { sortCards('new') }} className={classes.list}>
                    Date Created (Newest First)
                        </ListItem>
                <ListItem button onClick={() => { sortCards('old') }} className={classes.list}>
                    Date Created (Oldest First)
                        </ListItem>
                <ListItem button onClick={() => { sortCards('alphabet') }} className={classes.list}>
                    Card Name (Alphabetically)
                        </ListItem>
            </List>
        </div>
    )
}

export default SortMenu
