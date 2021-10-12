import React from "react";
import { fabric } from "fabric";
import { Context } from "../ContextProvider";

const buttonClass = "p-2 cursor-pointer rounded-sm bg-gray-700 hover:bg-gray-600 active:bg-gray-700 focus:outline-none";

const TextTab = () => {
  const { state } = React.useContext(Context);
  const { canvas } = state;

  const handleTextAdd = () => {
    const text = new fabric.IText('TEXT', {
      left: state.width / 2,
      top: state.height / 2,
      fill: 'white'
    });
    canvas.add(text).renderAll.bind(canvas);
  };
  return (
    <div className="space-y-4">
      <div>
        <button className={buttonClass} onClick={handleTextAdd}>
          Add Text
        </button>
      </div>
      <div className="space-y-2">
        <p>Comment</p>
        <textarea
          rows={5}
          placeholder="Leave Comment"
          className="text-gray-900 p-2 w-full resize-y rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
        </textarea>
      </div>
    </div>
  );
};

export default TextTab;