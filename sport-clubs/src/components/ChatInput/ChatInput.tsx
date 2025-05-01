import React from "react";
import arrow from "../../assets/send-1-svgrepo-com 1.svg";

interface Props {}

function ChatInput(props: Props) {
  const {} = props;

  return (
    <div className="bg-white rounded-b-[8px] p-[8px] px-[12px] z-10 absolute bottom-0 border-t-2 border-[#505050]/15 flex w-full gap-[12px] items-center">
      <input
        type="text"
        placeholder="Enter message"
        className="w-full h-[36px] border-[0px] border-[#404040]/12 px-2 py-1 rounded-[8px]"
      />
      <button className="p-[5px] pl-[9px] pr-[5px] h-full rounded-[22px] border-[2px] border-[#404040]/12">
        <img className="w-[32px] h-[32px]" src={arrow} alt="" />
      </button>
    </div>
  );
}

export default ChatInput;
