import React from "react";
import Line from "../Line/Line";
import NumInfo from "../NumInfo/NumInfo";
import WeekDay from "../WeekDay/WeekDay";

interface Props {}

function Profile(props: Props) {
  const {} = props;
  const weekArr = [
    { active: false, day: "Mo" },
    { active: false, day: "Tu" },
    { active: false, day: "We" },
    { active: true, day: "Th" },
    { active: false, day: "Fr" },
    { active: false, day: "Sa" },
    { active: false, day: "Su" },
  ];

  return (
    <>
      <div className="flex flex-col gap-[8px] w-[100%] items-center">
        <img
          src="public\profileImg.png"
          alt="User"
          className="rounded-[40px] m-[2px] w-[80px]"
        />
        <div className="flex flex-col gap-[4px] w-[100%] items-center">
          <h1 className="font-semibold text-[24px]">{"Name"}</h1>
          <div className="flex justify-between w-[100%]">
            <NumInfo headNum={2} info={"Clubs"} />
            <NumInfo headNum={2} info={"Following"} />
            <NumInfo headNum={2} info={"Followers"} />
          </div>
        </div>
      </div>
      <Line />
      <div className="flex flex-col gap-[12px] w-[100%] items-center px-[8px]">
        <h3 className="text-[16px] text-[#505050]">This week</h3>
        <h2 className="font-semibold text-[22px]">{"8h"}</h2>
        <div className="flex flex-col items-center gap-[4px] w-[100%]">
          <div className="flex items-center gap-[4px] w-[100%]">
            {weekArr.map((item) => (
              <WeekDay day={item.day} active={item.active} />
            ))}
          </div>

          <h3 className="font-semibold text-[12px] text-[#505050]">
            {"1h 30m"}
          </h3>
        </div>
      </div>
    </>
  );
}

export default Profile;
