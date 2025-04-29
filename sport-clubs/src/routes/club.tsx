import { createFileRoute, Outlet } from "@tanstack/react-router";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import ContentContainer from "../components/ContentContainer/ContentContainer";
import Achievements from "../components/Achievements/Achievements";
import InfoNote from "../components/InfoNote/InfoNote";
import locationImg from "../assets/location-point-svgrepo-com 1.svg";
import workImg from "../assets/flight-takeoff-svgrepo-com 1.svg";
import membersImg from "../assets/user-group-svgrepo-com 1.svg";
import ClubHead from "../components/ClubHead/ClubHead";
import SwitchMenu from "../components/SwitchMenu/SwitchMenu";

export const Route = createFileRoute("/club")({
  component: RouteComponent,
});

function RouteComponent() {
  const menuList = [
    { name: "Rating", link: "/club/rating" },
    { name: "Schedule", link: "/club/schedule" },
    { name: "Workouts", link: "/club/workouts" },
    { name: "Achievements", link: "/club/achievements" },
  ];
  return (
    <PageWrapper>
      <article className="max-w-[880px] w-[100%] flex flex-col gap-[24px] ">
        <ClubHead />
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
          <InfoNote info="Mogilev, Belarus" src={locationImg} />
          <InfoNote info="Workout" src={workImg} />
          <InfoNote info="members" src={membersImg} num={16} />
        </section>
        <ContentContainer gap={22} pb={16}>
          <Achievements isClub={true} userAchAmount={8} clubAchAmount={16} />
        </ContentContainer>
      </article>
    </PageWrapper>
  );
}
