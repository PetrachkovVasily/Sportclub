import React from "react";

interface Props {}

function PageWrapper({ children }) {
  return (
    <main className="w-[100%] h-[100%] flex justify-center pt-[84px] pb-[24px]">
      <div className="flex gap-[24px] pl-[16px] pr-[16px] max-w-[1216px]">
        {children}
      </div>
    </main>
  );
}

export default PageWrapper;
