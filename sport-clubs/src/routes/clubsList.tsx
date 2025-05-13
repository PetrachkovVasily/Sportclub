import { createFileRoute } from "@tanstack/react-router";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import SearchBar from "../components/SearchBar/SearchBar";
import ClubItem from "../components/ClubItem/ClubItem";
import Line from "../components/Line/Line";
import {
  useLazyGetClubsQuery,
  useLazyGetUserClubsQuery,
  userAPI,
  useUpdateClubUsersMutation,
} from "../services/UserService";
import { useEffect, useState } from "react";
import pb from "../lib/pocketbase";

export const Route = createFileRoute("/clubsList")({
  component: RouteComponent,
});

function RouteComponent() {
  const [filters, setFilters] = useState({
    name: "",
    status: "no status",
    city: "",
    country: "",
    category: "no category",
  });

  const { record: user } = JSON.parse(localStorage.getItem("pocketbase_auth"));

  const [userTrigger, { data: userData }] = useLazyGetUserClubsQuery();
  const [trigger, { data }] = useLazyGetClubsQuery();

  const [updateClubUsers] = useUpdateClubUsersMutation();

  const handleFilter = (filters) => {
    const { name, category, status, country, city } = filters;

    trigger({ userId: user.id, name, category, status, country, city }, true);
    userTrigger(
      { userId: user.id, name, category, status, country, city },
      true
    );
  };

  // const [member, setMember] = useState(isMember);

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

  const handleUpdate = (club, isRemove = false) => {
    const { name, category, status, country, city } = filters;

    createUserAchievementsFromClub(user.id, club.id)

    try {
      updateClubUsers({
        clubId: club.id,
        newUserId: user.id,
        currentUsers: club.user_id,
        isRemove: isRemove,
      });

      trigger({
        ...{ userId: user.id, name, category, status, country, city },
      });
      userTrigger({
        ...{ userId: user.id, name, category, status, country, city },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    trigger({ userId: user.id }, true);
    userTrigger({ userId: user.id }, true);
  }, []);

  return (
    <PageWrapper>
      <article className="w-[100%] flex flex-col gap-[16px] justify-center items-center">
        <section className="flex flex-col rounded-[8px] bg-white w-[100%] max-w-[640px] gap-[24px] px-[16px] py-[12px]">
          <SearchBar
            onFilter={handleFilter}
            filters={filters}
            setFilters={setFilters}
          />
        </section>
        <section className="flex flex-col rounded-[8px] bg-white w-[100%] max-w-[640px] gap-[24px] px-[18px] py-[12px] pb-[18px]">
          <div className="w-full flex flex-col gap-[16px] ">
            <h1 className="text-[22px] text-[#505050] ">My clubs:</h1>
            <div className="w-full flex flex-col gap-[4px] ">
              {userData?.items?.map((item, index, clubs) => {
                return (
                  <div
                    key={item.id}
                    className="w-full flex flex-col gap-[4px] "
                  >
                    <ClubItem
                      isMember={true}
                      club={item}
                      handleUpdate={handleUpdate}
                    />
                    {item == clubs[clubs.length - 1] || (
                      <Line height={"1px"} maxWidth={"none"} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="flex flex-col rounded-[8px] bg-white w-[100%] max-w-[640px] gap-[24px] px-[18px] py-[12px] pb-[18px]">
          <div className="w-full flex flex-col gap-[16px] ">
            <h1 className="text-[22px] text-[#505050] ">Other clubs:</h1>
            <div className="w-full flex flex-col gap-[4px] ">
              {data?.items?.map((item, index, clubs) => {
                return (
                  <div
                    key={item.id}
                    className="w-full flex flex-col gap-[4px] "
                  >
                    <ClubItem
                      isMember={false}
                      club={item}
                      handleUpdate={handleUpdate}
                    />
                    {item == clubs[clubs.length - 1] || (
                      <Line height={"1px"} maxWidth={"none"} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </article>
    </PageWrapper>
  );
}
