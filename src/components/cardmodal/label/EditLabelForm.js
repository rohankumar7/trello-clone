import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import CheckIcon from "@material-ui/icons/Check";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from '@material-ui/core/IconButton';

const CreateInput = styled.input`
  height: 40px;
  font-size: 14px;
  padding: 8px 12px;
  box-sizing: border-box;
  color: #172b4d;
  border-radius: 3px;
  border: 2px solid #dfe1e6;
  background: #fafbfc;
  width: 100%;
  font-weight: 300;
  outline: none;
  align-self: center;
  &:hover{
    background: #ebecf0;
  }
  &:focus {
    background: #fff;
    border: 2px solid #0079bf;
  }
`;
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
const RowFlexAction = styled.div`
    display:flex;
    color : #71909a;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`;

const Colors = styled.div`
height:24px;
color:#fff;
width: 32px;
border-radius:3px;
margin:0 8px 8px 0;
padding: 6px 12px;
background-color:${props => props.color};
cursor:pointer;
display:flex;
justify-content:center;
align-items:center;
`
const ColorDiv = styled.div`
display:flex;
flex-direction:row;
justify-content:flex-start;
flex-wrap:wrap;
padding : 4px;
margin : 4px -4px 16px -4px;
height: auto;
width: auto;
`

function EditLabelForm({ handleClose, setShowFunc }) {
  const staticLabels = [
    { id: 1, color: "#61bd4f", colorName: 'green', selected: false },
    { id: 2, color: "#f2d600", colorName: 'yellow', selected: false },
    { id: 3, color: "#ffa01a", colorName: 'orange', selected: false },
    { id: 4, color: "#eb5a46", colorName: 'red', selected: false },
    { id: 5, color: "#c277e0", colorName: 'purple', selected: false },
    { id: 6, color: "#0079bf", colorName: 'blue', selected: false },
    { id: 7, color: "#00c2e0", colorName: 'lightblue', selected: false },
    { id: 8, color: "#51e897", colorName: 'lightgreen', selected: false },
    { id: 9, color: "#ff78cb", colorName: 'pink', selected: false },
    { id: 10, color: "#344563", colorName: 'grey', selected: false },
  ];
  useEffect(() => {
    setLabels(
      staticLabels.map((label) => {
        if (label.color === currentColor) label.selected = true;
        return label;
      })
    );
  }, []);

  const label = useSelector((state) => state.labels.currentLabel);
  const [sLabels, setLabels] = React.useState([]);
  const [text, setText] = React.useState(label.text);
  const [currentColor, setCurrentColor] = React.useState(label.color);
  const [currentColorName, setCurrentColorName] = React.useState(label.colorName)
  const dispatch = useDispatch();

  const currentColorFunc = (color,colorName) => {
    setLabels(sLabels.map((data) => (data.selected = false)));
    setLabels(
      sLabels.map((data) => {
        if (color === data.color) {
          data.selected = !data.selected;
        }
        return data;
      })
    );
    setCurrentColor(color);
    setCurrentColorName(colorName)
  };

  const editLabelFunc = (e) => {
    e.preventDefault();
    dispatch({
      type: "EDIT_LABEL",
      payload: { id: label.id, color: currentColor,colorName: currentColorName, text },
    });
    setShowFunc()
  };

  const deleteLabelFunc = (e) => {
    e.preventDefault();
    dispatch({
      type: "DELETE_LABEL",
      payload: { id: label.id },
    });
    setShowFunc()
  };

  return (
    <ColumnFlex>
      <RowFlex>
        <IconButton onClick={setShowFunc} size='small'>
          <ArrowBackIcon fontSize='small' />
        </IconButton>
        <Title>Change Label</Title>
        <IconButton onClick={handleClose} size='small'>
          <ClearIcon fontSize='small' />
        </IconButton>
      </RowFlex>
      <Divider />
      <br />
      <InputLabel>Name</InputLabel>
      <CreateInput
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <InputLabel>Select a color</InputLabel>
      <ColorDiv>
        {sLabels.map((label) => {
          return (
            <Colors
              onClick={() => currentColorFunc(label.color,label.colorName)}
              key={label.id}
              color={label.color}
            >
              {label.selected ? <CheckIcon style={{fontSize:'16px'}} /> : ""}
            </Colors>
          );
        })}
      </ColorDiv>
      <RowFlexAction>
        <Button
          onClick={(e) => editLabelFunc(e)}
          variant="contained"
          disableElevation
          color='inherit'
        >
          save
        </Button>
        <Button
          onClick={(e) => deleteLabelFunc(e)}
          variant="contained"
          color="secondary"
          disableElevation
        >
          delete
        </Button>
      </RowFlexAction>
      <br />
    </ColumnFlex>
  );
}

export default EditLabelForm;
