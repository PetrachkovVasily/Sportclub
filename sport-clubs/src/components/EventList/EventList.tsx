import React from "react";

interface Props {}

function EventList({
  selectedDate,
  events,
  startEditing,
  deleteEvent,
  isUser = true,
}) {
  return (
    <>
      <h3 className="text-[18px] mb-3 text-[#505050] ">
        Events of {selectedDate.format("DD MMMM YYYY")}
      </h3>

      {/* Список событий */}
      <ul className="space-y-2 mb-4">
        {(events[selectedDate.format("YYYY-MM-DD")] || []).map((ev, i) => (
          <li
            key={i}
            className="bg-gray-100/90 px-2 py-2 rounded text-[12px] flex flex-col gap-[8px]"
          >
            <div className="font-medium">{ev.title}</div>
            <div className="text-[#505050] font-semibold">📍 {ev.location}</div>
            <div className="text-[#505050] font-semibold">
              🕓 {ev.startTime} – {ev.endTime}
            </div>
            <div className="flex justify-end gap-2 mt-1">
              {isUser ? (
                <></>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(i, ev)}
                    className="text-[#F2B749] font-semibold text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEvent(i)}
                    className="text-red-600 font-semibold text-xs"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventList;
