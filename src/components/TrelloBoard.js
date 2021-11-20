import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { setActiveBoard, sortList } from '../actions/boardActions'
import { sortCard } from '../actions/listsActions'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Lists from './list/Lists'
import AddList from './AddList'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import { Height } from '@material-ui/icons'

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x:auto;
  padding:0px 8px;
  min-height:94vh ;
`;
const BoardContainer = styled.div`
`
const Nav = styled.div`
display : flex;
justify-content : flex-start;
align-items : center;
height: 30px;
padding : 4px 8px;
`
function TrelloBoard() {

  const dispatch = useDispatch()
  const { boardID } = useParams()

  const boards = useSelector(state => state.boards)
  const lists = useSelector(state => state.lists)
  const board = boards.find(board => board.id === boardID)

  let listOrder = []


  useEffect(() => {
    dispatch(setActiveBoard(boardID))
  }, [])

  if (board) {
    listOrder = board.lists
  }else{
    return <p>NO Board</p>
  }
  const onDragEnd = (result) => {

    const { destination, source, draggableId, type } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    if (type === 'list') dispatch(sortList(boardID, destination, source, draggableId))
    if (type === 'card') dispatch(sortCard(destination, source, draggableId))

  }

  return (
    <BoardContainer>
      <Nav>
        <Link to='/'>
          <IconButton size='small'>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <span style={{ fontSize: '18px', fontWeight: '500', color: '#333',marginLeft:'40px' }}>{board.title}</span>
      </Nav>
      <div style={{height:'1px', background:'#eee'}}></div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='all-list' direction='horizontal' type='list'>
          {
            provided => (
              <ListsContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {
                  listOrder.map((listID, index) => {
                    const list = lists.find(list => list.id === listID)
                    if (list) {
                      return (
                        <Lists key={list.id} index={index} list={list} />
                      )
                    }
                  })
                }
                {provided.placeholder}
                <AddList />
              </ListsContainer>
            )
          }
        </Droppable>
      </DragDropContext>
    </BoardContainer>
  )
}

export default TrelloBoard

