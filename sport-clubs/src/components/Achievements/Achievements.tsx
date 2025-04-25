import React from "react";
import NumInfo from "../NumInfo/NumInfo";
import ViewBtn from "../ViewBtn/ViewBtn";
import Achievement from "../Achievement/Achievement";
import cupImg from "../../assets/cup-svgrepo-com 1.svg";

interface Props {}

function Achievements() {
  return (
    <>
      <div className="w-[100%] flex flex-col gap-[8px] items-center">
        <div className="flex justify-center items-center rounded-[40px] w-[64px] h-[64px] border-solid border-[2px] border-[#404040]/15 ">
          <img src={cupImg} alt="cup" />
        </div>
        <NumInfo headNum={16} info={"Achievements"} />
      </div>
      <div className="flex flex-col px-[8px] gap-[16px] w-[100%]">
        <div className="flex flex-col gap-[8px] w-[100%] max-w-[232px]">
          <Achievement name={"Super-runner"} info={"run throw 60km 6 times"} />
          <Achievement
            name={"Super-mega-runner"}
            info={"run throw 60km 6 times"}
          />
          <Achievement
            name={"Super-duper-mega-runner"}
            info={"run throw 60km 6 times"}
          />
        </div>
        <ViewBtn />
      </div>
    </>
  );
}

export default Achievements;
