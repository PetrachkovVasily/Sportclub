import React from "react";
import backgroundImg from "../../assets/back.png";
import ActionBtn from "../ActionBtn/ActionBtn";

interface Props {}

function ClubHead(props: Props) {
  const {} = props;

  return (
    <section className="flex flex-col rounded-[8px] bg-white w-[100%] max-w-[880px]">
      <img
        className="w-[100%] h-[200px] "
        src={backgroundImg}
        alt="backgroundImg"
      />
      <div className="flex justify-between px-[16px] py-[12px] pt-[14px]">
        <div>
          <h1 className="text-[24px] font-semibold ">{"Club name"}</h1>
          <h3 className="text-[16px] text-[#505050] ">{"public"}</h3>
        </div>
        <ActionBtn>Join</ActionBtn>
      </div>
    </section>
  );
}

export default ClubHead;
