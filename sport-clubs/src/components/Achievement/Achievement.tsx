import React from "react";
import profileImg from "../../assets/profileImg.png";

interface Props {}

function Achievement({ name, info }) {
  return (
    <div className="flex gap-[8px] w-[100%] items-start">
      <img
        src={profileImg}
        alt="AchImg"
        className="w-[38px] h-[38px] rounded-[19px] "
      />
      <div className="w-[100%] flex flex-col max-w-[186px] text-ellipsis overflow-hidden">
        <h3 className="font-semibold text-[14px] text-nowrap text-ellipsis overflow-hidden">
          {name}
        </h3>
        <h3 className="text-[12px] text-[#505050] text-nowrap text-ellipsis overflow-hidden">
          {info}
        </h3>
      </div>
    </div>
  );
}

export default Achievement;
