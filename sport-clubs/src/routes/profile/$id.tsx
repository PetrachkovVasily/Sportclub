import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import Profile from "../../components/Profile/Profile";
import Goals from "../../components/Goals/Goals";
import SwitchMenu from "../../components/SwitchMenu/SwitchMenu";
import Achievements from "../../components/Achievements/Achievements";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import {
  useFetchUserQuery,
  useGetUserWorkoutsActivitiesQuery,
  userAPI,
} from "../../services/UserService";
import { postAPI } from "../../services/PostService";
import pb from "../../lib/pocketbase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import UserAchievementsList from "../../components/Achievements/UserAchievementsList";

export const Route = createFileRoute("/profile/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  console.log(id);

  const userWorkoutsActivities =
    useGetUserWorkoutsActivitiesQuery(id)?.data?.items;

  console.log(userWorkoutsActivities);

  const menuList = [
    { name: "Stats", link: "/profile/$id/stats", id: id },
    { name: "Goals", link: "/profile/$id/goals", id: id },
  ];

  const [openAch, setOpenAch] = useState(false);

  const closeModal = () => {
    setOpenAch(false);
  };

  const openModal = () => {
    setOpenAch(true);
  };

  const [userAchievements, setUserAchievements] = useState([]);

  async function getAchs() {
    const userAchievements = await pb
      .collection("userAchievement")
      .getFullList({
        filter: `user_id = "${id}" && recieved = true`,
        expand: "achievement_id",
        perPage: 500,
      });
    setUserAchievements(userAchievements);
  }

  useEffect(() => {
    getAchs();
  }, []);

  return (
    <PageWrapper>
      <div className="flex flex-col gap-[16px] w-[19vw] max-w-[280px]">
        <ContentContainer>
          <Profile />
        </ContentContainer>
        <ContentContainer gap={24} pb={16}>
          <Goals userId={id} />
        </ContentContainer>
      </div>
      <div className="w-[100%] max-w-[576px]">
        <SwitchMenu menuList={menuList} />
        <Outlet />
      </div>
      <div className="max-w-[280px] w-[100%]">
        <ContentContainer gap={22} pb={16}>
          {userAchievements && (
            <Achievements
              userAchievements={userAchievements}
              userAchAmount={8}
              clubAchAmount={16}
              openModal={openModal}
            />
          )}
        </ContentContainer>
      </div>
      {openAch && (
        <Modal closeModal={closeModal}>
          <div className="flex flex-col w-full items-center gap-[18px] pb-[12px] ">
            <UserAchievementsList
              isClub={false}
              isModal={true}
              openModal={openModal}
              userAchievements={userAchievements}
            />
          </div>
        </Modal>
      )}
    </PageWrapper>
  );
}
