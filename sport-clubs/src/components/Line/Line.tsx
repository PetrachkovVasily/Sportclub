import React from "react";

interface Props {}

function Line(props: Props) {
  const {} = props;

  return (
    <hr className="h-[2px] w-[100%] bg-[#404040] opacity-15 rounded-[1px] max-w-[512px]"></hr>
  );
}

export default Line;
