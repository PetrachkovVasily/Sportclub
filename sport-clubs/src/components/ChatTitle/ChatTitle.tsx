import React from "react";
import profileImg from "../../assets/profileImg.png";
import menuImg from "../../assets/menu-vertical-svgrepo-com 1.svg";

interface Props {}

function ChatTitle({ openModal }) {
  return (
    <div className="z-10 bg-white  rounded-t-[8px] absolute border-b-2 border-[#505050]/15 flex gap-[12px] w-[100%] p-[8px] px-[16px] items-center justify-between ">
      <div className="flex gap-[12px] w-[100%] items-center">
        <img
          src={profileImg}
          alt=""
          className="w-[36px] h-[36px] rounded-[24px]"
        />
        <div className="w-[100%] flex flex-col max-w-[186px] text-ellipsis overflow-hidden">
          <h2 className="font-bold text-[14px] text-nowrap text-ellipsis overflow-hidden">
            {"Club name"}
          </h2>
          <h3
            onClick={openModal}
            className="cursor-pointer text-[12px] font-semibold text-[#505050] text-nowrap text-ellipsis overflow-hidden"
          >
            {"32 members"}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-[8px] ">
        <button className="px-[4px] h-full">
          <img src={menuImg} alt="" />
        </button>
      </div>
    </div>
  );
}

export default ChatTitle;
