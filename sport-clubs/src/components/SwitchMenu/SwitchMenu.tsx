import { Link } from "@tanstack/react-router";
import React from "react";

interface Props {}

function SwitchMenu({ menuList }) {
  return (
    <ul className="w-[100%] h-[28px] flex text-[14px] font-medium text-center text-[#505050]">
      {menuList.map((item) => (
        <li className="w-[50%] h-[28px]">
          <Link
            to={item.link}
            aria-current="page"
            className="w-[100%] h-[28px] inline-block rounded-t-lg border-b-2 border-[#D4D4D4]/75 "
            activeProps={{
              style: {
                backgroundColor: "white",
                border: "none",
              },
            }}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SwitchMenu;
