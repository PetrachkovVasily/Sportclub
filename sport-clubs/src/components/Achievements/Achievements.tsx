import React from "react";
import NumInfo from "../NumInfo/NumInfo";
import ViewBtn from "../ViewBtn/ViewBtn";
import Achievement from "../Achievement/Achievement";
import cupImg from "../../assets/cup-svgrepo-com 1.svg";
import ProgressBar from "../ProgressBar/ProgressBar";
import AchImg from "../AchImg/AchImg";
import AchList from "../AchList/AchList";

interface Props {}

function Achievements({ isClub = false, userAchAmount, clubAchAmount }) {
  return (
    <>
      <div className="w-[100%] flex flex-col gap-[8px] items-center">
        <div className="flex justify-center items-center rounded-[40px] w-[64px] h-[64px] border-solid border-[2px] border-[#404040]/15 ">
          <img src={cupImg} alt="cup" />
        </div>
        <NumInfo headNum={16} info={"Achievements"} />
        {isClub ? (
          <div className="flex flex-col gap-[4px] items-center p-[8px] w-[100%] mt-[8px]">
            <h3 className="text-[#505050] text-[14px] ">
              You have <b>{userAchAmount}</b> of <b>{clubAchAmount}</b>
            </h3>{" "}
            <ProgressBar fillWidth={45} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col px-[8px] gap-[8px] w-[100%]">
        <div className="flex flex-col gap-[8px] w-[100%] max-w-[232px]">
          <Achievement name={"Super-runner"} info={"run throw 60km 6 times"} />
        </div>

        <AchList />
        {isClub ? (
          <div className="flex flex-col gap-[6px] mb-[6px]">
            <h3 className="text-[#505050] text-[14px] ">Not received</h3>
            <AchList isClub={isClub} />
          </div>
        ) : (
          <></>
        )}
        <ViewBtn />
      </div>
    </>
  );
}

export default Achievements;
