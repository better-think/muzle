import React from "react";
import { FaQuestion } from "react-icons/fa";
import { Context } from "../../ContextProvider";

const Helper = () => {
  const { state, setState } = React.useContext(Context);

  const hideHelper = () => {
    setState({
      ...state,
      showHelper: false
    });
    window.removeEventListener('mouseup', hideHelper);
  };

  const onMouseDown = () => {
    setState({
      ...state,
      showHelper: true
    });
    window.addEventListener('mouseup', hideHelper);
  };

  return (
    <div className="flex justify-center">
      <div
        onMouseDown={onMouseDown}
        className="w-12 h-12 flex items-center justify-center border border-transparent hover:border-gray-500 active:border-gray-300 cursor-pointer rounded-full"
      >
        <FaQuestion />
      </div>
    </div>
  )
};

export default Helper;