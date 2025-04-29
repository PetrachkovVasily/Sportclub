import React from "react";
import AchImg from "../AchImg/AchImg";
import profileImg from "../../assets/profileImg.png";

interface Props {}

function AchList({ isClub = false }) {
  return (
    <div className="w-[100%] flex gap-[4px] mb-[8px]">
      <AchImg isClub={isClub} src={profileImg} />
      <AchImg isClub={isClub} src={profileImg} />
      <AchImg isClub={isClub} src={profileImg} />
      <AchImg isClub={isClub} src={profileImg} />
      <div className="flex justify-center items-center min-w-[38px] w-[38px] h-[38px] rounded-[19px] bg-[#404040]/12 text-[#505050] text-[14px] font-bold">
        +{4}
      </div>
    </div>
  );
}

export default AchList;
