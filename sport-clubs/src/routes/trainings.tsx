import { createFileRoute } from "@tanstack/react-router";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import profileImg from "../assets/profileImg.png";
import Line from "../components/Line/Line";
import ActivityAccordion from "../components/ActivityAccordion/ActivityAccordion";
import inProgress from "../assets/history-svgrepo-com 1.svg";

export const Route = createFileRoute("/trainings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageWrapper>
      <article className="w-[100%] flex flex-col gap-[16px] justify-center items-center">
        <section className="flex flex-col rounded-[8px] bg-white w-[100%] max-w-[640px] gap-[24px] px-[16px] py-[16px]">
          <div className="w-full flex items-center flex-col gap-[16px] ">
            <div className="flex flex-col items-center gap-[4px] ">
              <img className="w-[60px] " src={profileImg} alt="" />
              <h1 className="text-[22px] text-[#505050] ">Club name</h1>
            </div>
            <Line height={"1px"} />
            <div className="w-full items-center flex flex-col gap-[18px] ">
              <h1 className="text-[18px] font-semibold text-[#505050] ">
                Workout name
              </h1>

              <div className="w-full flex flex-col gap-[16px] ">
                <ActivityAccordion />
                <ActivityAccordion />
                <ActivityAccordion />
              </div>
            </div>
            <div className="flex flex-col items-center p-[4px] ">
              <img className="w-[38px]" src={inProgress} alt="" />
              <h2 className="text-[18px] text-[#505050]">In progress</h2>
            </div>
          </div>
        </section>
      </article>
    </PageWrapper>
  );
}
