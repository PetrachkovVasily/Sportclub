import { createFileRoute } from "@tanstack/react-router";
import ChatTitle from "../../components/ChatTitle/ChatTitle";
import ChatInput from "../../components/ChatInput/ChatInput";
import ChatMessage from "../../components/ChatMessage/ChatMessage";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import UserItem from "../../components/UserItem/UserItem";
import Line from "../../components/Line/Line";

export const Route = createFileRoute("/chat/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const MEMBERS = "Members";
  const [openUserList, setOpenUserList] = useState(false);
  const [optionValue, setOptionValue] = useState(MEMBERS);

  const openModal = () => {
    setOpenUserList(true);
  };

  const closeModal = () => {
    setOpenUserList(false);
  };

  return (
    <main className="w-[100%] h-[100%] flex justify-center pt-[84px] pb-[24px]">
      <div className="w-[100%] h-[100%] flex gap-[24px] pl-[16px] pr-[16px] max-w-[1216px]">
        <article className="w-[100%] h-[100%] flex flex-col gap-[16px] justify-center items-center">
          <section
            className="relative flex flex-col rounded-[8px] bg-white w-[100%] max-w-[640px] gap-[24px]"
            style={{
              height: "calc(100vh - 108px)",
            }}
          >
            <ChatTitle openModal={openModal} />
            <div className="w-full h-full pb-[64px] pt-[56px]">
              <div className="flex flex-col gap-[4px] h-full w-full px-[12px] overflow-y-auto ">
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
              </div>
            </div>

            <ChatInput />
          </section>
        </article>
      </div>
      {openUserList && (
        <Modal closeModal={closeModal}>
          <div className="w-full flex flex-col gap-[12px] font-semibold text-[18px] text-[#505050] ">
            <Dropdown
              options={[
                { option: MEMBERS, name: MEMBERS },
                { option: "Requests", name: "Requests" },
              ]}
              onChange={(e) => {
                setOptionValue(e.target.value);
              }}
            />
            <div className="w-full gap-[2px] flex flex-col ">
              {optionValue == MEMBERS ? (
                <>
                  <UserItem />
                  <Line />
                  <UserItem />
                  <Line />
                  <UserItem />
                </>
              ) : (
                <>
                  <UserItem requesting={true} />
                  <Line />
                  <UserItem requesting={true} />
                  <Line />
                  <UserItem requesting={true} />
                </>
              )}
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}
