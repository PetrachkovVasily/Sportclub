import React from "react";

interface Props {}

function ViewBtn({ onClick = () => {} }) {
  return (
    <button
      onClick={onClick}
      className="text-[#505050] text-[14px] w-[100%] flex items-center justify-center px-[16px] rounded-[4px] bg-[#404040]/12"
    >
      View all
    </button>
  );
}

export default ViewBtn;
