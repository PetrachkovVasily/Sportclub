import React from "react";
import Achievement from "../Achievement/Achievement";
import deleteBtn from "../../assets/delete-1-svgrepo-com 1.svg";
import { useDeleteClubAchievementMutation } from "../../services/UserService";
import pb from "../../lib/pocketbase";

interface Props {}

function ClubAch({
  name,
  info,
  date,
  progress = 0,
  id,
  isUser = true,
  userId,
  isMember,
}) {
  const [deleteAchievement] = useDeleteClubAchievementMutation();

  async function deleteUserAchievementByUserAndClubAchievement(
    userId,
    clubAchievementId
  ) {
    try {
      // Получаем все UserAchievement с указанным user_id и clubAchievement_id
      const userAchievements = await pb
        .collection("userAchievement")
        .getFullList({
          filter: `user_id = "${userId}" && achievement_id = "${clubAchievementId}"`,
          perPage: 500,
        });

      if (userAchievements.length === 0) {
        console.log("Не найдено соответствующих пользовательских достижений.");
        return;
      }

      // Удаляем все найденные записи (на случай, если их несколько)
      for (const achievement of userAchievements) {
        await pb.collection("userAchievement").delete(achievement.id);
        console.log(`Удалено пользовательское достижение: ${achievement.id}`);
      }

      console.log(
        "Все соответствующие пользовательские достижения удалены успешно."
      );
    } catch (error) {
      console.error("Ошибка при удалении пользовательского достижения:", error);
    }
  }

  const handleDelete = () => {
    deleteUserAchievementByUserAndClubAchievement(userId, id);
    deleteAchievement(id);
  };

  console.log(isUser, isMember);

  return (
    <div className="w-full flex items-center gap-[16px] ">
      <div
        className="relative w-[100%] p-[8px] px-0 flex items-center justify-between rounded-[4px] border-[2px] border-[#F2B749]/12 "
        // style={{
        //   filter: `grayscale(${progress < 100 ? 100 : 0}%)`,
        // }}
      >
        <div
          style={{
            width: progress + "%",
          }}
          className="h-[100%] absolute bg-[#F2B749]/12 "
        ></div>
        <div className="pl-[8px]">
          <Achievement name={name} info={info} />
        </div>
        <h3 className="text-[12px] font-semibold text-[#505050] pr-[8px] ">
          {date}
        </h3>
      </div>
      {isUser || (
        <>
          {!isMember || (
            <button onClick={handleDelete}>
              <img className="w-[22px] " src={deleteBtn} alt="" />
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default ClubAch;
