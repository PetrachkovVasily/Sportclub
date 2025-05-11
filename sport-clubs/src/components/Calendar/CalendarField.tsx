import React from "react";
import { useGetEventWorkoutsQuery } from "../../services/UserService";
import dayjs from "dayjs";
import Event from "./Event";

interface Props {}

function CalendarField({ day, currentDate, events, openModal }) {
  const dayStr = day.format("YYYY-MM-DD");

  const isToday = day.isSame(dayjs(), "day");
  const isCurrentMonth = day.isSame(currentDate, "month");
  const hasEvent = !!events[dayStr]?.length;

  //   const workout = useGetEventWorkoutsQuery(
  //     events[dayStr] && events[dayStr][0].id
  //   )?.data?.items;

  return (
    <div
      onClick={() => openModal(day)}
      className={`p-2 h-20 border-[1px] rounded-[4px] border-[#404040]/12 relative cursor-pointer hover:bg-[#F2B749]/12 transition ${
        !isCurrentMonth ? "text-gray-400" : ""
      } ${isToday ? "bg-[#F2B749]/24" : ""}`}
    >
      <div className="text-sm">{day.date()}</div>
      {hasEvent && (
        <Event
          hasEvent={hasEvent}
          event={events[dayStr][0]}
          moreThanOne={events[dayStr].length > 1 ? true : false}
        />
      )}
    </div>
  );
}

export default CalendarField;
