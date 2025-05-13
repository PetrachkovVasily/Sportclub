import React, { useEffect, useState } from "react";
import profileImg from "../../assets/profileImg.png";
import inProgress from "../../assets/history-svgrepo-com 1.svg";
import Line from "../Line/Line";
import ActivityAccordion from "../ActivityAccordion/ActivityAccordion";
import {
  useAddUserEventMutation,
  useCreateEventAndActivityMutation,
  useGetUserEventsQuery,
  useGetWorkoutActivitiesQuery,
} from "../../services/UserService";
import pb from "../../lib/pocketbase";

interface Props {}

function WorkoutBlock({ event, user }) {
  const workoutActivities = useGetWorkoutActivitiesQuery(event.workout_id)?.data
    ?.items;

  const [workoutValue, setWorkoutValue] = useState([]);

  const userEvent = useGetUserEventsQuery({
    userId: user.id,
    eventId: event.id,
  })?.data?.items[0];

  //   console.log(userEvent);

  const [isFin, setIsFin] = useState(false);
  console.log(isFin);

  useEffect(() => {
    if (userEvent) {
      if (userEvent.isFinished) {
        setIsFin(true);
      }
    }
  }, [userEvent]);

  const [addUserEventAndActivity] = useCreateEventAndActivityMutation();

  useEffect(() => {
    if (workoutActivities) {
      //   setWorkoutValue([...workoutValue, { activity: "activity", amount: 250 }]);
      setWorkoutValue(
        workoutActivities.map((item) => {
          return { activity: item.activity, amount: 0 };
        })
      );
    }
  }, [workoutActivities]);

  async function handleCount() {
    const result = workoutValue.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.activity == item.activity)
    );

    result.forEach((item) => {
      incrementUserAchievementsByClubAct(user.id, item.activity, item.amount);
    });

    result.forEach((item) => {
      incrementUserGoalsAmountByAct(user.id, item.activity, item.amount);
    });

    const time1 = new Date(`1970-01-01T${event.startTime}:00`);
    const time2 = new Date(`1970-01-01T${event.endTime}:00`);

    // Вычисление разницы в миллисекундах
    const timeDifferenceMs = time2 - time1;

    const myResult = await addUserEventAndActivity({
      userId: user.id,
      eventData: {
        event_id: event.id,
        user_id: user.id,
        time: timeDifferenceMs,
        isFinished: true,
      },
      activityData: result,
    }).unwrap();
  }

  async function incrementUserAchievementsByClubAct(
    userId,
    actValue,
    incrementAmount
  ) {
    try {
      // 1. Получить все пользовательские достижения с expand clubAchievement
      const userAchievements = await pb
        .collection("userAchievement")
        .getFullList({
          filter: `user_id = "${userId}"`,
          expand: "achievement_id",
          perPage: 500,
        });

      // 2. Фильтрация по clubAchievement.act === actValue
      const filteredAchievements = userAchievements.filter(
        (ua) => ua.expand?.achievement_id?.activity === actValue
      );

      if (filteredAchievements.length === 0) {
        console.log("Нет достижений для обновления");
        return [];
      }

      // 3. Обновление currentAmount и установка received при достижении лимита
      const updatedAchievements = await Promise.all(
        filteredAchievements.map((ua) => {
          const clubAchievement = ua.expand.achievement_id;
          const currentAmount = ua.currentAmount || 0;
          const newAmount = currentAmount + incrementAmount;
          const limit = clubAchievement?.limit || Infinity;

          const isReceived = newAmount >= limit;

          console.log(isReceived);
          return pb.collection("userAchievement").update(ua.id, {
            currentAmount: newAmount,
            recieved: isReceived,
          });
        })
      );

      console.log(
        "Обновленные пользовательские достижения:",
        updatedAchievements
      );
      return updatedAchievements;
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
      throw error;
    }
  }

  async function incrementUserGoalsAmountByAct(
    userId,
    activityValue,
    incrementAmount
  ) {
    try {
      // 1. Получить цели с нужным act
      const goals = await pb.collection("goal").getFullList({
        filter: `user_id = "${userId}" && activity_name = "${activityValue}"`,
      });

      if (goals.length === 0) {
        console.log("Нет целей для обновления");
        return [];
      }

      // 2. Обновить amount каждой цели
      const updatedGoals = await Promise.all(
        goals.map((goal) => {
          const newAmount = (goal.currentAmount || 0) + incrementAmount;
          return pb.collection("goal").update(goal.id, {
            currentAmount: newAmount > goal.limit ? goal.limit : newAmount,
          });
        })
      );

      console.log("Цели успешно обновлены:", updatedGoals);
      return updatedGoals;
    } catch (error) {
      console.error("Ошибка при обновлении целей:", error);
      throw error;
    }
  }

  //   console.log(event.startTime, event.endTime);

  // Создание объектов времени для начала и конца интервала
  const now = new Date();

  // Извлечение часов и минут из текущего времени
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  // Создание объектов времени для начала и конца интервала
  const startTime = new Date();
  startTime.setHours(
    event.startTime.split(":")[0],
    event.startTime.split(":")[1],
    0,
    0
  );

  const endTime = new Date();
  endTime.setHours(
    event.endTime.split(":")[0],
    event.endTime.split(":")[1],
    0,
    0
  );

  // Создание объекта времени для текущего времени
  const currentTime = new Date();
  currentTime.setHours(currentHours, currentMinutes, 0, 0);

  // Проверка, вписывается ли текущее время в заданные рамки
  const isWithinRange = currentTime >= startTime && currentTime <= endTime;

  return (
    <section className="flex flex-col rounded-[8px] bg-white w-[100%] max-w-[640px] gap-[24px] px-[16px] py-[16px]">
      <div className="w-full flex items-center flex-col gap-[16px] ">
        <div className="flex flex-col items-center gap-[4px] ">
          <img className="w-[60px] " src={profileImg} alt="" />
          <h1 className="text-[22px] font-normal text-[#505050] ">
            {event.expand.club_id.name}
          </h1>
          <h3 className="text-[14px] font-semibold text-[#505050] ">
            {event.startTime}-{event.endTime}
          </h3>
        </div>

        {isWithinRange && (
          <>
            <Line height={"1px"} />
            {isFin ? (
              <h1>Finished</h1>
            ) : (
              <>
                <div className="w-full items-center flex flex-col gap-[18px] ">
                  <h1 className="text-[18px] font-semibold text-[#505050] ">
                    {event.expand.workout_id.name}
                  </h1>
                  <div className="w-full flex flex-col gap-[16px] ">
                    {workoutActivities?.map((item) => {
                      return (
                        <ActivityAccordion
                          key={item.id}
                          workoutActivity={item}
                          workoutValue={workoutValue}
                          setWorkoutValue={setWorkoutValue}
                        />
                      );
                    })}
                  </div>
                </div>
                <div
                  onClick={handleCount}
                  className="flex flex-col items-center p-[4px] cursor-pointer "
                >
                  <img className="w-[38px]" src={inProgress} alt="" />
                  <h2 className="text-[18px] font-semibold text-[#F2B749]">
                    Finish
                  </h2>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default WorkoutBlock;
