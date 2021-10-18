import React from 'react'
import styled from 'styled-components'
import Cards from '../Cards'
import { Provider, useSelector } from 'react-redux'
import AddCardForm from '../AddCardForm'
import { Droppable } from 'react-beautiful-dnd'

const TaskList = styled.div`
    background-color:${props => props.isDraggingOver ? '#e0e2e7' : '#ebecf0'};
    max-height:${props => props.height};
    min-height:4px;
    overflow-y:auto;
`
function ListBody({ listID, title, cardOrder, open, setOpen, addCard, setAddCardOpen }) {
    const cards = useSelector(state => state.cards)
    const height = open || addCard ? '80vh' : '75vh'
    return (
        <Droppable droppableId={listID} type='card'>
            {
                (provided,snapshot) => (
                    <TaskList height={height}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                        ref={provided.innerRef}
                    >
                        {addCard && <div style={{margin:'0 0 8px 0'}}><AddCardForm listID={listID} position ='top' setOpen={setAddCardOpen} /></div>}
                        {
                            cardOrder.map((cardID, index) => {
                                const card = cards.find(card => card.id === cardID)
                                if (card) {
                                    return (
                                        <Cards key={card.id} title={title} key={card.id} card={card} id={card.id} index={index} />
                                    )
                                }
        
                            })
                        }
                        {provided.placeholder}                        
                        {!addCard && open && <AddCardForm listID={listID} position = 'bottom' setOpen={setOpen} /> }
                    
                </TaskList>
                )
            }
        </Droppable>

    )
}

export default ListBody
