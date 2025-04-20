import React from "react";
import GoalProgress from "../GoalProgress/GoalProgress";

interface Props {}

function GoalCategory(props: Props) {
  const {} = props;

  return (
    <div className={`flex flex-col gap-[12px] px-[8px]`}>
      <h2 className="font-semibold text-[20px] text-[#505050]">{"Week"}:</h2>
      <GoalProgress />
      <GoalProgress />
      <GoalProgress />
    </div>
  );
}

export default GoalCategory;
