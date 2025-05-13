import React, { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import GoalProgress from "../GoalProgress/GoalProgress";
import GoalCategory from "../GoalCategory/GoalCategory";
import ViewBtn from "../ViewBtn/ViewBtn";
import deletImg from "../../assets/delete-1-svgrepo-com 1.svg";
import Modal from "../Modal/Modal";
import GoalForm from "../GoalForm/GoalForm";
import { Link } from "@tanstack/react-router";
import { userAPI } from "../../services/UserService";

interface Props {}

function Goals({ userId, isFull = false }) {
  const { refetch } = userAPI.useGetUserWeekGoalsQuery(userId);
  const weekGoals = userAPI.useGetUserWeekGoalsQuery(userId)?.data?.items;
  const monthGoals = userAPI.useGetUserMonthGoalsQuery(userId)?.data?.items;
  const yearGoals = userAPI.useGetUserYearGoalsQuery(userId)?.data?.items;
  const [deleteGoal] = userAPI.useDeleteGoalMutation();

  const [isChanging, setIsChanging] = useState(false);
  const [openCreateGoal, setOpenCreateGoal] = useState(false);

  const closeModal = () => {
    setOpenCreateGoal(false);
  };

  const openModal = () => {
    setOpenCreateGoal(true);
  };

  const handleDelete = async (goalId: string) => {
    try {
      await deleteGoal(goalId);
      console.log("Пост удалён!");
    } catch (err) {
      console.error("Ошибка при удалении:", err.data);
    }
  };

  const [type, setType] = useState("");

  return (
    <>
      <h1 className="font-semibold text-[22px] mb-">Goals</h1>
      <div className="flex flex-col w-[100%] gap-[20px]">
        {(!!weekGoals?.length || isFull) && (
          <GoalCategory
            isChanging={isChanging}
            head={"Week"}
            openModal={openModal}
            setType={setType}
          >
            {weekGoals?.length ? (
              weekGoals?.map((goal, index) => {
                if ((index < 3 && !isFull) || isFull) {
                  return (
                    <div key={goal.id} className="flex items-center gap-[12px]">
                      <GoalProgress
                        name={goal.activity_name}
                        progress={goal.currentAmount}
                        limit={goal.limit}
                      />
                      {isChanging ? (
                        <img
                          className="cursor-pointer "
                          src={deletImg}
                          alt="delete"
                          onClick={() => {
                            handleDelete(goal.id);
                          }}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                } else return <></>;
              })
            ) : (
              <h3 className="ml-[12px] text-[14px] text-[#505050]">
                No week goals
              </h3>
            )}
          </GoalCategory>
        )}
        {(!!monthGoals?.length || isFull) && (
          <GoalCategory
            isChanging={isChanging}
            head={"Month"}
            openModal={openModal}
            setType={setType}
          >
            {monthGoals?.length ? (
              monthGoals?.map((goal, index) => {
                if ((index < 3 && !isFull) || isFull) {
                  return (
                    <div key={goal.id} className="flex items-center gap-[12px]">
                      <GoalProgress
                        name={goal.activity_name}
                        progress={goal.currentAmount}
                        limit={goal.limit}
                      />
                      {isChanging ? (
                        <img
                          className="cursor-pointer "
                          src={deletImg}
                          alt="delete"
                          onClick={() => {
                            handleDelete(goal.id);
                          }}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                } else return <></>;
              })
            ) : (
              <h3 className="ml-[12px] text-[14px] text-[#505050]">
                No month goals
              </h3>
            )}
          </GoalCategory>
        )}
        {(!!yearGoals?.length || isFull) && (
          <GoalCategory
            isChanging={isChanging}
            head={"Year"}
            openModal={openModal}
            setType={setType}
          >
            {yearGoals?.length ? (
              yearGoals?.map((goal, index) => {
                if ((index < 3 && !isFull) || isFull) {
                  return (
                    <div key={goal.id} className="flex items-center gap-[12px]">
                      <GoalProgress
                        name={goal.activity_name}
                        progress={goal.currentAmount}
                        limit={goal.limit}
                      />
                      {isChanging ? (
                        <img
                          className="cursor-pointer "
                          src={deletImg}
                          alt="delete"
                          onClick={() => {
                            handleDelete(goal.id);
                          }}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                } else return <></>;
              })
            ) : (
              <h3 className="ml-[12px] text-[14px] text-[#505050]">
                No year goals
              </h3>
            )}
          </GoalCategory>
        )}
      </div>

      {isFull ? (
        <button
          className="text-[#505050] text-[14px] w-[100%] flex items-center justify-center px-[16px] rounded-[4px] bg-[#404040]/12"
          onClick={() => setIsChanging(!isChanging)}
        >
          {isChanging ? "Save goals" : "Change goals"}
        </button>
      ) : (
        <Link className="w-full" to="/profile/$id/goals" params={userId}>
          <ViewBtn
            onClick={() => {
              window.scroll(0, 0);
            }}
          />
        </Link>
      )}

      {openCreateGoal && (
        <Modal closeModal={closeModal}>
          <GoalForm userId={userId} type={type} closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default Goals;
