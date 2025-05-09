import { createFileRoute } from "@tanstack/react-router";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import SearchBar from "../components/SearchBar/SearchBar";
import ClubItem from "../components/ClubItem/ClubItem";
import Line from "../components/Line/Line";
import { userAPI } from "../services/UserService";

export const Route = createFileRoute("/clubsList")({
  component: RouteComponent,
});

function RouteComponent() {
  const { record: user } = JSON.parse(localStorage.getItem("pocketbase_auth"));

  const userClubs = userAPI.useGetUserClubsQuery(user.id)?.data?.items;
  const allClubs = userAPI.useGetAllClubsQuery(user.id)?.data?.items;

  const handleFilter = (filters) => {
    console.log("Применённые фильтры:", filters);
    // Здесь можно фильтровать список событий или запросить с сервера
  };

  return (
    <PageWrapper>
      <article className="w-[100%] flex flex-col gap-[16px] justify-center items-center">
        <section className="flex flex-col rounded-[8px] bg-white w-[100%] max-w-[640px] gap-[24px] px-[16px] py-[12px]">
          <SearchBar onFilter={handleFilter} />
        </section>
        <section className="flex flex-col rounded-[8px] bg-white w-[100%] max-w-[640px] gap-[24px] px-[18px] py-[12px] pb-[18px]">
          <div className="w-full flex flex-col gap-[16px] ">
            <h1 className="text-[22px] text-[#505050] ">My clubs:</h1>
            <div className="w-full flex flex-col gap-[4px] ">
              {userClubs?.map((item, index, clubs) => {
                return (
                  <div
                    key={item.id}
                    className="w-full flex flex-col gap-[4px] "
                  >
                    <ClubItem isMember={true} club={item} />
                    {item == clubs[clubs.length - 1] || (
                      <Line height={"1px"} maxWidth={"none"} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="flex flex-col rounded-[8px] bg-white w-[100%] max-w-[640px] gap-[24px] px-[18px] py-[12px] pb-[18px]">
          <div className="w-full flex flex-col gap-[16px] ">
            <h1 className="text-[22px] text-[#505050] ">Other clubs:</h1>
            <div className="w-full flex flex-col gap-[4px] ">
              {allClubs?.map((item, index, clubs) => {
                return (
                  <div
                    key={item.id}
                    className="w-full flex flex-col gap-[4px] "
                  >
                    <ClubItem isMember={false} club={item} />
                    {item == clubs[clubs.length - 1] || (
                      <Line height={"1px"} maxWidth={"none"} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </article>
    </PageWrapper>
  );
}
