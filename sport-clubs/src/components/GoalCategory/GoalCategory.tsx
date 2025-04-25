import React from "react";
import GoalProgress from "../GoalProgress/GoalProgress";

interface Props {}

function GoalCategory({ head, children }) {
  return (
    <div className={`flex flex-col gap-[12px] px-[8px]`}>
      <h2 className="font-semibold text-[20px] text-[#505050]">{head}:</h2>
      {children}
    </div>
  );
}

export default GoalCategory;
