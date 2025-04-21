import React from "react";
import SwitchMenu from "../SwitchMenu/SwitchMenu";
import Line from "../Line/Line";
import GitHubCalendar from "react-github-contribution-calendar";
import ActInfo from "../ActInfo/ActInfo";
import TotalBlock from "../TotalBlock/TotalBlock";
import Dropdown from "../Dropdown/Dropdown";
import Chart from "../Chart/Chart";

interface Props {}

function CompleteInfo(props: Props) {
  const {} = props;

  const values = {
    "2016-06-23": 1,
    "2016-05-26": 2,
    "2016-06-27": 3,
    "2016-06-28": 4,
    "2016-06-29": 4,
  };
  const until = "2016-06-30";

  return (
    <>
      <article
        className={`flex flex-col items-center gap-[24px] p-[16px] py-[24px] rounded-b-[8px] bg-white w-[100%]`}
      >
        <TotalBlock />
        <Line />
        <div className="flex flex-col w-[100%] gap-[10px] ">
          <div className="flex justify-between px-[12px]">
            <h3 className="text-[14px] font-semibold">12 workouts in 2025</h3>
          </div>
          <GitHubCalendar
            panelColors={[
              "#F5F5F5",
              "#FFF3D5",
              "#F9D88D",
              "#F2B749",
              "#D9982F",
            ]}
            values={values}
            until={until}
            weekLabelAttributes={{
              style: {
                display: "none",
              },
            }}
            monthLabelAttributes={{
              style: {
                "font-size": 10,
                "alignment-baseline": "central",
                fill: "#AAA",
              },
            }}
            panelAttributes={{ rx: 2, ry: 2 }}
          />
        </div>
        <Line />
        <div className="flex flex-col w-[100%] gap-[10px] ">
          <div className="flex justify-between px-[12px] text-[12px] text-[#505050]">
            <h3 className="text-[16px]">Activities</h3>
            <Dropdown
              options={[
                { value: "week", name: "Week" },
                { value: "month", name: "Month" },
                { value: "year", name: "Year" },
              ]}
            />
          </div>
          <ActInfo />
        </div>
      </article>
    </>
  );
}

export default CompleteInfo;
