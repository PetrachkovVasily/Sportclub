import React, { useEffect, useState } from "react";
import backgroundImg from "../../assets/back.png";
import ActionBtn from "../ActionBtn/ActionBtn";
import ClubLeaveJoin from "../ClubLeaveJoin/ClubLeaveJoin";
import { useUpdateClubUsersMutation } from "../../services/UserService";
import pb from "../../lib/pocketbase";

interface Props {}

function ClubHead({ club, isUser }) {
  const { record: user } = JSON.parse(localStorage.getItem("pocketbase_auth"));

  const [updateClubUsers] = useUpdateClubUsersMutation();
  const [member, setMember] = useState(findUser());

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
    createUserAchievementsFromClub(user.id, club.id);

    try {
      updateClubUsers({
        clubId: club.id,
        newUserId: user.id,
        currentUsers: club.user_id,
        isRemove: isRemove,
      });
    } catch (error) {
      console.log(error);
    }
  };

  function findUser() {
    return user.id == club?.user_id?.find((item) => item == user.id);
  }

  useEffect(() => {
    setMember(findUser());
  }, [club, user.id == club?.user_id?.find((item) => item == user.id)]);

  return (
    <section className="flex flex-col rounded-[8px] bg-white w-[100%] max-w-[880px]">
      <img
        className="w-[100%] h-[200px] "
        src={backgroundImg}
        alt="backgroundImg"
      />
      <div className="flex justify-between px-[16px] py-[12px] pt-[14px]">
        <div>
          <h1 className="text-[24px] font-semibold ">{club?.name}</h1>
          <h3 className="text-[16px] text-[#505050] ">{club?.status}</h3>
        </div>

        {club && (
          <ClubLeaveJoin
            isMember={member}
            club={club}
            handleUpdate={handleUpdate}
            setMember={setMember}
          />
        )}
      </div>
    </section>
  );
}

export default ClubHead;
