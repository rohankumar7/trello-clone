import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import CheckIcon from "@material-ui/icons/Check";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import EditLabelForm from "./EditLabelForm";
import ClearIcon from "@material-ui/icons/Clear";
import { motion } from 'framer-motion'

const Label = styled(motion.div)`
  background: ${(props) => props.bgColor};
  color: ${(props) => (props.color ? props.color : "#fff")};
  text-align: center;
  font-weight: 500;
  font-size:14px;
  height: 25px;
  width: 100%;
  min-width:220px;
  line-height: 22px;
  margin-bottom: 4px;
  border-radius: 3px;
  cursor: pointer;
  padding: ${(props) => (props.color ? "4px" : "4px 10px")};
`;
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

`;
const ColumnFlexColor = styled.div`
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
const SpaceBetween = styled.div`
  display: flex;
  flex-direction : ${props => props.text === '' ? 'row-reverse' : 'row'};
  justify-content: space-between;
  align-items:center;
`
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

function LabelForm({ cardID, handleClose }) {
  const staticLabels = [
    { id: 1, color: "#61bd4f", colorName:'green', selected: true },
    { id: 2, color: "#f2d600", colorName:'yellow', selected: false },
    { id: 3, color: "#ffa01a", colorName:'orange', selected: false },
    { id: 4, color: "#eb5a46", colorName:'red', selected: false },
    { id: 5, color: "#c277e0", colorName:'purple', selected: false },
    { id: 6, color: "#0079bf", colorName:'blue', selected: false },
    { id: 7, color: "#00c2e0", colorName:'lightblue', selected: false },
    { id: 8, color: "#51e897", colorName:'lightgreen', selected: false },
    { id: 9, color: "#ff78cb", colorName:'pink', selected: false },
    { id: 10, color: "#344563", colorName:'grey', selected: false },
  ];

  const [sLabels, setLabels] = React.useState(staticLabels);
  const [show, setShow] = React.useState(true);
  const [showEdit, setShowEdit] = React.useState(false);
  const [text, setText] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [currentColor, setCurrentColor] = React.useState("#61bd4f");
  const [currentColorName, setCurrentColorName] = React.useState('green')
  const labels = useSelector((state) => state.labels.labels);
  const cards = useSelector(state => state.cards)
  const card = cards.find(card => card.id === cardID)
  const labelOrder = card.labels
  const dispatch = useDispatch();

  const toggleLabelFunc = id => {
    if(labelOrder.includes(id)){
      dispatch({
        type:'REMOVE_LABEL',
        payload:{ id:cardID, labelID:id }
      })
      return      
    }
    dispatch({
      type:'ADD_LABEL',
      payload:{ id:cardID, labelID:id }
    })
  }

const newLabels = React.useMemo(() => {
    let filteredLabels = labels;

    if (search) {
        filteredLabels = filteredLabels.filter(
            label =>
                label.colorName.toLowerCase().includes(search.toLowerCase()) ||
                label.text.toLowerCase().includes(search.toLowerCase())
        );
    }
    return filteredLabels
}, [labels,search]);

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
  const setShowFunc = () => {
    setShow(true)
    setShowEdit(false)
  }
  const addLabelFunc = (e) => {
    e.preventDefault();
    dispatch({
      type: "CREATE_LABEL",
      payload: { id: Date.now(), color: currentColor,colorName:currentColorName, text },
    });
    setText('')
    setCurrentColor('#61bd4f')
    setShow(true);
  };
  const setCurrentLabelFunc = (id) => {
    dispatch({
      type: 'CURRENT_LABEL',
      payload: { id }
    })
    setShowEdit(true)
  }
  const showLabels = () => {
    return (
      <ColumnFlex>
        <RowFlex>
          <Title>Labels</Title>
          <IconButton onClick={handleClose} size='small'>
            <ClearIcon fontSize='small' />
          </IconButton>
        </RowFlex>
        <Divider />
        <br />
        <CreateInput
          type="text"
          placeholder='Search labels...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <br />
        <InputLabel>LABELS</InputLabel>
        {newLabels.map((label) => {
          return (
            <SpaceBetween key={label.id}>
              <Label whileHover={{ x : '-8px' }}
                onClick={() => toggleLabelFunc(label.id)}
                
                bgColor={label.color}
              >
                <SpaceBetween text={label.text}>
                  {label.text}
                  {labelOrder.includes(label.id) && 
                  <div style={{ 
                    height: '24px', 
                    width: '24px', 
                    display: 'flex', 
                    justifyContent: 
                    'center', 
                    alignItems: 'center' 
                    }} >
                    <CheckIcon style={{ fontSize: '16px' }} />
                  </div>
                  }
                </SpaceBetween>
              </Label>
              <IconButton style={{ marginLeft: '8px', color: '#71909a' }} onClick={() => setCurrentLabelFunc(label.id)} size='small'>
                <EditOutlinedIcon fontSize='small' />
              </IconButton>
            </SpaceBetween>
          );
        })}
        <br />
        <Button
          onClick={() => setShow(false)}
          variant="contained"
          disableElevation
          color='inherit'
        >
          create a new label
        </Button>
        <br />
      </ColumnFlex>
    );
  };

  const addLabels = () => {
    return (
      <ColumnFlexColor>
        <RowFlex>
          <IconButton onClick={() => setShow(true)} size='small'>
            <ArrowBackIcon
              fontSize='small'
            />
          </IconButton>
          <Title>Create Label</Title>
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
        <Button
          onClick={(e) => addLabelFunc(e)}
          variant="contained"
          disableElevation
          color='inherit'
        >
          create
        </Button>
        <br />
      </ColumnFlexColor>
    );
  };
  return <div>{showEdit ? <EditLabelForm handleClose={handleClose} setShowFunc={setShowFunc} /> : show ? showLabels() : addLabels()}</div>;
}

export default LabelForm;
