import React from 'react'
import ListMenuOptions from './ListMenuOptions'
import SortMenu from './SortMenu'
import MoveAll from './MoveAll'
import MoveList from './MoveList'

export default function ListMenu({
    list,
    sortOpen,
    setSortOpen,
    moveListOpen,
    setMoveListOpen,
    moveAllOpen,
    setMoveAllOpen,
    handleClose,
    setAddCardOpen,
    index }) {


    return (
        <div style={{ minWidth: '280px' }}>

            {!(sortOpen || moveAllOpen || moveListOpen) && <ListMenuOptions 
            list={list} 
            setMoveAllOpen={setMoveAllOpen} 
            setMoveListOpen={setMoveListOpen} 
            setSortOpen={setSortOpen} 
            handleClose={handleClose} 
            setAddCardOpen={setAddCardOpen} />}

            { sortOpen && <SortMenu list={list} setSortOpen={setSortOpen} handleClose={handleClose} /> }
            
            { moveListOpen && <MoveList index={index} list={list} setMoveListOpen={setMoveListOpen} handleClose={handleClose}/> }
            
            { moveAllOpen && <MoveAll listID={list.id} index={index} setMoveAllOpen={setMoveAllOpen} handleClose={handleClose}/> }

        </div>
    );
}