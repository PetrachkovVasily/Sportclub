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
}) {
  const [updateEvent] = useUpdateEventMutation();
  const { record: user } = JSON.parse(localStorage.getItem("pocketbase_auth"));

  return (
    <>
      <h3 className="text-[18px] mb-3 text-[#505050] ">
        Events of {selectedDate.format("DD MMMM YYYY")}
      </h3>

      {/* Список событий */}
      <ul className="space-y-2 mb-4">
        {(events[selectedDate.format("YYYY-MM-DD")] || []).map((ev, i) => (
          <EventItem
            i={i}
            ev={ev}
            selectedDate={selectedDate}
            updateEvent={updateEvent}
            user={user}
            isUser={isUser}
            startEditing={startEditing}
            deleteEvent={deleteEvent}
          />
        ))}
      </ul>
    </>
  );
}

export default EventList;
