import { createFileRoute } from "@tanstack/react-router";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import ClubHead from "../components/ClubHead/ClubHead";
import SwitchMenu from "../components/SwitchMenu/SwitchMenu";
import Calendar from "../components/Calendar/Calendar";
import dayjs from "dayjs";
import { useState } from "react";
import EventList from "../components/EventList/EventList";

export const Route = createFileRoute("/calendar")({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(currentDate);

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
    <PageWrapper>
      <article className="max-w-[880px] w-[100%] flex flex-col gap-[24px] ">
        <section className="flex flex-col rounded-b-[8px] bg-white w-[100%] max-w-[880px] gap-[24px] p-[16px] py-[24px]">
          <Calendar
            currentDate={currentDate}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
            calendar={calendar}
            events={events}
            openModal={openModal}
          />
        </section>
      </article>
      <article className="max-w-[280px] w-[19vw] flex flex-col gap-[24px] ">
        <section
          className={`flex flex-col items-start gap-[8px] p-[24px] rounded-[8px] bg-white w-[19vw] max-w-[280px]`}
        >
          <EventList
            selectedDate={selectedDate}
            events={events}
            startEditing={startEditing}
            deleteEvent={deleteEvent}
            isUser={false}
          />
        </section>
      </article>
    </PageWrapper>
  );
}
