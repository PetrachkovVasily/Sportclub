import React from "react";

interface Props {}

function Line({ height = 2 }) {
  return (
    <hr
      className={`h-[${height}px] w-[100%] bg-[#404040] opacity-15 rounded-[1px] max-w-[512px]`}
    ></hr>
  );
}

export default Line;
