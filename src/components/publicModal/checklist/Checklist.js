import React from 'react'
import styled from "styled-components"
import { useSelector } from 'react-redux'
import ChecklistHead from './ChecklistHead'
import ChecklistBody from './ChecklistBody'

const Container = styled.div`
position: relative;
height:100%;
width:100%;
margin:0 0 16px 0;
`

export default function Checklist({ checklistOrder }) {

    const checklists = useSelector(state => state.checklists)

    return (
        <div>
            { checklistOrder.length !== 0 && <div>{
                checklistOrder.map(checklistID => {
                    const checklist = checklists.find(check => check.id === checklistID)
                    return (
                        <Container key={checklist.id}>
                            <ChecklistHead name={checklist.name} percent={checklist.percent}/>
                            <div style={{ margin: '8px 0 0 0' }}></div>
                            <ChecklistBody list={checklist.list} />
                        </Container>
                    )
                })}
            </div>
            }
        </div >
    )
}
