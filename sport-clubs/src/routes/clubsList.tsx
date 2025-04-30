import { createFileRoute } from "@tanstack/react-router";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import SearchBar from "../components/SearchBar/SearchBar";
import ClubItem from "../components/ClubItem/ClubItem";
import Line from "../components/Line/Line";

export const Route = createFileRoute("/clubsList")({
  component: RouteComponent,
});

function RouteComponent() {
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
              <ClubItem isMember={true} />
              <Line height={"1px"} maxWidth={"none"} />
              <ClubItem isMember={true} />
              <Line height={"1px"} maxWidth={"none"} />
              <ClubItem isMember={true} />
            </div>
          </div>
        </section>
        <section className="flex flex-col rounded-[8px] bg-white w-[100%] max-w-[640px] gap-[24px] px-[18px] py-[12px] pb-[18px]">
          <div className="w-full flex flex-col gap-[16px] ">
            <h1 className="text-[22px] text-[#505050] ">Other clubs:</h1>
            <div className="w-full flex flex-col gap-[4px] ">
              <ClubItem isMember={false} />
              <Line height={"1px"} maxWidth={"none"} />
              <ClubItem isMember={false} />
              <Line height={"1px"} maxWidth={"none"} />
              <ClubItem isMember={false} />
              <Line height={"1px"} maxWidth={"none"} />
              <ClubItem isMember={false} />
            </div>
          </div>
        </section>
      </article>
    </PageWrapper>
  );
}
