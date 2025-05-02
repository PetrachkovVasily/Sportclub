import React from "react";

interface Props {}

function ActionBtn({
  children,
  bg = "#F2B749",
  textColor = "white",
  onClick = () => {},
}) {
  return (
    <button
      className="rounded-[8px] w-[104px] h-[30px] text-[16px] font-bold "
      style={{
        backgroundColor: bg,
        color: textColor,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ActionBtn;
