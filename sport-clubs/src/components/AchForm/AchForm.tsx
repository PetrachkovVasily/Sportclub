import React, { useState } from "react";
import ActionBtn from "../ActionBtn/ActionBtn";
import Dropdown from "../Dropdown/Dropdown";
import {
  useAddClubAchievementMutation,
  useGetClubActivitiesQuery,
} from "../../services/UserService";

interface Props {}

function AchForm({ id, activities, closeModal }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [activity, setActivity] = useState(activities[0].name);
  const [amount, setAmount] = useState(0);

  const [addAchievement] = useAddClubAchievementMutation();

  const handleAdd = () => {
    addAchievement({
      name: name,
      description: description,
      activity: activity,
      amount: amount,
      club_id: id,
    });

    setName("");
    setDescription("");
    setActivity(activities[0].name);
    setAmount(0);

    closeModal();
  };

  return (
    <div className="w-full flex flex-col gap-[20px] items-center ">
      <h1 className="text-[22px] text-[#505050] ">New achievement</h1>
      <div className="w-full flex flex-col gap-[12px] ">
        <div className="flex flex-col w-full gap-[8px] ">
          <div className="flex gap-[4px] w-full flex-col">
            <h3 className="text-[14px] ml-[4px] text-[#505050] font-semibold ">
              Name:
            </h3>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-[2px] bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
            />
          </div>
          <div className="flex gap-[4px] w-full flex-col">
            <h3 className="text-[14px] ml-[4px] text-[#505050] font-semibold ">
              Description:
            </h3>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-[2px] bg-white border-[#505050]/12 px-2 py-1 rounded-[4px]"
            />
          </div>
        </div>
        <div className="flex gap-[8px] w-full mt-[4px]">
          <h3 className="text-[16px] ml-[4px] text-[#505050] font-semibold ">
            Activity:
          </h3>
          <div className="border-[2px] w-full max-w-[160px] bg-white border-[#505050]/12 rounded-[4px] text-[16px] ">
            <Dropdown
              options={activities?.map((item) => {
                return { value: item.name, name: item.name };
              })}
              width="100%"
              value={activity}
              onChange={setActivity}
            />
          </div>
        </div>
        <div className="flex gap-[8px] w-full">
          <h3 className="text-[16px] ml-[4px] text-[#505050] font-semibold ">
            Amount:
          </h3>
          <input
            className="w-full max-w-[160px] h-auto text-[14px] font-semibold text-[#505050] "
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            type="number"
            min={1}
          />
        </div>
      </div>
      <ActionBtn onClick={handleAdd}>Create</ActionBtn>
    </div>
  );
}

export default AchForm;
