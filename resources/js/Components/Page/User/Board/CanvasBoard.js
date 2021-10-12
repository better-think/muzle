import React from "react";
import { fabric } from "fabric";
import { Context } from "./ContextProvider";

const CanvasBoard = () => {
  const { state, setState } = React.useContext(Context);
  const { canvas, background, dragItem, width, height } = state;

  React.useEffect(() => {
    if (state.canvas === null) {
      const canvas = new fabric.Canvas("canvas", {
        width: 0,
        height: 0,
      });
      setState({
        ...state,
        canvas
      });
    }
  }, [state, setState]);

  React.useEffect(() => {
    if (state.canvas) {
      state.canvas.clear();
    }
    console.log(state.gameId);
  }, [state.gameId]);

  React.useEffect(() => {
    if (canvas && background) {
      canvas.setWidth(width);
      canvas.setHeight(height);
      const backgroundImageUrl = `/storage/${background.src}`;
      fabric.Image.fromURL(
        backgroundImageUrl,
        (img) => {
          if (img.width && img.height) {
            const xR = width / img.width;
            const yR = height / img.height;
            const mR = Math.max(xR, yR);
            canvas.setBackgroundImage(
              img,
              canvas.renderAll.bind(canvas),
              {
                originX: "left",
                originY: "top",
                scaleX: xR,
                scaleY: yR,
              }
            );
          }
        },
        {
          crossOrigin: 'Anonymous'
        }
      );
    }
  }, [canvas, width, height, background]);

  const handleDrop = (event) => {
    if (canvas && dragItem.type) {
      const canvasOffset = event.target.getBoundingClientRect();
      const x = event.clientX - (canvasOffset.left + dragItem.offsetX);
      const y = event.clientY - (canvasOffset.top + dragItem.offsetY);

      if (dragItem.type === "image") {
        const imageUrl = `/storage/${dragItem.object.src}`;
        fabric.Image.fromURL(
          imageUrl,
          (img) => {
            if (img.width) {
              const scale = dragItem.width / img.width;
              img.set({
                left: x,
                top: y,
                scaleX: scale,
                scaleY: scale,
              });
              canvas.add(img).renderAll.bind(canvas);
            }
          },
          {
            crossOrigin: 'Anonymous'
          }
        );
      }

      if (dragItem.type === "line") {
        const line = new fabric.Line([x, y, x + dragItem.width, y], {
          stroke: dragItem.object.color,
          strokeWidth: dragItem.height,
          strokeUniform: true
        });
        canvas.add(line).renderAll.bind(canvas);
      }

      if (dragItem.type === "circle") {
        const circle = new fabric.Circle({
          left: x,
          top: y,
          radius: dragItem.width / 2,
          fill: dragItem.object.color,
        });
        canvas.add(circle).renderAll.bind(canvas);
      }
    }
  };

  return (
    <div
      onDrop={(event) => handleDrop(event)}
      className="relative w-full h-full"
    >
      <canvas id="canvas" />
      {state.showHelper &&
        <div className="absolute top-0 left-0 p-2 w-full h-full">
          <img src={`/storage/${state.data.game.helper}`} alt="" className="w-full h-full object-contain" />
        </div>
      }
    </div>
  );
};

export default CanvasBoard;
