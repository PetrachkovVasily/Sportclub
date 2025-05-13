import React, { useEffect, useRef, useState } from "react";
import addBtn from "../../assets/add-svgrepo-com 1.svg";
import Activity from "../Activity/Activity";
import Dropdown from "../Dropdown/Dropdown";
import {
  useAddWorkoutActivityMutation,
  useDeleteWorkoutMutation,
  useGetClubWorkoutsQuery,
  useGetWorkoutActivitiesQuery,
  useGetWorkoutActivityQuery,
} from "../../services/UserService";
import AccordionItem from "../AccordionItem/AccordionItem";
import menuImg from "../../assets/menu-vertical-svgrepo-com 1.svg";

interface Props {}

function Accordion({ activities, workout }) {
  const [hideControl, setHideControl] = useState("hidden");

  const workoutActivities = useGetWorkoutActivitiesQuery(workout.id)?.data
    ?.items;
  const [addWorkoutActivity] = useAddWorkoutActivityMutation();
  const [deleteWorkout] = useDeleteWorkoutMutation();
  // const workoutActivity = useGetWorkoutActivityQuery(workout.id);
  const handleAdd = () => {
    addWorkoutActivity({
      activity: activities[0] ? activities[0].name : "",
      amount: 0,
      approaches: 0,
      workout_id: workout.id,
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div id="accordion-collapse" data-accordion="collapse" className="w-[100%]">
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full px-[12px] pr-0 py-[8px] font-medium rtl:text-right text-[#505050] border-[2px] border-[#404040]/12 rounded-[4px] gap-3"
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded="true"
          aria-controls="accordion-collapse-body-1"
          onClick={() => {
            setHideControl(hideControl == "" ? "hidden" : "");
          }}
        >
          <span>{workout.name}</span>
          <div className="flex items-center gap-[4px] ">
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

            <div
              ref={dropdownRef}
              style={{ position: "relative", display: "inline-block" }}
            >
              <button onClick={toggleDropdown} className="px-[6px] h-[18px]">
                <img className="w-[24px] h-[24px]" src={menuImg} alt="" />
              </button>
              {isOpen && (
                <div
                  className=" flex flex-col gap-[8px] rounded-[4px] shadow-lg border-[2px] border-[#404040]/18 bg-white  absolute p-[6px] z-25"
                  style={{
                    top: "100%",
                    left: 0,
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                      deleteWorkout(workout.id);
                    }}
                    className="w-[96px] px-[8px] py-[2px] rounded-[4px] font-bold bg-white border-[2px] border-red-700 hover:bg-red-700 text-[12px]"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className={hideControl}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="py-[8px] px-[16px] rounded-b-[4px] bg-[#404040]/6 flex flex-col items-center gap-[8px] w-[100%] ">
          {activities[0] ? (
            <>
              {workoutActivities?.map((item) => {
                return (
                  <AccordionItem
                    activities={activities}
                    workoutActivity={item}
                    key={item.id}
                  />
                );
              })}

              <button
                onClick={handleAdd}
                className="mt-[4px] bg-white rounded-2xl "
              >
                <img src={addBtn} alt="" />
              </button>
            </>
          ) : (
            <h3 className="text-[14px] font-normal text-[#505050] ">
              No activities
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
