import { createFileRoute } from "@tanstack/react-router";
import Calendar from "../../../components/Calendar/Calendar";
import Modal from "../../../components/Modal/Modal";
import { useEffect, useState } from "react";
import Dropdown from "../../../components/Dropdown/Dropdown";
import EventList from "../../../components/EventList/EventList";
import {
  useAddEventMutation,
  useDeleteEventMutation,
  useGetClubAdminsQuery,
  useGetClubWorkoutsQuery,
  useGetEventsQuery,
  useUpdateEventMutation,
} from "../../../services/UserService";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const Route = createFileRoute("/club/$id/schedule")({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);

  const { id } = Route.useParams();

  const rawEvents = useGetEventsQuery(id)?.data?.items || [];

  const workouts = useGetClubWorkoutsQuery(id)?.data?.items;

  const [addEvent] = useAddEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  const [workout, setWorkout] = useState("");

  const [newEvent, setNewEvent] = useState({
    id: "",
    club_id: id,
    location: "",
    startTime: "",
    endTime: "",
    workout_id: "",
    date: "",
    user_id: [],
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (workouts) {
      setWorkout(workouts[0].name);
    }
  }, [workouts]);

  const events = rawEvents.reduce((acc, ev) => {
    const dateKey = dayjs.utc(ev.date).local().format("YYYY-MM-DD");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(ev);
    return acc;
  }, {});

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
    resetEventForm(date);
    setEditIndex(null);
  };

  const closeModal = () => {
    setSelectedDate(null);
    resetEventForm(dayjs());
    setEditIndex(null);
  };

  const resetEventForm = (date) => {
    setNewEvent({
      id: "",
      club_id: id,
      location: "",
      startTime: "",
      endTime: "",
      workout_id: workouts?.find((el) => {
        return el.name == workout;
      })?.id,
      date: date.format("YYYY-MM-DD"),
      user_id: [],
    });
  };

  const addOrEditEvent = () => {
    if (!newEvent.startTime || !newEvent.endTime) return;

    const start = dayjs(`${newEvent.date}T${newEvent.startTime}`);
    const end = dayjs(`${newEvent.date}T${newEvent.endTime}`);

    if (!start.isBefore(end)) {
      alert("Start time must be earlier than end time.");
      return;
    }

    if (editIndex !== null) {
      updateEvent(newEvent);
    } else {
      addEvent(newEvent);
    }

    closeModal();
  };

  const startEditing = (i, event) => {
    setNewEvent({ ...event, date: selectedDate.format("YYYY-MM-DD") });
    setEditIndex(i);
  };

  const handleDeleteEvent = (id) => {
    // Здесь должен быть DELETE запрос на сервер
    // const dateKey = selectedDate.format("YYYY-MM-DD");
    // const updatedEvents = [...(events[dateKey] || [])];
    // const deleted = updatedEvents[i];
    // console.log("Deleting event", deleted);

    deleteEvent(id);
    closeModal();
  };

  // const isToday = () => {
  //   const { date } = newEvent;
  //   const today = dayjs().startOf("day");
  //   const eventDate = dayjs(date);

  //   if (eventDate.isBefore(today)) {
  //     return true;
  //   }
  // };

  //Search for admin
  const admins = useGetClubAdminsQuery(id)?.data?.items;
  const { record: user } = JSON.parse(localStorage.getItem("pocketbase_auth"));

  const [isUser, setIsUser] = useState(true);

  useEffect(() => {
    if (admins) {
      setIsUser(!(admins.find((item) => item.admin_id == user.id) !== -1));
    }
  }, [admins]);
  ///////////////////

  return (
    <>
      {events && (
        <Calendar
          currentDate={currentDate}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          calendar={calendar}
          events={events}
          openModal={openModal}
        />
      )}

      {/* Modal */}
      {selectedDate && (
        <Modal closeModal={closeModal}>
          <EventList
            selectedDate={selectedDate}
            events={events}
            startEditing={startEditing}
            deleteEvent={handleDeleteEvent}
            isUser={isUser}
          />

          {/* Форма добавления / редактирования */}
          {isUser || (
            <>
              {selectedDate.isBefore(dayjs().startOf("day")) || (
                <>
                  <div className="space-y-2 mb-3">
                    <div className="px-2 py-1 w-[100%] rounded-[4px] border-[2px] border-[#404040]/12 flex items-center ">
                      <Dropdown
                        isEmpty={true}
                        options={workouts?.map((item) => ({
                          value: item.name,
                          name: item.name,
                        }))}
                        width={"100%"}
                        value={workout}
                        onChange={(item) => {
                          setWorkout(item);

                          setNewEvent({
                            ...newEvent,
                            workout_id: workouts?.find((el) => {
                              return el.name == item;
                            }).id,
                          });
                        }}
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Location"
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
                          setNewEvent({
                            ...newEvent,
                            startTime: e.target.value,
                          })
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
                </>
              )}
            </>
          )}

          <div className="flex justify-end gap-2">
            <button
              onClick={closeModal}
              className="px-3 py-1 bg-gray-300 rounded-[4px]"
            >
              Close
            </button>
            {selectedDate.isBefore(dayjs().startOf("day")) || (
              <>
                {isUser || (
                  <button
                    onClick={addOrEditEvent}
                    className="px-3 py-1 bg-[#F2B749] text-white  rounded-[4px]"
                  >
                    {editIndex !== null ? "Save" : "Add"}
                  </button>
                )}
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
