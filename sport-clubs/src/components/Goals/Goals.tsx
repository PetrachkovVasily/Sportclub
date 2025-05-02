import React, { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import GoalProgress from "../GoalProgress/GoalProgress";
import GoalCategory from "../GoalCategory/GoalCategory";
import ViewBtn from "../ViewBtn/ViewBtn";
import deletImg from "../../assets/delete-1-svgrepo-com 1.svg";
import Modal from "../Modal/Modal";
import GoalForm from "../GoalForm/GoalForm";

interface Props {}

function Goals({ isFull = false }) {
  const [isChanging, setIsChanging] = useState(false);
  const [openCreateGoal, setOpenCreateGoal] = useState(false);

  const closeModal = () => {
    setOpenCreateGoal(false);
  };

  const openModal = () => {
    setOpenCreateGoal(true);
  };

  return (
    <>
      <h1 className="font-semibold text-[22px] mb-">Goals</h1>
      <div className="flex flex-col w-[100%] gap-[20px]">
        <GoalCategory
          isChanging={isChanging}
          head={"Week"}
          openModal={openModal}
        >
          <div className="flex items-center gap-[12px]">
            <GoalProgress name={"Name"} progress={35} />
            {isChanging ? (
              <img className="cursor-pointer " src={deletImg} alt="delete" />
            ) : (
              <></>
            )}
          </div>
          <GoalProgress name={"Name"} progress={35} />
        </GoalCategory>
        <GoalCategory
          isChanging={isChanging}
          head={"Month"}
          openModal={openModal}
        >
          <GoalProgress name={"Name"} progress={65} />
          <GoalProgress name={"Name"} progress={25} />
        </GoalCategory>
        <GoalCategory
          isChanging={isChanging}
          head={"Year"}
          openModal={openModal}
        >
          <GoalProgress name={"Name"} progress={15} />
        </GoalCategory>
      </div>

      {isFull ? (
        <button
          className="text-[#505050] text-[14px] w-[100%] flex items-center justify-center px-[16px] rounded-[4px] bg-[#404040]/12"
          onClick={() => setIsChanging(!isChanging)}
        >
          {isChanging ? "Save goals" : "Change goals"}
        </button>
      ) : (
        <ViewBtn />
      )}

      {openCreateGoal && (
        <Modal closeModal={closeModal}>
          <GoalForm />
        </Modal>
      )}
    </>
  );
}

export default Goals;
