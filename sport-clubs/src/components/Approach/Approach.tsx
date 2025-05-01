import { Checkbox } from "flowbite-react";
import React from "react";

interface Props {}

function Approach(props: Props) {
  const {} = props;

  return (
    <div className="py-[8px] px-[16px] rounded-b-[4px] bg-[#404040]/6 flex flex-col items-center gap-[8px] w-[100%] ">
      <div className="bg-white flex items-center justify-between p-[6px] px-[8px] rounded-[4px] w-[100%] ">
        <h3 className="text-[14px] font-semibold text-[#505050] ">
          Approach 1
        </h3>
        <h3 className="text-[14px] font-semibold text-[#505050] ">20 times</h3>
        <Checkbox color="yellow" />
      </div>
    </div>
  );
}

export default Approach;
