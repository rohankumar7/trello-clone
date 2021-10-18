import React from 'react'
import styled from 'styled-components'
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined'
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined'

const List = styled.div`
display: flex;
width:100%;
flex-direction: row; 
justify-content: flex-start;
align-items:center;
border-radius:3px;
&:hover{
    background:#eaecef;
}
`
const ListTitle = styled.span`
font-size:14px;
color:${props => props.check ? '#71909a' : 'rgb(23,43,77)'};
line-height:20px;
height:auto;
text-decoration:${props => props.check ? 'line-through' : ''};
width:100%;
min-width:40px;
min-height:18px;
display:inline-block;
`
const ListIcon = styled.span`
text-align:center;
height:32px;
color:#dfe1e6;
justify-content:center;
display:flex;
width:32px;
margin-right: 8px;
vertical-align:bottom;
word-spacing : 0px;
align-items:center;
`


function ChecklistBodyLoop({list}) {

    return (
        <div>
            <List>
                <ListIcon>
                    {list.selected ?
                        <DoneOutlinedIcon
                            style={{ color: '#0079bf' }}
                         /> :
                        <CheckBoxOutlineBlankOutlinedIcon
                            style={{ color: '#dfe1e6' }}
                        />}
                </ListIcon>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '0 24px 0 0' }}>
                        <div style={{ width: '100%' }}>
                            <ListTitle
                                check={list.selected}>
                                {list.text}
                            </ListTitle>
                        </div>
                    </div>
            </List>
        </div>
    )
}

export default ChecklistBodyLoop
