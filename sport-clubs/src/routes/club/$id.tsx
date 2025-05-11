import { createFileRoute, Outlet } from "@tanstack/react-router";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import Achievements from "../../components/Achievements/Achievements";
import InfoNote from "../../components/InfoNote/InfoNote";
import locationImg from "../../assets/location-point-svgrepo-com 1.svg";
import workImg from "../../assets/flight-takeoff-svgrepo-com 1.svg";
import membersImg from "../../assets/user-group-svgrepo-com 1.svg";
import ClubHead from "../../components/ClubHead/ClubHead";
import SwitchMenu from "../../components/SwitchMenu/SwitchMenu";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import { useGetSingleClubQuery } from "../../services/UserService";

export const Route = createFileRoute("/club/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const menuList = [
    { name: "Rating", link: "/club/$id/rating", id: id },
    { name: "Schedule", link: "/club/$id/schedule", id: id },
    { name: "Workouts", link: "/club/$id/workouts", id: id },
    { name: "Achievements", link: "/club/$id/achievements", id: id },
  ];

  const club = useGetSingleClubQuery(id)?.data;

  return (
    <PageWrapper>
      <article className="max-w-[880px] w-[100%] flex flex-col gap-[24px] ">
        <ClubHead club={club} />
        <div className="w-[100%] max-w-[880px]">
          <SwitchMenu menuList={menuList} />
          <section className="flex flex-col rounded-b-[8px] bg-white w-[100%] max-w-[880px] gap-[24px] p-[16px] py-[24px]">
            <Outlet />
          </section>
        </div>
      </article>
      <article className="max-w-[280px] w-[19vw] flex flex-col gap-[24px] ">
        <section
          className={`flex flex-col items-start gap-[8px] p-[24px] rounded-[8px] bg-white w-[19vw] max-w-[280px]`}
        >
          <InfoNote
            info={club?.country + ", " + club?.city}
            src={locationImg}
          />
          <InfoNote info={club?.category} src={workImg} />
          <InfoNote
            info={"members"}
            src={membersImg}
            num={club?.user_id.length}
          />
        </section>
        <ContentContainer gap={22} pb={16}>
          <Achievements
            isClub={true}
            userAchAmount={8}
            clubAchAmount={16}
            clubId={club?.id}
          />
        </ContentContainer>
      </article>
    </PageWrapper>
  );
}
