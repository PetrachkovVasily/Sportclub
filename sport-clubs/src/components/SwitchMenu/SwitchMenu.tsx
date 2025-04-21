import { Link } from "@tanstack/react-router";
import React from "react";

interface Props {}

function SwitchMenu({ menuList }) {
  return (
    <ul className="w-[100%] h-[28px] flex text-[14px] font-medium text-center text-[#505050]">
      <li className="w-[50%] h-[28px]">
        <Link
          to="/profile/stats"
          aria-current="page"
          className="w-[100%] h-[28px] inline-block rounded-t-lg active"
        >
          Stats
        </Link>
      </li>
      <li className="w-[50%] h-[28px]">
        <Link
          to="/profile/goals"
          aria-current="page"
          className="w-[100%] h-[28px] inline-block rounded-t-lg active"
        >
          Goals
        </Link>
      </li>
    </ul>
  );
}

export default SwitchMenu;
