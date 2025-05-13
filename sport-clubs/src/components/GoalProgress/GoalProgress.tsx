import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

interface Props {}

function GoalProgress({ name, progress, limit }) {
  return (
    <div className="w-[100%] flex flex-col gap-[4px]">
      <div className="flex justify-between">
        <h3 className="text-[14px] text-[#505050]">{name}</h3>
        <h3 className="font-bold text-[14px] text-[#505050]">
          {progress + "/" + limit}
        </h3>
      </div>
      <ProgressBar fillWidth={(progress / limit) * 100} />
    </div>
  );
}

export default GoalProgress;
