import React from 'react'
import styled from 'styled-components'
import Menu from '@material-ui/core/Menu'
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined"
import ShareMenu from './ShareMenu'

const Icon = styled.span`
line-height:20px;
text-align:center;
vertical-align:bottom;
white-space:nowrap;
word-spacing:0px;
color:#42546e;
height:20px;
width:20px;
margin: 0 6px 0 -6px;
display:inline-block;
`
const Text = styled.span`
font-size:14px;
line-height:20px;
white-space:nowrap;
word-spacing:0px;
color:#091e42;
height:auto;
width:auto;
display:inline;
`
const Button = styled.div`
width:100%;
margin:8px 0 0 0;
padding:6px 12px;
background:#eaecef;
border-radius:3px;
cursor:pointer;
&:hover{
    background:#e1e4e9;
}
@media(max-width:960px){
    width:auto;
    max-width:auto;
    margin:8px 8px 0 0;
}
`

function Share({cardID}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
        <div>
            <Button onClick={handleClick}>
                <Icon><ShareOutlinedIcon style={{ fontSize: '16px' }} /></Icon>
                <Text>Share</Text>
            </Button>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <ShareMenu handleClose={handleClose} cardID={cardID} />
            </Menu>
        </div>
    )
}

export default Share
