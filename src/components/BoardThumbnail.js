import React from "react";
import styled from "styled-components";

const Thumbnail = styled.div`
  height: 180px;
  width: 180px;
  background: #eee;
  padding: 10px;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 0 2px 4px grey;
`;

const Title = styled.h4`
  color: #111;
  text-decoration: none;
`;

const BoardThumbnail = ({ title }) => {
  console.log(title);
  return (
    <Thumbnail>
      <Title>{title}</Title>
    </Thumbnail>
  );
};

export default BoardThumbnail;
