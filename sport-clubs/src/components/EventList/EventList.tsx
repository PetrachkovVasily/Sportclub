import dayjs from "dayjs";
import React, { useState } from "react";
import { useUpdateEventMutation } from "../../services/UserService";
import EventItem from "./EventItem";

interface Props {}

function EventList({
  selectedDate,
  events,
  startEditing,
  deleteEvent,
  isUser = true,
  isMember = false,
  isMain = false,
}) {
  const [updateEvent] = useUpdateEventMutation();
  const { record: user } = JSON.parse(localStorage.getItem("pocketbase_auth"));

  const sortClubs = (members) => {
    const grouped = members.reduce((acc, member) => {
      if (!acc[member.club_id]) {
        acc[member.club_id] = [];
      }
      acc[member.club_id].push(member);
      return acc;
    }, {});
  };

  // if (events) {
  //   console.log(sortClubs(events));
  // }

  return (
    <>
      <h3 className="text-[18px] mb-3 text-[#505050] ">
        Events of {selectedDate.format("DD MMMM YYYY")}
      </h3>

      {/* Список событий */}
      <ul className="space-y-2 mb-4 w-full">
        {(events[selectedDate.format("YYYY-MM-DD")] || [])
          .sort((a, b) => (a.club_id > b.club_id ? 1 : -1))
          .map((ev, i) => (
            <>
              {/* {ev.club_id} */}
              <EventItem
                i={i}
                ev={ev}
                selectedDate={selectedDate}
                updateEvent={updateEvent}
                user={user}
                isUser={isUser}
                startEditing={startEditing}
                deleteEvent={deleteEvent}
                isMember={isMain ? isMain : isMember}
              />
            </>
          ))}
      </ul>
    </>
  );
}

export default EventList;
