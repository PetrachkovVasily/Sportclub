import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Counter from "../Counter/Counter";
import ActionBtn from "../ActionBtn/ActionBtn";
import {
  useAddUserGoalsMutation,
  useGetUserClubActivitiesQuery,
} from "../../services/UserService";

interface Props {}

function GoalForm({ userId, type, closeModal }) {
  const activities = useGetUserClubActivitiesQuery(userId)?.data;

  const [goal, setGoal] = useState({
    activity_name: activities ? activities[0].name : "",
    limit: 1,
    currentAmount: 0,
    user_id: userId,
    type: type.toLowerCase(),
  });

  const [addGoal] = useAddUserGoalsMutation();

  const handleAdd = async () => {
    addGoal(goal);
    closeModal();
  };

  useEffect(() => {
    setGoal({...goal, activity_name: activities ? activities[0].name : ""})
  }, [activities]);

  return (
    <div className="w-full flex flex-col gap-[20px] items-center ">
      <h1 className="text-[22px] text-[#505050] ">
        New {type.toLowerCase()} goal
      </h1>
      <div className="w-full flex flex-col gap-[12px] ">
        <div className="flex gap-[8px] w-full mt-[4px]">
          <h3 className="text-[16px] ml-[4px] text-[#505050] font-semibold ">
            Activity:
          </h3>
          <div className="border-[2px] w-full max-w-[160px] bg-white border-[#505050]/12 rounded-[4px] text-[16px] ">
            {activities && (
              <Dropdown
                value={goal.activity_name}
                onChange={(e) => {
                  setGoal({ ...goal, activity_name: e });
                }}
                options={activities.map((item) => {
                  return { option: item.name, name: item.name };
                })}
                width="100%"
              />
            )}
          </div>
        </div>
        <div className="flex gap-[8px] w-full">
          <h3 className="text-[16px] ml-[4px] text-[#505050] font-semibold ">
            Amount:
          </h3>
          <input
            className="w-full max-w-[160px] h-auto text-[14px] font-semibold text-[#505050] "
            value={+goal.limit}
            onChange={(e) => {
              setGoal({ ...goal, limit: +e.target.value });
            }}
            type="number"
            min={1}
          />
        </div>
      </div>
      <ActionBtn onClick={handleAdd}>Create</ActionBtn>
    </div>
  );
}

export default GoalForm;
