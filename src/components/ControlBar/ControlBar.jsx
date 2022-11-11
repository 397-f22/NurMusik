import React from "react";
import "./ControlBar.css";

const ControlBar = ({ playState, togglePlayer }) => {
  return (
    <div className="control-container">
      <button onClick={() => togglePlayer()} className="control-button">
        {playState ? (
          <i className="bi bi-pause " />
        ) : (
          <i className="bi bi-play" />
        )}
      </button>
    </div>
  );
};

export default ControlBar;
