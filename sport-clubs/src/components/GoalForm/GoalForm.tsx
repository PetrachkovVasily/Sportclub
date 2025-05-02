import React from "react";
import Dropdown from "../Dropdown/Dropdown";
import Counter from "../Counter/Counter";
import ActionBtn from "../ActionBtn/ActionBtn";

interface Props {}

function GoalForm(props: Props) {
  const {} = props;

  return (
    <div className="w-full flex flex-col gap-[20px] items-center ">
      <h1 className="text-[22px] text-[#505050] ">New goal</h1>
      <div className="w-full flex flex-col gap-[12px] ">
        <div className="flex gap-[8px] w-full mt-[4px]">
          <h3 className="text-[16px] ml-[4px] text-[#505050] font-semibold ">
            Activity:
          </h3>
          <div className="border-[2px] w-full max-w-[160px] bg-white border-[#505050]/12 rounded-[4px] text-[16px] ">
            <Dropdown
              options={[
                { option: "public", name: "public" },
                { option: "private", name: "private" },
              ]}
              width="100%"
            />
          </div>
        </div>
        <div className="flex gap-[8px] w-full">
          <h3 className="text-[16px] ml-[4px] text-[#505050] font-semibold ">
            Amount:
          </h3>
          <input
            className="w-full max-w-[160px] h-auto text-[14px] font-semibold text-[#505050] "
            value={0}
            type="number"
            min={1}
          />
        </div>
      </div>
      <ActionBtn>Create</ActionBtn>
    </div>
  );
}

export default GoalForm;
