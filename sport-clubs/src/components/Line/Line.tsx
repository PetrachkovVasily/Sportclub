import React from "react";

interface Props {}

function Line({ height = 2 }) {
  return (
    <hr
      className={`w-[100%] bg-[#404040] opacity-15 rounded-[1px] max-w-[512px]`}
      style={{ height: height }}
    ></hr>
  );
}

export default Line;
