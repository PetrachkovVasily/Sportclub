import React from "react";

interface Props {}

function AchImg({ src, isClub }) {
  return (
    <img
      src={src}
      alt="AchImg"
      className="w-[38px] h-[38px] rounded-[19px]"
      style={{
        filter: `grayscale(${isClub ? 100 : 0}%)`,
      }}
    />
  );
}

export default AchImg;
