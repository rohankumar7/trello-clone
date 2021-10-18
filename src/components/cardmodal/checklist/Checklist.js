import React from 'react'
import styled from "styled-components"
import { useSelector } from 'react-redux'
import ChecklistModal from './ChecklistModal'
import ChecklistHead from './ChecklistHead'
import ChecklistBody from './ChecklistBody'
import ChecklistFooter from './ChecklistFooter'

const Container = styled.div`
position: relative;
height:100%;
width:100%;
margin:0 0 16px 0;
`

export default function Checklist({ checklistOrder, cardID, open, handleClose }) {

    const checklists = useSelector(state => state.checklists)

    return (
        <div>
            <ChecklistModal open={open} handleClose={handleClose} cardID={cardID} />
            { checklistOrder.length !== 0 && <div>{
                checklistOrder.map(checklistID => {
                    const checklist = checklists.find(check => check.id === checklistID)
                    return (
                        <Container key={checklist.id}>
                            <ChecklistHead name={checklist.name} percent={checklist.percent} id={checklist.id} cardID={cardID} />
                            <div style={{ margin: '8px 0 0 0' }}></div>
                            <ChecklistBody id={checklist.id} list={checklist.list} cardID={cardID} />
                            <ChecklistFooter id={checklist.id} cardID={cardID} />
                        </Container>
                    )
                })}
            </div>
            }
        </div >
    )
}
