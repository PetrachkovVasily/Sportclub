import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Activity from "../Activity/Activity";
import { Checkbox } from "flowbite-react";
import Approach from "../Approach/Approach";

interface Props {}

function ActivityAccordion({ workoutActivity, workoutValue, setWorkoutValue }) {
  const [hideControl, setHideControl] = useState("hidden");
  const [approachesA, setAppr] = useState(0);

  // useEffect(() => {
  //   for (let i = 0; i < workoutActivity.approaches; i++) {
  //     setAppr([
  //       ...approachesA,
  //       { workoutActivity: workoutActivity.id, amount: 0 },
  //     ]);
  //   }
  // }, []);

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
          <span>{workoutActivity.activity}</span>
          <div className="flex gap-[12px] items-center ">
            <h3 className="text-[#505050] text-[14px] ">
              approaches{" "}
              <b>
                {approachesA}/{workoutActivity.approaches}
              </b>
            </h3>
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
          </div>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className={hideControl}
        aria-labelledby="accordion-collapse-heading-1"
      >
        {(() => {
          const approaches = [];
          for (let i = 0; i < workoutActivity.approaches; i++) {
            approaches.push(workoutActivity);
          }
          return approaches.map((item, i) => {
            return (
              <Approach
                workoutActivity={item}
                workoutValue={workoutValue}
                setWorkoutValue={setWorkoutValue}
                num={i + 1}
                setAppr={setAppr}
                approaches={approachesA}
              />
            );
          });
        })()}
      </div>
    </div>
  );
}

export default ActivityAccordion;
