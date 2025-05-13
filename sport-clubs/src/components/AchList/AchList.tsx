import React from "react";
import AchImg from "../AchImg/AchImg";
import profileImg from "../../assets/profileImg.png";

interface Props {}

function AchList({ isClub = false, userAchievements = [], isNot = false }) {
  return (
    <div className="w-[100%] flex gap-[4px] mb-[8px]">
      {userAchievements.map((item, i, arr) => {
        if ((i != 0 && i < 5) || isNot)
          return <AchImg isClub={isClub} src={profileImg} />;
        if (i == 5 && arr.length - i - 1 !== 0)
          return (
            <div className="flex justify-center items-center min-w-[38px] w-[38px] h-[38px] rounded-[19px] bg-[#404040]/12 text-[#505050] text-[14px] font-bold">
              +{arr.length - i - 1}
            </div>
          );
      })}
    </div>
  );
}

export default AchList;
