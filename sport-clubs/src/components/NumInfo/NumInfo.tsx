import { Link } from "@tanstack/react-router";
import React from "react";

interface Props {}

function NumInfo({
  headNum,
  info,
  headSize = 18,
  infoSize = 16,
  isLink = false,
}) {
  return (
    <div className="flex flex-col w-[100%] items-center max-w-[116px]">
      <h3 className="font-semibold" style={{ fontSize: headSize }}>
        {headNum}
      </h3>
      {isLink ? (
        <Link to={"/clubsList"} className="cursor-pointer">
          <p className="text-[#505050]" style={{ fontSize: infoSize }}>
            {info}
          </p>
        </Link>
      ) : (
        <p className="text-[#505050]" style={{ fontSize: infoSize }}>
          {info}
        </p>
      )}
    </div>
  );
}

export default NumInfo;
