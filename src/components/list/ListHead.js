import React from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import styled from 'styled-components'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { useSelector, useDispatch } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import { editTitle } from '../../actions/listsActions'
import MenuContainer from './MenuContainer'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'

const textareaStyle = {
    fontSize: '13px',
    fontFamily: 'roboto',
    background: '#fff',
    lineHeight: '20px',
    padding: '2px 6px',
    fontWeight: '500',
    color: '#172b4d',
    display: 'block',
    whiteSpace: 'pre-wrap',
    maxWidth: '256px',
    width: '224px',
    wordBreak: 'break-all',
    border: '2px solid #0079bf',
    outline: 'none',
    resize: 'none',
    borderRadius: '3px',
}
const Container = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
background:#ebecf0;
width:100%;
min-height:36px;
margin: 0 0 2px 0;
`
const Title = styled.div`
font-size:14px;
font-weight:500;
padding:2px 6px;
width:228px;
max-width:256px;
color:#172b4d;
text-align:start;
cursor:pointer;
`

function ListHead({ list, setAddCardOpen, index }) {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false)
    const [name, setName] = React.useState(list.title)
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const editName = () => {
        if (!name) {
            setOpen(false)
            setName(list.title)
            return
        }
        dispatch(editTitle(list.id, name))
        setOpen(false)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Container>
            { !open && <Title onClick={() => { setOpen(true) }}>{name}{ list.watch && <VisibilityOutlinedIcon style={{ fontSize: '16px', color: '#6b778c',margin:'0 8px 0 0',cursor:'auto',float:'right' }}/>}</Title>}
            { open && <TextareaAutosize
                value={name}
                autoFocus
                style={textareaStyle}
                onChange={(e) => { setName(e.target.value) }}
                onFocus={(e) => { e.target.select() }}
                onBlur={() => { editName() }}
            />}
            <IconButton onClick={handleClick} style={{ height: '20px', width: '20px' }}>
                <MoreHorizIcon style={{ fontSize: '18px', color: '#6b778c' }} />
            </IconButton>
                <MenuContainer anchorEl={anchorEl} setAnchorEl={setAnchorEl} setAddCardOpen={setAddCardOpen} list={list} index={index}/>
        </Container>
    )
}

export default ListHead
