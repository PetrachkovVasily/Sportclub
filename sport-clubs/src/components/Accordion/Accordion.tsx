import React, { useState } from "react";
import addBtn from "../../assets/add-svgrepo-com 1.svg";
import Activity from "../Activity/Activity";
import Dropdown from "../Dropdown/Dropdown";
import {
  useGetActivityQuery,
  useGetClubWorkoutsQuery,
  useGetWorkoutActivitiesQuery,
  useGetWorkoutActivityQuery,
} from "../../services/UserService";
import AccordionItem from "../AccordionItem/AccordionItem";

interface Props {}

function Accordion({ activities, workout }) {
  const [hideControl, setHideControl] = useState("hidden");

  const workoutActivities = useGetWorkoutActivitiesQuery(workout.id)?.data
    ?.items;
  // const workoutActivity = useGetWorkoutActivityQuery(workout.id);

  return (
    <div id="accordion-collapse" data-accordion="collapse" className="w-[100%]">
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full px-[12px] py-[8px] font-medium rtl:text-right text-[#505050] border-[2px] border-[#404040]/12 rounded-[4px] gap-3"
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded="true"
          aria-controls="accordion-collapse-body-1"
          onClick={() => {
            setHideControl(hideControl == "" ? "hidden" : "");
          }}
        >
          <span>{workout.name}</span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            style={{
              rotate: hideControl == "" ? "180deg" : "0deg",
            }}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className={hideControl}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="py-[8px] px-[16px] rounded-b-[4px] bg-[#404040]/6 flex flex-col items-center gap-[8px] w-[100%] ">
          {workoutActivities?.map((item) => {
            return <AccordionItem activities={activities} workoutActivity={item}/>;
          })}

          <button className="mt-[4px] bg-white rounded-2xl ">
            <img src={addBtn} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
