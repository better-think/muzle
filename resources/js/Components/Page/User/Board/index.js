import React from "react";
import ContextProvider from "./ContextProvider";
import Container from "./Container";

const Board = ({ data }) => {
  return (
    <ContextProvider>
      <Container data={data} />
    </ContextProvider>
  );
};

export default Board;
