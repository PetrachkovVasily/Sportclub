import React from "react";
import profileImg from "../../assets/profileImg.png";
import menuImg from "../../assets/menu-vertical-svgrepo-com 1.svg";
import { Link } from "@tanstack/react-router";

interface Props {}

function ClubItem({ isMember = false }) {
  return (
    <div className="flex gap-[12px] w-[100%] p-[8px] items-center justify-between ">
      <div className="flex gap-[12px] w-[100%] items-center">
        <Link to={"/club/123/rating"}>
          <img
            src={profileImg}
            alt="AchImg"
            className="w-[48px] h-[48px] rounded-[24px]"
          />
        </Link>
        <div className="w-[100%] flex flex-col max-w-[186px] text-ellipsis overflow-hidden">
          <div className="flex items-center gap-[8px]">
            <Link to={"/club/123/rating"}>
              <h2 className="font-semibold text-[18px] text-nowrap text-ellipsis overflow-hidden">
                {"Club name"}
              </h2>
            </Link>
            <h3 className="text-[14px]  text-[#505050] text-nowrap text-ellipsis overflow-hidden">
              {"public"}
            </h3>
          </div>
          {/* <h3 className="text-[12px]  text-[#505050] text-nowrap text-ellipsis overflow-hidden">
                  {"42 members"}
                </h3> */}
          <h3 className="text-[14px]  text-[#505050] text-nowrap text-ellipsis overflow-hidden">
            {"category"}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-[8px] ">
        {isMember ? (
          <>
            <Link to={"/chat/123"}>
              <button className="w-[96px] px-[8px] py-[4px] rounded-[4px] font-bold bg-[#F2B749] text-white text-[14px]">
                Chat
              </button>
            </Link>

            <button className="px-[4px] w-[29px] h-[29px]">
              <img className="w-[29px] h-[29px]" src={menuImg} alt="" />
            </button>
          </>
        ) : (
          <>
            <button className="w-[96px] px-[8px] py-[4px] rounded-[4px] font-bold bg-[#F2B749] text-white text-[14px]">
              Join
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ClubItem;
