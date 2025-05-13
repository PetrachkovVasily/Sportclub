import { createFileRoute } from "@tanstack/react-router";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import Achievement from "../../../components/Achievement/Achievement";
import Line from "../../../components/Line/Line";
import ClubAch from "../../../components/ClubAch/ClubAch";
import addBtn from "../../../assets/add-svgrepo-com 1.svg";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import AchForm from "../../../components/AchForm/AchForm";
import {
  useGetClubAchievementsQuery,
  useGetClubActivitiesQuery,
  useGetClubAdminsQuery,
} from "../../../services/UserService";
import pb from "../../../lib/pocketbase";
import pb2 from "../../../lib/p2";
import pb3 from "../../../lib/p3";

export const Route = createFileRoute("/club/$id/achievements")({
  component: RouteComponent,
});

function RouteComponent() {
  const [openCreateAch, setOpenCreateAch] = useState(false);

  const closeModal = () => {
    setOpenCreateAch(false);
  };

  const openModal = () => {
    setOpenCreateAch(true);
  };

  const { id } = Route.useParams();
  const activities = useGetClubActivitiesQuery(id)?.data?.items;

  const achievements = useGetClubAchievementsQuery(id)?.data?.items;

  //Search for admin
  const admins = useGetClubAdminsQuery(id)?.data?.items;
  const { record: user } = JSON.parse(localStorage.getItem("pocketbase_auth"));

  const [isUser, setIsUser] = useState(true);

  useEffect(() => {
    if (admins) {
      setIsUser(!admins.find((item) => item.admin_id == user.id));
    }
  }, [admins]);
  ///////////////////

  const [userAchievements, setUserAchievements] = useState([]);

  async function getAchs() {
    const userAchievements = await pb2
      .collection("userAchievement")
      .getFullList({
        filter: `user_id = "${user.id}" && recieved = true`,
        expand: "achievement_id",
        perPage: 500,
      });
    setUserAchievements(userAchievements);
  }
  useEffect(() => {
    getAchs();
    getNotAchs();
  }, []);

  const [notUserAchievements, setNotUserAchievements] = useState([]);

  async function getNotAchs() {
    const achievements = await pb3.collection("userAchievement").getFullList({
      filter: `user_id = "${user.id}" && recieved = false`,
      expand: "achievement_id",
      perPage: 500,
    });
    setNotUserAchievements(achievements);
  }

  console.log(userAchievements);

  const clubAchievements = useGetClubAchievementsQuery(id)?.data?.items;

  return (
    <article className="w-[100%] flex flex-col gap-[12px]">
      <h1 className="text-[22px] font-normal text-[#505050] ">Achiviements:</h1>
      <div className="w-[100%] flex flex-col gap-[12px] ">
        <div className="flex flex-col w-[100%] gap-[8px] px-[12px] ">
          <div className="w-[100%] flex justify-between ">
            <h3 className="text-[16px] font-semibold text-[#505050] ">
              {userAchievements?.length} of {clubAchievements?.length}{" "}
              achievements earned
            </h3>
            <h3 className="text-[16px] font-semibold text-[#505050] ">
              (
              {(userAchievements?.length / clubAchievements?.length) * 100 > 100
                ? 100
                : Math.round(
                    (userAchievements?.length / clubAchievements?.length) * 100
                  )}
              %)
            </h3>
          </div>
          <ProgressBar
            fillWidth={
              (userAchievements?.length / clubAchievements?.length) * 100 > 100
                ? 100
                : (userAchievements?.length / clubAchievements?.length) * 100
            }
          />
        </div>
        <div className="w-[100%] flex flex-col gap-[6px] px-[12px]  ">
          {userAchievements?.map((item) => {
            return (
              <ClubAch
                key={item.expand.achievement_id.id}
                name={item.expand.achievement_id.name}
                info={item.expand.achievement_id.description}
                date={item.expand.achievement_id.activity}
                progress={
                  item.recieved
                    ? 100
                    : (item.currentAmount / item.expand.achievement_id.limit) *
                      100
                }
                id={item.expand.achievement_id.id}
                isUser={isUser}
              />
            );
          })}
          {notUserAchievements?.map((item) => {
            console.log(
              item.recieved
                ? 100
                : (item.currentAmount / item.expand.achievement_id.limit) * 100
            );

            return (
              <ClubAch
                key={item.expand.achievement_id.id}
                name={item.expand.achievement_id.name}
                info={item.expand.achievement_id.description}
                date={item.expand.achievement_id.activity}
                progress={
                  item.recieved
                    ? 100
                    : (item.currentAmount / item.expand.achievement_id.limit) *
                      100
                }
                id={item.expand.achievement_id.id}
                isUser={isUser}
              />
            );
          })}
        </div>
        {isUser || (
          <div className="w-full flex justify-center mt-[4px]">
            <button
              onClick={openModal}
              className="mt-[4px] bg-white rounded-2xl border-[2px] border-[#505050]/18 "
            >
              <img src={addBtn} alt="" />
            </button>
          </div>
        )}
      </div>
      {openCreateAch && (
        <Modal closeModal={closeModal}>
          {!!activities && (
            <AchForm id={id} activities={activities} closeModal={closeModal} />
          )}
        </Modal>
      )}
    </article>
  );
}
