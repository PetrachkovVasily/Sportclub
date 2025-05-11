import React from "react";
import { useGetWorkoutQuery } from "../../services/UserService";

interface Props {}

function Event({ hasEvent, event, moreThanOne = false }) {
  const workout = useGetWorkoutQuery(event.workout_id)?.data;

  return (
    <>
      {hasEvent && (
        <div className="absolute bottom-1 left-1 right-1 font-semibold text-[12px] bg-[#F2B749]/75 rounded px-1 truncate">
          {workout && workout.name}
          {moreThanOne && <b>{" +"}</b>}
        </div>
      )}
    </>
  );
}

export default Event;
