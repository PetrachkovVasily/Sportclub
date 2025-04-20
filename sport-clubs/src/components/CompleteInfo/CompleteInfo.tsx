import React from "react";
import SwitchMenu from "../SwitchMenu/SwitchMenu";
import NumInfo from "../NumInfo/NumInfo";
import Line from "../Line/Line";
import { Dropdown, DropdownItem } from "flowbite-react";
import GitHubCalendar from "react-github-contribution-calendar";

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
    <div className="w-[40vw] max-w-[576px]">
      <SwitchMenu />
      <article
        className={`flex flex-col items-center gap-[24px] p-[16px] py-[24px] rounded-b-[8px] bg-white w-[100%]`}
      >
        <div className="flex flex-col items-center w-[100%] max-w-[264px] gap-[12px] ">
          <h1 className="text-[22px] text-[#505050]">Total</h1>
          <div className="flex gap-[32px] w-[100%] ">
            <NumInfo
              headNum={"80h"}
              info={"Training time"}
              headSize={22}
              infoSize={16}
            />
            <NumInfo
              headNum={"42"}
              info={"Workouts"}
              headSize={22}
              infoSize={16}
            />
          </div>
        </div>
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
          <div className="flex justify-between px-[12px]">
            <h3 className="text-[16px]">Activities</h3>
            <Dropdown label="Dropdown" inline size="sm">
              <DropdownItem>Dashboard</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Earnings</DropdownItem>
              <DropdownItem>Sign out</DropdownItem>
            </Dropdown>
          </div>
          <div className="w-[100%] max-w-[520px] flex gap-[12px] py-[4px] ">
            <div className="w-[57vw] max-w-[296px] "></div>
            <div className="w-[41vw] max-w-[212px] flex flex-col gap-[10px] py-[8px] rounded-[8px] border-[1px] border-[#E2E2E2] ">
              <div className="w-[100%] flex flex-col px-[12px] ">
                <h3 className="text-[12px] font-bold text-[#FFB74D]">
                  Pushups
                </h3>
                <h3 className="text-[16px] font-semibold ">6 activities</h3>
              </div>
              <Line height={1} />
              <div className="w-[100%] flex flex-col px-[12px] gap-[8px]">
                <div className="flex gap-[6px] ">
                  <img src="public\timer-svgrepo-com 1.svg" alt="icon" />
                  <h3 className="text-[12px] text-[#505050]">12 hours</h3>
                </div>
                <div className="flex gap-[6px] ">
                  <img src="public\trending-up-svgrepo-com 1.svg" alt="icon" />
                  <h3 className="text-[12px] text-[#505050]">104 pushups</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default CompleteInfo;
