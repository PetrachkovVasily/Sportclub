import React from "react";
import GoalProgress from "../GoalProgress/GoalProgress";
import addBtn from "../../assets/add-svgrepo-com 1.svg";

interface Props {}

function GoalCategory({
  head,
  children,
  isChanging = false,
  openModal,
  setType,
}) {
  return (
    <div className={`flex flex-col gap-[12px] px-[8px]`}>
      <h2 className="font-semibold text-[20px] text-[#505050]">{head}:</h2>
      {children}
      {isChanging && (
        <div className="w-full flex justify-center">
          <button
            onClick={() => {
              setType(head);
              openModal();
            }}
            className="mt-[4px] bg-white rounded-2xl border-[2px] border-[#505050]/18 "
          >
            <img src={addBtn} alt="" />
          </button>
        </div>
      )}
    </div>
  );
}

export default GoalCategory;
