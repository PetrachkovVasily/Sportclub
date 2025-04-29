import React from "react";

interface Props {}

function InfoNote({ num = null, info = "", src }) {
  return (
    <div className="flex items-center gap-[6px]">
      <img src={src} />
      <div className="flex items-center gap-[4px] ">
        <b>{num}</b>
        {info}
      </div>
    </div>
  );
}

export default InfoNote;
