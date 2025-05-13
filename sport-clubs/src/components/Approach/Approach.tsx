import { Checkbox } from "flowbite-react";
import React, { useEffect, useState } from "react";

interface Props {}

function Approach({
  workoutActivity,
  workoutValue,
  setWorkoutValue,
  num,
  setAppr,
  approaches,
}) {
  return (
    <div className="py-[8px] px-[16px] rounded-b-[4px] bg-[#404040]/6 flex flex-col items-center gap-[8px] w-[100%] ">
      <div className="bg-white flex items-center justify-between p-[6px] px-[8px] rounded-[4px] w-[100%] ">
        <h3 className="text-[14px] font-semibold text-[#505050] ">
          Approach {num}
        </h3>
        <h3 className="text-[14px] font-semibold text-[#505050] ">
          {workoutActivity.amount} times
        </h3>
        <Checkbox
          className="cursor-pointer"
          onChange={(e) => {
            if (e.target.checked) {
              setAppr(++approaches);

              setWorkoutValue((prevItems) =>
                prevItems.map((item) =>
                  item.activity === workoutActivity.activity
                    ? { ...item, amount: workoutActivity.amount + item.amount }
                    : item
                )
              );
            } else {
              setAppr(--approaches);

              setWorkoutValue((prevItems) =>
                prevItems.map((item) =>
                  item.activity === workoutActivity.activity
                    ? { ...item, amount: item.amount - workoutActivity.amount }
                    : item
                )
              );
            }
          }}
          color="yellow"
        />
      </div>
    </div>
  );
}

export default Approach;
