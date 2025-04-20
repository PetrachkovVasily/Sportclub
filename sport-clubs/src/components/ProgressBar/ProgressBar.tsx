import React from "react";

interface Props {}

function ProgressBar({ fillWidth }) {
  return (
    <div className="w-full bg-[#D9D9D9] rounded-full h-[4px]">
      <div
        className={`bg-[#F2B749] h-[4px] rounded-full w-[${fillWidth}%]`}
      ></div>
    </div>
  );
}

export default ProgressBar;
