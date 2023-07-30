import React from "react";

const FaceSquare = ({ top, right, bottom, left, percent }) => {
  const topPercent = top * 100 + "%";
  const leftPercent = left * 100 + "%";
  const widthPercent = (right - left) * 100 + "%";
  const heightPercent = (bottom - top) * 100 + "%";
  const faceAcuracyPercent = percent * 100;
  return (
    <div
      style={{
        top: topPercent,
        left: leftPercent,
        width: widthPercent,
        height: heightPercent,
      }}
      className="ba bw1 b--green  w-1 h-1 absolute"
    >
      <div className="relative w-60">
        <p style={{ bottom: "0" }} className="absolute white b">
          {`${faceAcuracyPercent.toFixed(2)}%`}
        </p>
      </div>
    </div>
  );
};

export default FaceSquare;
