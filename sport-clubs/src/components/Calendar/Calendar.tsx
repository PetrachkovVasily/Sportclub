import dayjs from "dayjs";
import left from "../../assets/left.svg";
import right from "../../assets/right.svg";
import { useGetEventWorkoutsQuery } from "../../services/UserService";
import CalendarField from "./CalendarField";

const Calendar = ({
  currentDate,
  handlePrevMonth,
  handleNextMonth,
  calendar,
  events,
  openModal,
}) => {
  return (
    <div className=" max-w-3xl w-100%">
      <div className="flex justify-center gap-16px items-center mb-4 w-[100%]">
        <button onClick={handlePrevMonth} className="text-xl">
          <img className="w-[22px] h-[22px]" src={left} alt="" />
        </button>
        <h1 className="text-[22px] text-[#505050]">
          {currentDate.format("MMMM YYYY")}
        </h1>
        <button onClick={handleNextMonth} className="text-xl">
          <img className="w-[22px] h-[22px]" src={right} alt="" />
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
            return (
              <CalendarField
                day={day}
                currentDate={currentDate}
                events={events}
                openModal={openModal}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Calendar;
