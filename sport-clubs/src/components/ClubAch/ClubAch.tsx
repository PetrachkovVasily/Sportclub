import React from "react";
import Achievement from "../Achievement/Achievement";
import deleteBtn from "../../assets/delete-1-svgrepo-com 1.svg";
import { useDeleteClubAchievementMutation } from "../../services/UserService";

interface Props {}

function ClubAch({ name, info, date, progress = 0, id }) {
  const [deleteAchievement] = useDeleteClubAchievementMutation();

  const handleDelete = () => {
    deleteAchievement(id);
  };
  return (
    <div className="w-full flex items-center gap-[16px] ">
      <div
        className="relative w-[100%] p-[8px] px-0 flex items-center justify-between rounded-[4px] border-[2px] border-[#F2B749]/12 "
        // style={{
        //   filter: `grayscale(${progress < 100 ? 100 : 0}%)`,
        // }}
      >
        <div
          style={{
            width: progress + "%",
          }}
          className="h-[100%] absolute bg-[#F2B749]/12 "
        ></div>
        <div className="pl-[8px]">
          <Achievement name={name} info={info} />
        </div>
        <h3 className="text-[12px] font-semibold text-[#505050] pr-[8px] ">
          {date}
        </h3>
      </div>

      <button onClick={handleDelete}>
        <img className="w-[22px] " src={deleteBtn} alt="" />
      </button>
    </div>
  );
}

export default ClubAch;
