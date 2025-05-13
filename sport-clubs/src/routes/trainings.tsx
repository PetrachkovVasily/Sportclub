import { createFileRoute } from "@tanstack/react-router";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import profileImg from "../assets/profileImg.png";
import Line from "../components/Line/Line";
import ActivityAccordion from "../components/ActivityAccordion/ActivityAccordion";
import inProgress from "../assets/history-svgrepo-com 1.svg";
import {
  useGetEventsForUserClubsQuery,
  useGetEventsForUserClubsTodayQuery,
  useGetEventsQuery,
  useGetUserClubsForEventsQuery,
} from "../services/UserService";
import WorkoutBlock from "../components/WorkoutBlock/WorkoutBlock";

export const Route = createFileRoute("/trainings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { record: user } = JSON.parse(localStorage.getItem("pocketbase_auth"));

  const clubs = useGetUserClubsForEventsQuery({ userId: user.id })?.data?.items;
  const myEvents =
    useGetEventsForUserClubsTodayQuery(user.id)?.data?.items || [];

  return (
    <PageWrapper>
      <article className="w-[100%] flex flex-col gap-[16px] justify-center items-center">
        {!!myEvents || (
          <>
            <section className="flex flex-col rounded-[8px] bg-white w-[100%] max-w-[640px] gap-[24px] px-[16px] py-[16px]">
              <div className="w-full flex items-center flex-col gap-[16px] ">
                <div className="flex flex-col items-center gap-[4px] ">
                  <h1 className="text-[22px] font-normal text-[#505050] ">
                    No workouts fo today :{"("}
                  </h1>
                </div>
              </div>
            </section>
          </>
        )}

        {myEvents?.map((item) => {
          return <WorkoutBlock key={item.id} event={item} user={user} />;
        })}
      </article>
    </PageWrapper>
  );
}
