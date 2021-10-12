import React from "react";
import { Context } from "../ContextProvider";
import { Nav } from "../Constant";
import Navigation from "./Navigation";
import ImageTab from "./ImageTab";
import ShapeTab from "./ShapeTab";
import TextTab from "./TextTab";
import ControlTab from "./ControlTab";

const Board = () => {
  const { state } = React.useContext(Context);
  const { nav } = state;

  return (
    <div className="select-none p-4">
      <div className="mb-4">
        <Navigation />
      </div>
      <div className="p-2 space-y-4">
        {nav === Nav.IMAGE && <ImageTab />}
        {nav === Nav.SHAPE && <ShapeTab />}
        {nav === Nav.TEXT && <TextTab />}
        {nav === Nav.CONTROL && <ControlTab />}
      </div>
    </div>
  );
};

export default Board;
