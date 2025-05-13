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
  useGetSingleClubQuery,
} from "../../../services/UserService";
import pb from "../../../lib/pocketbase";
import pb2 from "../../../lib/p2";
import pb3 from "../../../lib/p3";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { userSlice } from "../../../store/reducers/UserSlice";

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

  async function createUserAchievementsFromClub(userId, clubId) {
    try {
      // 1. Получить все достижения клуба
      const clubAchievements = await pb.collection("achievement").getFullList({
        filter: `club_id = "${clubId}"`,
      });

      if (clubAchievements.length === 0) {
        console.log("Нет достижений у клуба");
        return [];
      }

      // 2. Получить все достижения пользователя
      const userAchievements = await pb
        .collection("userAchievement")
        .getFullList({
          filter: `user_id = "${userId}"`,
        });

      // 3. Определить уже существующие связи с clubAchievement_id
      const existingClubAchievementIds = new Set(
        userAchievements.map((ua) => ua.achievement_id)
      );

      // 4. Отфильтровать только новые достижения
      const newAchievements = clubAchievements.filter(
        (ca) => !existingClubAchievementIds.has(ca.id)
      );

      if (newAchievements.length === 0) {
        console.log("Все достижения уже созданы");
        return [];
      }

      // 5. Создать пользовательские достижения
      const createdAchievements = await Promise.all(
        newAchievements.map((ca) =>
          pb.collection("userAchievement").create({
            user_id: userId,
            achievement_id: ca.id,
          })
        )
      );

      console.log("Созданы пользовательские достижения:", createdAchievements);
      return createdAchievements;
    } catch (error) {
      console.error("Ошибка создания пользовательских достижений:", error);
      throw error;
    }
  }
  useEffect(() => {
    createUserAchievementsFromClub(user.id, id);
    getAchs();
    getNotAchs();
  }, [achievements]);

  const [notUserAchievements, setNotUserAchievements] = useState([]);

  async function getNotAchs() {
    const achievements = await pb3.collection("userAchievement").getFullList({
      filter: `user_id = "${user.id}" && recieved = false`,
      expand: "achievement_id",
      perPage: 500,
    });
    setNotUserAchievements(achievements);
  }

  const clubAchievements = useGetClubAchievementsQuery(id)?.data?.items;

  const club = useGetSingleClubQuery(id)?.data;

  const dispatch = useAppDispatch();
  const { setMember } = userSlice.actions;
  const { isMember } = useAppSelector((state) => state.userReducer);

  function findUser() {
    return user.id == club?.user_id?.find((item) => item == user.id);
  }

  useEffect(() => {
    dispatch(setMember(findUser()));
  }, [club, user.id == club?.user_id?.find((item) => item == user.id)]);
  // useEffect(() => {
  //   if (club && club?.user_id?.find((item) => item == user.id)) setMember(true);
  // }, [club]);

  console.log(notUserAchievements);

  return (
    <article className="w-[100%] flex flex-col gap-[12px]">
      <h1 className="text-[22px] font-normal text-[#505050] ">Achiviements:</h1>
      <div className="w-[100%] flex flex-col gap-[12px] ">
        <div className="flex flex-col w-[100%] gap-[8px] px-[12px] ">
          <div className="w-[100%] flex justify-between ">
            <h3 className="text-[16px] font-semibold text-[#505050] ">
              {userAchievements && (
                <>
                  {
                    userAchievements.filter(
                      (item) => item.expand.achievement_id.club_id == id
                    ).length
                  }{" "}
                  of {clubAchievements?.length}{" "}
                </>
              )}
              achievements earned
            </h3>
            <h3 className="text-[16px] font-semibold text-[#505050] ">
              {clubAchievements?.length == 0 ? (
                <>100%</>
              ) : (
                <>
                  (
                  {(userAchievements.filter(
                    (item) => item.expand.achievement_id.club_id == id
                  )?.length /
                    clubAchievements?.length) *
                    100 >
                  100
                    ? 100
                    : Math.round(
                        (userAchievements.filter(
                          (item) => item.expand.achievement_id.club_id == id
                        )?.length /
                          clubAchievements?.length) *
                          100
                      )}
                  %)
                </>
              )}
            </h3>
          </div>
          <ProgressBar
            fillWidth={
              clubAchievements?.length == 0
                ? 100
                : (userAchievements.filter(
                      (item) => item.expand.achievement_id.club_id == id
                    )?.length /
                      clubAchievements?.length) *
                      100 >
                    100
                  ? 100
                  : Math.round(
                      (userAchievements.filter(
                        (item) => item.expand.achievement_id.club_id == id
                      )?.length /
                        clubAchievements?.length) *
                        100
                    )
            }
          />
        </div>
        <div className="w-[100%] flex flex-col gap-[6px] px-[12px]  ">
          {userAchievements
            .filter((item) => item.expand.achievement_id.club_id == id)
            ?.map((item) => {
              return (
                <ClubAch
                  key={item.expand.achievement_id.id}
                  name={item.expand.achievement_id.name}
                  info={item.expand.achievement_id.description}
                  date={item.expand.achievement_id.activity}
                  progress={
                    item.recieved
                      ? 100
                      : (item.currentAmount /
                          item.expand.achievement_id.limit) *
                        100
                  }
                  id={item.expand.achievement_id.id}
                  isUser={isUser}
                  isMember={isMember}
                />
              );
            })}
          {notUserAchievements
            .filter((item) => item.expand.achievement_id.club_id == id)
            ?.map((item) => {
              return (
                <ClubAch
                  key={item.expand.achievement_id.id}
                  userId={user.id}
                  name={item.expand.achievement_id.name}
                  info={item.expand.achievement_id.description}
                  date={item.expand.achievement_id.activity}
                  progress={
                    item.recieved
                      ? 100
                      : (item.currentAmount /
                          item.expand.achievement_id.limit) *
                        100
                  }
                  id={item.expand.achievement_id.id}
                  isUser={isUser}
                  isMember={isMember}
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
            <>
              {" "}
              {activities[0] ? (
                <AchForm
                  id={id}
                  activities={activities}
                  closeModal={closeModal}
                />
              ) : (
                <h3 className="text-[16px] font-semibold text-[#505050] ">
                  No activities
                </h3>
              )}
            </>
          )}
        </Modal>
      )}
    </article>
  );
}
