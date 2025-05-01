import React from "react";
import profileImg from "../../assets/profileImg.png";

interface Props {}

function ChatMessage(props: Props) {
  const {} = props;

  return (
    <div className="flex gap-[12px] w-[100%] p-[8px] px-[16px] items-center justify-between ">
      <div className="flex gap-[12px] w-[100%] items-start">
        <img
          src={profileImg}
          alt="AchImg"
          className="w-[36px] h-[36px] rounded-[24px]"
        />
        <div className="w-[100%] flex flex-col text-ellipsis overflow-hidden">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[14px] text-nowrap text-[#F2B749] text-ellipsis overflow-hidden">
              {"User name"}
            </h2>
            <div className="flex items-center gap-[8px] font-semibold text-[#505050] text-[12px]">
              15:23
            </div>
          </div>

          <span className="text-[14px] font-medium text-[#505050] text-ellipsis overflow-hidden w-full max-w-[440px] text-justify">
            {
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more"
            }
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
