import React from "react";
import AchList from "../AchList/AchList";
import Achievement from "../Achievement/Achievement";
import NumInfo from "../NumInfo/NumInfo";
import cupImg from "../../assets/cup-svgrepo-com 1.svg";

interface Props {}

function UserAchievementsList({ isModal = false, userAchievements = [] }) {
  return (
    <>
      <div className="w-[100%] flex flex-col gap-[8px] items-center">
        <div className="flex justify-center items-center rounded-[40px] w-[64px] h-[64px] border-solid border-[2px] border-[#404040]/15 ">
          <img src={cupImg} alt="cup" />
        </div>
        <NumInfo headNum={userAchievements.length} info={"Achievements"} />
      </div>
      <div className="flex flex-col px-[8px] gap-[8px] w-[100%]">
        <div className="flex flex-col gap-[8px] w-[100%] max-w-[232px]">
          {userAchievements.map((item) => {
            return (
              <Achievement
                name={item.expand.achievement_id.name}
                info={item.expand.achievement_id.description}
              />
            );
          })}
        </div>
        {isModal || <AchList userAchievements={userAchievements} />}
      </div>
    </>
  );
}

export default UserAchievementsList;
