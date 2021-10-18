import React, { useState } from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import styled from 'styled-components'
import ClearIcon from "@material-ui/icons/Clear"
import Button from "@material-ui/core/Button"
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '@material-ui/core/IconButton';

const Title = styled.span`
  text-align: center;
  color: #71909a;
  font-weight: 300;
  margin: auto;
`;
const RowFlex = styled.div`
    display:flex;
    color : #71909a;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
`;
const ColumnFlex = styled.div`
  display: flex;
  color: #71909a;
  flex-direction: column;
  max-width: 320px;
  min-width:320px;
`;
const Divider = styled.div`
  background-color: #eaecef;
  height: 1px;
  border: none;
  margin-top: 5px;
`;
const InputLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 2px;
`;
const ColorDiv = styled.div`
display:flex;
flex-direction:row;
justify-content:flex-start;
flex-wrap:wrap;
padding : 4px;
margin : 4px -4px;
height: auto;
width: auto;
`
const Colors = styled.div`
height:24px;
width: 30px;
border-radius:3px;
padding: 6px 12px;
background-color:${props => props.color};
cursor:pointer;
`
const BorderWhite = styled.div`
border : 2px solid #fff;
border-radius: 3px;
`
const BorderBlue = styled.div`
border:${props => props.select ? '2px solid #0079bf' : '2px solid #fff'};
border-radius: 6px;
margin:1px;
`
const AttachDiv = styled.div`
display:flex;
flex-direction:row;
justify-content:flex-start;
flex-wrap:wrap;
padding:8px 0;
`
const AttachImage = styled.div`
height:50px;
width:96px;
border-radius:3px;
background-image:${props => props.link ? `url(${props.link})` : ''};
background-position : center;
background-size: contain;
background-repeat: no-repeat;
cursor:pointer;
`

export default function CoverModal({ cardID }) {

    const dispatch = useDispatch()

    const attachments = useSelector(state => state.attachments)
    const cards = useSelector(state => state.cards)
    const card = cards.find(card => card.id === cardID)
    const cover = card.cover

    const [currentColor, setCurrentColor] = React.useState(cover.color)

    const staticColors = [
        { id: 1, color: "#61bd4f", selected: false },
        { id: 2, color: "#f2d600", selected: false },
        { id: 3, color: "#ffa01a", selected: false },
        { id: 4, color: "#eb5a46", selected: false },
        { id: 5, color: "#c277e0", selected: false },
        { id: 6, color: "#0079bf", selected: false },
        { id: 7, color: "#00c2e0", selected: false },
        { id: 8, color: "#51e897", selected: false },
        { id: 9, color: "#ff78cb", selected: false },
        { id: 10, color: "#344563", selected: false },
    ];

    const [colors, setColors] = useState(staticColors)

    React.useEffect(() => {
        setColors(
            staticColors.map((color) => {
                if (color.color === currentColor) color.selected = true;
                return color;
            })
        );
    }, [cover]);

    function currentColorFunc(color) {
        setColors(colors.map((data) => (data.selected = false)))
        setColors(
            colors.map((data) => {
                if (color === data.color) {
                    data.selected = !data.selected
                }
                return data
            })
        )
        setCurrentColor(color)
        colorCover(color)
    }
    const colorCover = (color) => {
        const cover = {
            link: '',
            color
        }
        dispatch({
            type: 'EDIT_COVER',
            payload: { cardID, cover }
        })
    }
    return (
        <div>
            <InputLabel>COLORS</InputLabel>
            {
                cover.color !== '' ? <ColorDiv>
                    {
                        colors.map(color => {
                            return (
                                <BorderBlue key={color.id} select={color.selected}>
                                    <BorderWhite>
                                        <Colors color={color.color} onClick={() => currentColorFunc(color.color)} />
                                    </BorderWhite>
                                </BorderBlue>
                            )
                        })
                    }
                </ColorDiv> : <ColorDiv>
                        {
                            colors.map(color => {
                                return (
                                    <BorderBlue key={color.id} select={false}>
                                        <BorderWhite>
                                            <Colors color={color.color} onClick={() => currentColorFunc(color.color)} />
                                        </BorderWhite>
                                    </BorderBlue>
                                )
                            })
                        }
                    </ColorDiv>
            }
        </div>

    );
}
