import React from 'react'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add';
import AddListForm from './AddListForm'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Button = styled.div`
height:30px;
min-width:255px;
cursor:pointer;
display:flex;
border-radius:3px;
justify-content:flex-start;
align-items:center;
background:#ebecf0;
padding:4px 12px;
color:#6b778c;
&:hover{
    background:#d9dce2;
}
`
const IconSpan = styled.span`
height:20px;
width:20px;
text-align:center;
vertical-align:bottom;
margin:0 2px 0 0;
`
const TextSpan = styled.span`
font-size:14px;
`

function AddList() {
    const { boardID } = useParams()
    const isEmptyBoard = useSelector(state => state.boards).find(board => board.id === boardID).lists.length === 0
    const [open,setOpen] = React.useState(false)
    return (
        <div style={{margin:'16px 8px 0 8px',width:'272px'}}>
           { !open && <Button onClick={()=>{setOpen(true)}}>
                <IconSpan>
                <AddIcon style={{fontSize:'20px'}}/>
                </IconSpan>
                <TextSpan>{ isEmptyBoard ? 'Add a list' : 'Add another list'}</TextSpan>
           </Button> }

           { open && <AddListForm setOpen={setOpen} /> }
        </div>
    )
}

export default AddList
