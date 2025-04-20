import React from "react";

interface Props {}

function SwitchMenu({ menuList }) {
  return (
    <ul className="w-[100%] h-[28px] flex text-[14px] font-medium text-center text-[#505050]">
      <li className="w-[50%] h-[28px]">
        <a
          href="#"
          aria-current="page"
          className="w-[100%] h-[28px] inline-block rounded-t-lg active"
        >
          Stats
        </a>
      </li>
      <li className="w-[50%] h-[28px]">
        <a
          href="#"
          aria-current="page"
          className="w-[100%] h-[28px] inline-block rounded-t-lg border-b-[2px] border-[#D4D4D4]/75"
        >
          Goals
        </a>
      </li>
    </ul>
  );
}

export default SwitchMenu;
