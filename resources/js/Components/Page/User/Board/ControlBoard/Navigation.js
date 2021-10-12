import React from "react";
import { BiImageAdd, BiText } from "react-icons/bi";
import { FaCogs, FaShapes } from "react-icons/fa";
import { Context } from "../ContextProvider";
import { Nav } from "../Constant";

const navOptions = [
  {
    name: Nav.IMAGE,
    Icon: BiImageAdd,
  },
  {
    name: Nav.SHAPE,
    Icon: FaShapes,
  },
  {
    name: Nav.TEXT,
    Icon: BiText
  },
  {
    name: Nav.CONTROL,
    Icon: FaCogs,
  }
];

const Navigation = () => {
  const { state, setState } = React.useContext(Context);

  const handleChange = (name) => {
    setState({
      ...state,
      nav: name,
    });
  };

  return (
    <div className="flex">
      {navOptions.map(({ name, Icon }) => (
        <div
          className={
            name === state.nav
              ? "bg-gray-800"
              : "text-gray-500 hover:text-gray-300"
          }
          key={name}
        >
          <div
            onClick={() => handleChange(name)}
            className="w-12 h-12 flex items-center justify-center text-2xl cursor-pointer"
          >
            <Icon />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Navigation;
