import React from 'react'
import styled from 'styled-components'
import ListFooter from './ListFooter'
import ListHead from './ListHead'
import ListBody from './ListBody'
import { Draggable } from 'react-beautiful-dnd'
const ListContainer = styled.div`
position:relative;
background:#ebecf0;
border-radius:3px;
width:272px;
padding:0px 8px 8px 8px;
height:100%;
margin:16px 0 0 8px;
`

function Lists({ index, list }) {

    const [open, setOpen] = React.useState(false)
    const [addCard, setAddCardOpen] = React.useState(false)

    return (
        <Draggable draggableId={list.id} index={index}>
            {
                provided => (
                    <ListContainer
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <ListHead
                            setAddCardOpen={setAddCardOpen}
                            list={list}
                            index={index}
                        />
                        <ListBody
                            listID={list.id}
                            cardOrder={list.cards}
                            title={list.title}
                            addCard={addCard}
                            setAddCardOpen={setAddCardOpen}
                            open={open}
                            setOpen={setOpen}
                        />
                        <ListFooter
                            listID={list.id}
                            addCard={addCard}
                            open={open}
                            setOpen={setOpen}
                        />
                    </ListContainer>
                )
            }
        </Draggable>
    )
}
export default Lists
