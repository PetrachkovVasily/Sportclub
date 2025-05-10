import React, { useEffect, useRef, useState } from "react";
import profileImg from "../../assets/profileImg.png";
import menuImg from "../../assets/menu-vertical-svgrepo-com 1.svg";
import { Link } from "@tanstack/react-router";
import { useUpdateClubUsersMutation } from "../../services/UserService";
import ClubLeaveJoin from "../ClubLeaveJoin/ClubLeaveJoin";

interface Props {}

function ClubItem({ isMember = false, club, handleUpdate }) {
  return (
    <div className="flex gap-[12px] w-[100%] p-[8px] items-center justify-between ">
      <div className="flex gap-[12px] w-[100%] items-center">
        <Link to="/club/$id/rating" params={{ id: club.id }}>
          <img
            src={profileImg}
            alt="AchImg"
            className="w-[48px] h-[48px] rounded-[24px]"
          />
        </Link>
        <div className="w-[100%] flex flex-col max-w-[186px] text-ellipsis overflow-hidden">
          <div className="flex items-center gap-[8px]">
            <Link to="/club/$id/rating" params={{ id: club.id }}>
              <h2 className="font-semibold text-[18px] text-nowrap text-ellipsis overflow-hidden">
                {club.name}
              </h2>
            </Link>
            <h3 className="text-[14px]  text-[#505050] text-nowrap text-ellipsis overflow-hidden">
              {club.status}
            </h3>
          </div>
          {/* <h3 className="text-[12px]  text-[#505050] text-nowrap text-ellipsis overflow-hidden">
                  {"42 members"}
                </h3> */}
          <h3 className="text-[14px]  text-[#505050] text-nowrap text-ellipsis overflow-hidden">
            {club.category}
          </h3>
        </div>
      </div>
      <ClubLeaveJoin
        isMember={isMember}
        club={club}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default ClubItem;
