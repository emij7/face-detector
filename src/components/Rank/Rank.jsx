import React from "react";

const Rank = ({ totalDetections }) => {
  return (
    <div className="center tc">
      <div className="white f3 ">{"Your total detections are..."}</div>
      <div className="white f1 ">{totalDetections || 0}</div>
    </div>
  );
};

export default Rank;
