import { createFileRoute } from "@tanstack/react-router";
import Accordion from "../../../components/Accordion/Accordion";
import addBtn from "../../../assets/add-svgrepo-com 1.svg";
import deleteBtn from "../../../assets/delete-1-svgrepo-com 1.svg";

export const Route = createFileRoute("/club/$id/workouts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <article className="w-[100%] flex flex-col gap-[22px]">
      <div className="w-[100%] flex flex-col gap-[12px]">
        <h1 className="text-[22px] font-normal text-[#505050] ">Workouts:</h1>
        <div className="flex flex-col w-[100%] gap-[8px] px-[8px] ">
          <Accordion />
          <button className="mt-[4px] w-fit pl-[10px] pr-[4px] py-[2px] bg-white rounded-2xl border-[2px] border-[#404040]/12 flex">
            Add
            <img src={addBtn} alt="" />
          </button>
        </div>
      </div>

      <div className="w-[100%] flex flex-col gap-[12px] px-[8px] ">
        <h2 className="text-[18px] font-normal text-[#505050] ">Activities:</h2>
        <ul className="space-y-1 text-[#505050] list-disc list-inside marker:m-[2px] flex flex-col gap-[4px]">
          <li className="font-semibold marker:m-[2px] m-0 flex items-center gap-[24px] rounded-[4px] border-[2px] border-[#404040]/12 w-fit px-[6px] py-[2px] ">
            Pushups
            <button>
              <img className="w-[22px] " src={deleteBtn} alt="" />
            </button>
          </li>
        </ul>
        <button className="mt-[4px] w-fit pl-[10px] pr-[4px] py-[2px] bg-white rounded-2xl border-[2px] border-[#404040]/12 flex">
          Add
          <img src={addBtn} alt="" />
        </button>
      </div>
    </article>
  );
}
