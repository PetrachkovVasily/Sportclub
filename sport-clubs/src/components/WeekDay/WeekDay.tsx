import React from "react";

interface Props {}

function WeekDay({ day, active = false }) {
  return (
    <div className="flex flex-col items-center gap-[4px] w-[100%]">
      <div
        className={`w-[100%] h-[4px] rounded-[2px] ${
          active ? " bg-[#F2B749]" : " bg-[#D4D4D4]"
        }`}
      ></div>
      <h3 className="text-[14px] text-[#505050]">{day}</h3>
    </div>
  );
}

export default WeekDay;
