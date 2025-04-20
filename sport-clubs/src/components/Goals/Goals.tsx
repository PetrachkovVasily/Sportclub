import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import GoalProgress from "../GoalProgress/GoalProgress";
import GoalCategory from "../GoalCategory/GoalCategory";
import ViewBtn from "../ViewBtn/ViewBtn";

interface Props {}

function Goals(props: Props) {
  const {} = props;

  return (
    <>
      <h1 className="font-semibold text-[22px] mb-">Goals</h1>
      <div className="flex flex-col w-[100%] gap-[20px]">
        <GoalCategory />
        <GoalCategory />
        <GoalCategory />
      </div>
      <ViewBtn />
    </>
  );
}

export default Goals;
