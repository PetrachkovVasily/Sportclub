import { createFileRoute } from "@tanstack/react-router";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import Achievement from "../../../components/Achievement/Achievement";
import Line from "../../../components/Line/Line";
import ClubAch from "../../../components/ClubAch/ClubAch";

export const Route = createFileRoute("/club/$id/achievements")({
  component: RouteComponent,
});

function RouteComponent() {
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
          <ClubAch
            name={"Qwertyuio"}
            info={"qwertyu fggg"}
            date={"29.04.2025"}
            progress={100}
          />
          <ClubAch
            name={"Qwertyuio"}
            info={"qwertyu fggg"}
            date={"29.04.2025"}
            progress={100}
          />
          <ClubAch
            name={"Qwertyuio"}
            info={"qwertyu fggg"}
            date={"29.04.2025"}
            progress={60}
          />
          <ClubAch
            name={"Qwertyuio"}
            info={"qwertyu fggg"}
            date={"29.04.2025"}
            progress={50}
          />
          <ClubAch
            name={"Qwertyuio"}
            info={"qwertyu fggg"}
            date={"29.04.2025"}
            progress={30}
          />
        </div>
        <div className="w-[100%] flex flex-col gap-[6px] px-[12px] "></div>
      </div>
    </article>
  );
}
