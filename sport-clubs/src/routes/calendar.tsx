import { createFileRoute } from "@tanstack/react-router";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import ClubHead from "../components/ClubHead/ClubHead";
import SwitchMenu from "../components/SwitchMenu/SwitchMenu";
import Calendar from "../components/Calendar/Calendar";
import dayjs from "dayjs";
import { useState } from "react";
import EventList from "../components/EventList/EventList";
import {
  useGetEventsForUserClubsQuery,
  useGetEventsQuery,
  useGetUserClubsForEventsQuery,
} from "../services/UserService";

export const Route = createFileRoute("/calendar")({
  component: RouteComponent,
});

function RouteComponent() {
  const { record: user } = JSON.parse(localStorage.getItem("pocketbase_auth"));

  const clubs = useGetUserClubsForEventsQuery({ userId: user.id })?.data?.items;
  const communityIds = clubs?.map((item) => item.id);
  const myEvents =
    useGetEventsForUserClubsQuery(communityIds, {
      skip: !communityIds?.length,
    })?.data?.items || [];

  // console.log(myEvents);

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const events = myEvents.reduce((acc, ev) => {
    const dateKey = dayjs.utc(ev.date).local().format("YYYY-MM-DD");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(ev);
    return acc;
  }, {});

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
    setEditIndex(null);
  };

  const [active, setActive] = useState(currentDate);

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
            active={active}
            setActive={setActive}
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
            startEditing={() => {}}
            deleteEvent={() => {}}
            isUser={true}
            isMain={true}
          />
        </section>
      </article>
    </PageWrapper>
  );
}
