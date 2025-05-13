import React, { useState } from "react";
import NumInfo from "../NumInfo/NumInfo";
import ViewBtn from "../ViewBtn/ViewBtn";
import Achievement from "../Achievement/Achievement";
import cupImg from "../../assets/cup-svgrepo-com 1.svg";
import ProgressBar from "../ProgressBar/ProgressBar";
import AchImg from "../AchImg/AchImg";
import AchList from "../AchList/AchList";
import Modal from "../Modal/Modal";
import { Link } from "@tanstack/react-router";

interface Props {}

function Achievements({
  isClub = false,
  isModal = false,
  userAchAmount,
  clubAchAmount,
  openModal = () => {},
  clubId = null,
  userAchievements = [],
  notUserAchievements = [],
}) {
  console.log(userAchievements);

  return (
    <>
      <div className="w-[100%] flex flex-col gap-[8px] items-center">
        <div className="flex justify-center items-center rounded-[40px] w-[64px] h-[64px] border-solid border-[2px] border-[#404040]/15 ">
          <img src={cupImg} alt="cup" />
        </div>
        <NumInfo headNum={userAchievements.length} info={"Achievements"} />
        {isClub ? (
          <div className="flex flex-col gap-[4px] items-center p-[8px] w-[100%] mt-[8px]">
            <h3 className="text-[#505050] text-[14px] ">
              You have <b>{userAchievements.length}</b> of{" "}
              <b>{clubAchAmount}</b>
            </h3>{" "}
            <ProgressBar
              fillWidth={(userAchievements.length / clubAchAmount) * 100}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col px-[8px] gap-[8px] w-[100%]">
        {!!userAchAmount && (
          <div className="flex flex-col gap-[8px] w-[100%] max-w-[232px]">
            <Achievement
              name={userAchievements[0]?.expand.achievement_id.name}
              info={userAchievements[0]?.expand.achievement_id.description}
            />
          </div>
        )}
        {isModal || <AchList userAchievements={userAchievements} />}

        {isClub && !!notUserAchievements[0] ? (
          <div className="flex flex-col gap-[6px] mb-[6px]">
            <h3 className="text-[#505050] text-[14px] ">Not received</h3>
            <AchList
              isClub={isClub}
              userAchievements={notUserAchievements}
              isNot={true}
            />
          </div>
        ) : (
          <></>
        )}

        {isClub ? (
          <Link to="/club/$id/achievements" params={{ id: clubId }}>
            <ViewBtn />
          </Link>
        ) : (
          isModal || <ViewBtn onClick={openModal} />
        )}
      </div>
    </>
  );
}

export default Achievements;
