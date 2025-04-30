import React from "react";

interface Props {}

function Line({ height = '2px', maxWidth = '512px' }) {
  return (
    <hr
      className={`w-[100%] bg-[#404040] opacity-15 rounded-[1px] max-w-[512px]`}
      style={{ height: height, maxWidth: maxWidth }}
    ></hr>
  );
}

export default Line;
