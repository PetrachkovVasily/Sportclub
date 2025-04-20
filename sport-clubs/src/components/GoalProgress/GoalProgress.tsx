import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

interface Props {}

function GoalProgress(props: Props) {
  const {} = props;

  return (
    <div className="w-[100%] flex flex-col gap-[4px]">
      <div className="flex justify-between">
        <h3 className="text-[14px] text-[#505050]">{"Goal name"}</h3>
        <h3 className="font-bold text-[14px] text-[#505050]">{"20/50"}</h3>
      </div>
      <ProgressBar fillWidth={45} />
    </div>
  );
}

export default GoalProgress;
