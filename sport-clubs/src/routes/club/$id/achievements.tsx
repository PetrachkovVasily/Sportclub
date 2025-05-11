import { createFileRoute } from "@tanstack/react-router";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import Achievement from "../../../components/Achievement/Achievement";
import Line from "../../../components/Line/Line";
import ClubAch from "../../../components/ClubAch/ClubAch";
import addBtn from "../../../assets/add-svgrepo-com 1.svg";
import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import AchForm from "../../../components/AchForm/AchForm";
import {
  useGetClubAchievementsQuery,
  useGetClubActivitiesQuery,
} from "../../../services/UserService";

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

  return (
    <article className="w-[100%] flex flex-col gap-[12px]">
      <h1 className="text-[22px] font-normal text-[#505050] ">Achiviements:</h1>
      <div className="w-[100%] flex flex-col gap-[12px] ">
        <div className="flex flex-col w-[100%] gap-[8px] px-[12px] ">
          <div className="w-[100%] flex justify-between ">
            <h3 className="text-[16px] font-semibold text-[#505050] ">
              8 of 16 achievements earned
            </h3>
            <h3 className="text-[16px] font-semibold text-[#505050] ">(50%)</h3>
          </div>
          <ProgressBar fillWidth={50} />
        </div>
        <div className="w-[100%] flex flex-col gap-[6px] px-[12px]  ">
          {achievements?.map((item) => {
            return (
              <ClubAch
                key={item.id}
                name={item.name}
                info={item.description}
                date={item.activity}
                progress={50}
                id={item.id}
              />
            );
          })}
        </div>
        <div className="w-full flex justify-center mt-[4px]">
          <button
            onClick={openModal}
            className="mt-[4px] bg-white rounded-2xl border-[2px] border-[#505050]/18 "
          >
            <img src={addBtn} alt="" />
          </button>
        </div>
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
