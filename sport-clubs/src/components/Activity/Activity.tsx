import React from "react";
import Counter from "../Counter/Counter";
import deleteBtn from "../../assets/delete-1-svgrepo-com 1.svg";

interface Props {}

function Activity({ children, amount, approaches }) {
  return (
    <div className="bg-white flex items-center justify-between p-[6px] px-[8px] rounded-[4px] w-[100%] ">
      <h3 className="text-[14px] font-semibold text-[#505050] ">{children}</h3>
      <div className="flex ">
        <Counter value={amount} header={"amount"} />
        <Counter value={approaches} header={"approaches"} />
      </div>
      <button>
        <img className="w-[22px] " src={deleteBtn} alt="" />
      </button>
    </div>
  );
}

export default Activity;
