import React, { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import GoalProgress from "../GoalProgress/GoalProgress";
import GoalCategory from "../GoalCategory/GoalCategory";
import ViewBtn from "../ViewBtn/ViewBtn";
import deletImg from "../../assets/delete-1-svgrepo-com 1.svg";

interface Props {}

function Goals({ isFull = false }) {
  const [isChanging, setIsChanging] = useState(false);
  return (
    <>
      <h1 className="font-semibold text-[22px] mb-">Goals</h1>
      <div className="flex flex-col w-[100%] gap-[20px]">
        <GoalCategory head={"Week"}>
          <div className="flex items-center gap-[12px]">
            <GoalProgress name={"Name"} progress={35} />
            {isChanging ? (
              <img className="cursor-pointer " src={deletImg} alt="delete" />
            ) : (
              <></>
            )}
          </div>
          <GoalProgress name={"Name"} progress={35} />
        </GoalCategory>
        <GoalCategory head={"Month"}>
          <GoalProgress name={"Name"} progress={65} />
          <GoalProgress name={"Name"} progress={25} />
        </GoalCategory>
        <GoalCategory head={"Year"}>
          <GoalProgress name={"Name"} progress={15} />
        </GoalCategory>
      </div>

      {isFull ? (
        <button
          className="text-[#505050] text-[14px] w-[100%] flex items-center justify-center px-[16px] rounded-[4px] bg-[#404040]/12"
          onClick={() => setIsChanging(!isChanging)}
        >
          {isChanging ? "Save goals" : "Change goals"}
        </button>
      ) : (
        <ViewBtn />
      )}
    </>
  );
}

export default Goals;
