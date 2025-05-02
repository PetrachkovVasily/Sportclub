import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import Profile from "../../components/Profile/Profile";
import Goals from "../../components/Goals/Goals";
import SwitchMenu from "../../components/SwitchMenu/SwitchMenu";
import Achievements from "../../components/Achievements/Achievements";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";

export const Route = createFileRoute("/profile/$id")({
  component: RouteComponent,
  beforeLoad: () => {
    redirect({
      to: "/profile/stats",
    });
  },
});

function RouteComponent() {
  const menuList = [
    { name: "Stats", link: "/profile/123/stats" },
    { name: "Goals", link: "/profile/123/goals" },
  ];

  const [openAch, setOpenAch] = useState(false);

  const closeModal = () => {
    setOpenAch(false);
  };

  const openModal = () => {
    setOpenAch(true);
  };

  return (
    <PageWrapper>
      <div className="flex flex-col gap-[16px] w-[19vw] max-w-[280px]">
        <ContentContainer>
          <Profile />
        </ContentContainer>
        <ContentContainer gap={24} pb={16}>
          <Goals />
        </ContentContainer>
      </div>
      <div className="w-[100%] max-w-[576px]">
        <SwitchMenu menuList={menuList} />
        <Outlet />
      </div>
      <div className="max-w-[280px] w-[100%]">
        <ContentContainer gap={22} pb={16}>
          <Achievements
            userAchAmount={8}
            clubAchAmount={16}
            openModal={openModal}
          />
        </ContentContainer>
      </div>
      {openAch && (
        <Modal closeModal={closeModal}>
          <div className="flex flex-col w-full items-center gap-[18px] pb-[12px] ">
            <Achievements
              isClub={false}
              isModal={true}
              userAchAmount={8}
              clubAchAmount={16}
              openModal={openModal}
            />
          </div>
        </Modal>
      )}
    </PageWrapper>
  );
}
