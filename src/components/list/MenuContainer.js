import React from 'react'
import ListMenu from './ListMenu'
import Menu from '@material-ui/core/Menu';

function MenuContainer({anchorEl,setAnchorEl,setAddCardOpen,index,list}) {
    
    const [sortOpen,setSortOpen] = React.useState(false)
    const [moveListOpen,setMoveListOpen] = React.useState(false)
    const [moveAllOpen,setMoveAllOpen] = React.useState(false)
    const menuOpen = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null)
        moveAllOpen && setMoveAllOpen(false)
        moveListOpen && setMoveListOpen(false)
        sortOpen && setSortOpen(false)
    };

    return (
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={menuOpen}
            onClose={handleClose}
            PaperProps={{
                style: {
                    width: 'auto',
                    padding: '0',
                },
            }}
        >
            <ListMenu 
            list={list} 
            sortOpen={sortOpen} 
            setSortOpen={setSortOpen} 
            moveListOpen={moveListOpen} 
            setMoveListOpen={setMoveListOpen}
            moveAllOpen={moveAllOpen}
            setMoveAllOpen={setMoveAllOpen} 
            handleClose={handleClose} 
            setAddCardOpen={setAddCardOpen} 
            index={index} />
        </Menu>
    )
}

export default MenuContainer
