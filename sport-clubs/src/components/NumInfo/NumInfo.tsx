import React from "react";

interface Props {}

function NumInfo({ headNum, info }) {
  return (
    <div className="flex flex-col w-[100%] items-center">
      <h3 className="font-semibold text-[18px]">{headNum}</h3>
      <p className="text-[16px] text-[#505050]">{info}</p>
    </div>
  );
}

export default NumInfo;
