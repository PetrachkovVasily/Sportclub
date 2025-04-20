import React from "react";

interface Props {}

function ContentContainer({ children, gap = 16, pb = 24 }) {
  return (
    <section
      className={`flex flex-col items-center gap-[${gap}px] p-[16px] pt-[24px] pb-[${pb}px] rounded-[8px] bg-white w-[100%]`}
    >
      {children}
    </section>
  );
}

export default ContentContainer;
