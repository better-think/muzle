import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Context } from "./ContextProvider";
import CanvasBoard from "./CanvasBoard";
import ControlBoard from "./ControlBoard";

const styles = {
  board: { width: 774, height: 730 },
  control: { width: 250, height: 730 },
};

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    backgroundColor: "rgba(255,255,255,1)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const Board = ({ data }) => {

  const { state, setState } = React.useContext(Context);

  React.useEffect(() => {
    setState({
      ...state,
      background: data.backgrounds[0],
      gameId: data.game.id,
      data
    });
  }, [data]);

  // <Scrollbars
  //       className="flex-grow"
  //       renderThumbHorizontal={renderThumb}
  //       renderThumbVertical={renderThumb}
  //     ></Scrollbars>
  return (
    <div className="flex rounded-md" style={{ height: 730 }}>      
        <div style={styles.board}>
          <CanvasBoard />
        </div>
      
      <Scrollbars
        className="flex-shrink-0 bg-gray-900 text-gray-100"
        style={styles.control}
        renderThumbHorizontal={renderThumb}
        renderThumbVertical={renderThumb}
      >
        <ControlBoard />
      </Scrollbars>
    </div>
  );
};

export default Board;
