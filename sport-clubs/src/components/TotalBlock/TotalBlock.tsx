import React from "react";
import NumInfo from "../NumInfo/NumInfo";

interface Props {}

function TotalBlock(props: Props) {
  const {} = props;

  return (
    <div className="flex flex-col items-center w-[100%] max-w-[264px] gap-[12px] ">
      <h1 className="text-[22px] text-[#505050]">Total</h1>
      <div className="flex gap-[32px] w-[100%] ">
        <NumInfo
          headNum={"16h"}
          info={"Training time"}
          headSize={22}
          infoSize={16}
        />
        <NumInfo headNum={"12"} info={"Workouts"} headSize={22} infoSize={16} />
      </div>
    </div>
  );
}

export default TotalBlock;
