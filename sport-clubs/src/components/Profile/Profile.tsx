import React from "react";
import Line from "../Line/Line";
import NumInfo from "../NumInfo/NumInfo";
import WeekDay from "../WeekDay/WeekDay";
import profileImg from "../../assets/profileImg.png";
import logoutImg from "../../assets/logout-svgrepo-com 1.svg";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";

import { logout, setCredentials } from "../../store/reducers/AuthSlice";

interface Props {}

function Profile({}) {
  const { record: user } = JSON.parse(localStorage.getItem("pocketbase_auth"));

  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const d = new Date();
  const n = d.getDay();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function Leave() {
    navigate({ to: "/auth" });
    dispatch(logout());
  }

  return (
    <>
      <div className="flex flex-col gap-[8px] w-[100%] items-center relative ">
        <img
          onClick={Leave}
          className="absolute right-0 cursor-pointer "
          src={logoutImg}
        />
        <img
          src={profileImg}
          alt="User"
          className="rounded-[40px] m-[2px] w-[80px]"
        />
        <div className="flex flex-col gap-[4px] w-[100%] items-center">
          <h1 className="font-semibold text-[24px]">{user.login}</h1>
          <div className="flex justify-center w-[100%]">
            <NumInfo headNum={2} info={"Clubs"} isLink={true} />
          </div>
        </div>
      </div>
      <Line />
      <div className="flex flex-col gap-[12px] w-[100%] items-center px-[8px]">
        <h3 className="text-[16px] text-[#505050]">This week</h3>
        <h2 className="font-semibold text-[22px]">{"8h"}</h2>
        <div className="flex flex-col items-center gap-[4px] w-[100%]">
          <div className="flex items-center gap-[4px] w-[100%]">
            {days.map((item) => (
              <WeekDay
                key={item}
                day={item}
                active={days[n] == item ? true : false}
              />
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
