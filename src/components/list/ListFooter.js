import React from "react";
import styled from "styled-components";
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from 'react-redux'

const Button = styled.div`
cursor:pointer;
display:flex;
justify-content:flex-start;
align-items:center;
padding:4px 8px;
height:24px;
margin-top:2px;
border-radius:3px;
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

const ListFooter = ({listID,open,setOpen,addCard}) => {
    const isEmptyList = useSelector(state => state.lists).find(list => list.id === listID).cards.length === 0
    return (
        <>
            {!addCard && !open &&  <Button onClick={() => {setOpen(true)}}>
                <IconSpan>
                    <AddIcon style={{ fontSize: '20px' }} />
                </IconSpan>
                <TextSpan>{ isEmptyList ? 'Add a card' : 'Add another card' }</TextSpan>

            </Button>}
        </>
    );
};

export default ListFooter;
