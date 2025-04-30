import dayjs from "dayjs";
import left from "../../assets/left.svg";
import right from "../../assets/right.svg";

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
    </div>
  );
};

export default Calendar;
