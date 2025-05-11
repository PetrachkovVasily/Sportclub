import dayjs from "dayjs";
import React, { useState } from "react";
import editBtn from "../../assets/edit-2-svgrepo-com 1.svg";

interface Props {}

function EventItem({
  i,
  ev,
  selectedDate,
  updateEvent,
  user,
  isUser,
  startEditing,
  deleteEvent,
}) {
  const [isSigned, setIsSigned] = useState(
    ev.expand.user_id?.indexOf(user.id) == -1
  );

  return (
    <li
      key={i}
      className="bg-gray-100/90 px-2 py-2 rounded text-[12px] flex flex-col gap-[8px]"
    >
      <div className="font-medium">{ev.expand.workout_id.name}</div>
      <div className="text-[#505050] font-semibold">📍 {ev.location}</div>
      <div className="text-[#505050] font-semibold">
        🕓 {ev.startTime} – {ev.endTime}
      </div>

      <div className="flex justify-end gap-2 mt-1">
        <div className="w-full flex ">
          <h3 className="font-semibold mr-[2px] text-[12px]">{`(${ev.expand.user_id?.length || 0})`}</h3>
          {selectedDate.isBefore(dayjs().startOf("day")) || (
            <button
              onClick={() => {
                if (ev.expand.user_id?.indexOf(user.id) !== -1) {
                  updateEvent({ ...ev, user_id: [...ev.user_id, user.id] });
                } else {
                  updateEvent({
                    ...ev,
                    user_id: ev.user_id.filter((id) => id !== user.id),
                  });
                }
                setIsSigned(!isSigned);
              }}
              className="font-semibold text-[12px] w-fit mr-auto"
            >
              <div className="flex items-center gap-[2px]">
                {isSigned ? "Unsign" : "Sign"}
                <img className="w-[16px]" src={editBtn} alt="" />
              </div>
            </button>
          )}
        </div>
        {isUser ? (
          <></>
        ) : (
          <>
            {selectedDate.isBefore(dayjs().startOf("day")) || (
              <>
                <button
                  onClick={() => startEditing(i, ev)}
                  className="text-[#F2B749] font-semibold text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEvent(ev.id)}
                  className="text-red-600 font-semibold text-xs"
                >
                  Delete
                </button>
              </>
            )}
          </>
        )}
      </div>
    </li>
  );
}

export default EventItem;
