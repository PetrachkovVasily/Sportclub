import { useState } from "react";
import dayjs from "dayjs";
import Dropdown from "../Dropdown/Dropdown";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const [newEvent, setNewEvent] = useState({
    title: "",
    location: "",
    startTime: "",
    endTime: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const generateCalendar = () => {
    let date = startDate.clone();
    const calendar = [];
    while (date.isBefore(endDate, "day")) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(date.clone());
        date = date.add(1, "day");
      }
      calendar.push(week);
    }
    return calendar;
  };

  const calendar = generateCalendar();

  const handlePrevMonth = () =>
    setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const openModal = (date) => {
    setSelectedDate(date);
    resetEventForm();
    setEditIndex(null);
  };

  const closeModal = () => {
    setSelectedDate(null);
    resetEventForm();
    setEditIndex(null);
  };

  const resetEventForm = () => {
    setNewEvent({
      title: "",
      location: "",
      startTime: "",
      endTime: "",
    });
  };

  const addOrEditEvent = () => {
    const { title } = newEvent;
    if (!title.trim()) return;

    const key = selectedDate.format("YYYY-MM-DD");
    const currentEvents = events[key] || [];

    if (editIndex !== null) {
      const updated = [...currentEvents];
      updated[editIndex] = newEvent;
      setEvents({ ...events, [key]: updated });
    } else {
      setEvents({ ...events, [key]: [...currentEvents, newEvent] });
    }

    resetEventForm();
    setEditIndex(null);
  };

  const startEditing = (i, event) => {
    setNewEvent(event);
    setEditIndex(i);
  };

  const deleteEvent = (i) => {
    const key = selectedDate.format("YYYY-MM-DD");
    const updated = [...(events[key] || [])];
    updated.splice(i, 1);
    setEvents({ ...events, [key]: updated });
  };

  return (
    <div className=" max-w-3xl w-100%">
      <div className="flex justify-center gap-16px items-center mb-4">
        <button onClick={handlePrevMonth} className="text-xl">
          <p>←</p>
        </button>
        <h2 className="text-2xl font-bold">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button onClick={handleNextMonth} className="text-xl">
          <p>→</p>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0 text-end text-[#505050] font-semibold w-[100%] ">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div className=" mb-[4px]" key={d}>
            {d}
          </div>
        ))}
        {calendar.map((week) =>
          week.map((day) => {
            const dayStr = day.format("YYYY-MM-DD");
            const isToday = day.isSame(dayjs(), "day");
            const isCurrentMonth = day.isSame(currentDate, "month");
            const hasEvent = !!events[dayStr]?.length;

            return (
              <div
                key={dayStr}
                onClick={() => openModal(day)}
                className={`p-2 h-20 border-[1px] rounded-[4px] border-[#404040]/12 relative cursor-pointer hover:bg-[#F2B749]/12 transition ${
                  !isCurrentMonth ? "text-gray-400" : ""
                } ${isToday ? "bg-[#F2B749]/24" : ""}`}
              >
                <div className="text-sm">{day.date()}</div>
                {hasEvent && (
                  <div className="absolute bottom-1 left-1 right-1 font-semibold text-[12px] bg-[#F2B749]/75 rounded px-1 truncate">
                    {events[dayStr][0].title}
                    {events[dayStr].length > 1 && " +"}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-[8px] w-[400px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-3">
              Events of {selectedDate.format("DD MMMM YYYY")}
            </h3>

            {/* Список событий */}
            <ul className="space-y-2 mb-4">
              {(events[selectedDate.format("YYYY-MM-DD")] || []).map(
                (ev, i) => (
                  <li
                    key={i}
                    className="bg-gray-100/90 px-2 py-2 rounded text-[12px]"
                  >
                    <div className="font-medium">{ev.title}</div>
                    <div className="text-[#505050] font-semibold">
                      📍 {ev.location}
                    </div>
                    <div className="text-[#505050] font-semibold">
                      🕓 {ev.startTime} – {ev.endTime}
                    </div>
                    <div className="flex justify-end gap-2 mt-1">
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
                    </div>
                  </li>
                )
              )}
            </ul>

            {/* Форма добавления / редактирования */}
            <div className="space-y-2 mb-3">
              <div className="px-2 py-1 w-[100%] rounded-[4px] border-[2px] border-[#404040]/12 flex items-center ">
                <Dropdown
                  isEmpty={true}
                  options={[{ name: "1", option: "1" }]}
                  width={"100%"}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
              </div>

              <input
                type="text"
                placeholder="Место проведения"
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
                className="w-full border-[2px] border-[#404040]/12 px-2 py-1 rounded-[4px]"
              />
              <div className="flex gap-2">
                <input
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, startTime: e.target.value })
                  }
                  className="w-1/2 border-[2px] border-[#404040]/12 px-2 py-1 rounded-[4px]"
                />
                <input
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, endTime: e.target.value })
                  }
                  className="w-1/2 border-[2px] border-[#404040]/12 px-2 py-1 rounded-[4px]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Закрыть
              </button>
              <button
                onClick={addOrEditEvent}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {editIndex !== null ? "Сохранить" : "Добавить"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
