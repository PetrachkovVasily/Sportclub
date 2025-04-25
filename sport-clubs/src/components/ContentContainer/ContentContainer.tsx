import React from "react";

interface Props {}

function ContentContainer({ children, gap = 16, pb = 24 }) {
  return (
    <section
      className={`flex flex-col items-center p-[16px] pt-[24px] rounded-[8px] bg-white w-[19vw] max-w-[280px]`}
      style={{
        gap: gap,
        paddingBottom: pb,
      }}
    >
      {children}
    </section>
  );
}

export default ContentContainer;
