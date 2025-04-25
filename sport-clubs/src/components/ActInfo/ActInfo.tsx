import React from "react";
import Line from "../Line/Line";
import Dropdown from "../Dropdown/Dropdown";
import Chart from "../Chart/Chart";
import timerImg from "../../assets/timer-svgrepo-com 1.svg";
import trendingImg from "../../assets/trending-up-svgrepo-com 1.svg";

interface Props {}

function ActInfo(props: Props) {
  const {} = props;

  return (
    <div className="w-[100%] max-w-[520px] flex gap-[12px] py-[4px] ">
      <div className="w-[57vw] max-w-[296px] ">
        <Chart />
      </div>
      <div className="w-[41vw] max-w-[212px] flex flex-col gap-[10px] py-[8px] rounded-[8px] border-[1px] border-[#E2E2E2] ">
        <div className="w-[100%] flex flex-col px-[12px] ">
          <div className="text-[12px] font-bold text-[#FFB74D]">
            <Dropdown
              options={[
                { value: "pushups", name: "Pushups" },
                { value: "pullups", name: "Pullups" },
              ]}
            />
          </div>
          <h3 className="text-[16px] font-semibold ">6 activities</h3>
        </div>
        <Line height={1} />
        <div className="w-[100%] flex flex-col px-[12px] gap-[8px]">
          <div className="flex gap-[6px] ">
            <img src={timerImg} alt="icon" />
            <h3 className="text-[12px] text-[#505050]">12 hours</h3>
          </div>
          <div className="flex gap-[6px] ">
            <img src={trendingImg} alt="icon" />
            <h3 className="text-[12px] text-[#505050]">104 pushups</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActInfo;
