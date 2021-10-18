import React, { useState } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import AddOutlinedIcon from "@material-ui/icons/AddOutlined"
import LabelModal from "./LabelModal"
import { motion } from 'framer-motion'

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  width:100%;
  justify-content: flex-start;
  margin:0 0 8px 0;
  flex-wrap:wrap;
`;
const Label = styled(motion.div)`
  background: ${(props) => props.bgColor};
  color: ${(props) => (props.color ? props.color : "#fff")};
  text-align: center;
  font-weight: 500;
  font-size:14px;
  height: 25px;
  display:flex;
  justify-content:center;
  align-items:center;
  width: ${(props) => (props.text === "" ? "22px" : "auto")};
  line-height: 22px;
  margin:0 4px 4px 0;
  cursor:pointer;
  border-radius: 3px;
  padding: ${(props) => (props.color ? "4px" : "4px 10px")};
`;
const LabelAdd = styled.div`
  background:#eaecef;
  color:#71909a;
  text-align: center;
  font-weight: 500;
  height: 25px;
  display:block;
  width:auto;
  line-height: 22px;
  margin:0 4px 4px 0;
  border-radius: 3px;
  padding:4px 4px;
  &:hover{
    background:#e1e4e9;
  }
`;
const Title = styled.h3`
font-size:12px;
line-height:20px;
vertical-align:baseline;
letter-spacing:0.48px;
word-spacing:0px;
margin:0px 8px 4px 0px;
padding:0px;
font-weight:500;
font-style:normal;
font-variant:normal;
text-transform:uppercase;
text-decoration:none solid rgb(94, 108, 132);
text-align:start;
text-indent:0px;
color:#5e6c84;
`
const Container = styled.div`
padding:0 16px 0 40px;
@media(max-width:960px){
  padding:0
}
`

function Labels({ labelOrder, id, open, handleOpen, handleClose }) {

  const labels = useSelector(state => state.labels.labels)
  
  return (
    
    <div>
      <LabelModal id={id} open={open} handleClose={handleClose} />
      { labelOrder.length !== 0 ?
      <Container>
        <Title>Labels</Title>
        <LabelContainer>
          {labelOrder.map(lorder => {
              const label = labels.find(label => label.id === lorder)
              if(label){
              return(
              <Label initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleOpen} key={label.id} bgColor={label.color} text={label.text}>
                {label.text}
              </Label>
              )
            }}
          )}
          <LabelAdd
            style={{ cursor: "pointer" }}
            onClick={handleOpen}
            bgColor="#eaecef"
            color="#71909a"
          >
            <AddOutlinedIcon />
          </LabelAdd>
        </LabelContainer>
          </Container> : '' }
    </div> 
  );
}

export default Labels;
